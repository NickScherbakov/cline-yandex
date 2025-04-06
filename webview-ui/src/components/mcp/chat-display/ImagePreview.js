"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var vscode_1 = require("@/utils/vscode");
var dompurify_1 = require("dompurify");
var mcpRichUtil_1 = require("./utils/mcpRichUtil");
var ChatErrorBoundary_1 = require("@/components/chat/ChatErrorBoundary");
// Use a class component to ensure complete isolation between instances
var ImagePreview = /** @class */ (function (_super) {
    __extends(ImagePreview, _super);
    function ImagePreview(props) {
        var _this = _super.call(this, props) || this;
        _this.imgRef = react_1.default.createRef();
        _this.timeoutId = null;
        _this.heartbeatId = null;
        // Track aspect ratio for proper display
        _this.aspectRatio = 1;
        // Handle image load event
        _this.handleImageLoad = function () {
            console.log("Image loaded successfully: ".concat(_this.props.url));
            _this.setState({ loading: false });
            _this.cleanup();
        };
        // Handle image error event
        _this.handleImageError = function () {
            console.log("Image failed to load: ".concat(_this.props.url));
            _this.setState({
                loading: false,
                error: "Failed to load image: ".concat(_this.props.url),
            });
            _this.cleanup();
        };
        _this.state = {
            loading: true,
            error: null,
            fetchStartTime: Date.now(),
        };
        return _this;
    }
    ImagePreview.prototype.componentDidMount = function () {
        var _this = this;
        // Set up a timeout to handle cases where the image never loads or errors
        this.timeoutId = setTimeout(function () {
            console.log("Image load timeout for ".concat(_this.props.url));
            if (_this.state.loading) {
                _this.setState({
                    loading: false,
                    error: "Timeout loading image: ".concat(_this.props.url),
                });
            }
        }, 15000);
        // Set up a heartbeat to update the UI with elapsed time
        this.heartbeatId = setInterval(function () {
            if (_this.state.loading) {
                _this.forceUpdate(); // Just update the component to show new elapsed time
            }
        }, 1000);
        // First, check the content type to verify it's actually an image
        this.checkContentType(this.props.url);
    };
    // Check if the URL is an image using content type verification
    ImagePreview.prototype.checkContentType = function (url) {
        var _this = this;
        // Always verify content type, even for URLs that look like images by extension
        (0, mcpRichUtil_1.checkIfImageUrl)(url)
            .then(function (isImage) {
            if (isImage) {
                console.log("URL is confirmed as image: ".concat(url));
                _this.loadImage(url);
            }
            else {
                console.log("URL is not an image: ".concat(url));
                _this.handleImageError();
            }
        })
            .catch(function (error) {
            console.log("Error checking if URL is an image: ".concat(error));
            // Don't fallback to direct image loading on error
            // Instead, report the error so the URL can be handled as a non-image
            _this.handleImageError();
        });
    };
    // Load the image after content type check or as fallback
    ImagePreview.prototype.loadImage = function (url) {
        var _this = this;
        var isSvg = /\.svg(\?.*)?$/i.test(url);
        // For SVG files, we don't need to calculate aspect ratio as they're vector-based
        if (isSvg) {
            console.log("SVG image detected, skipping aspect ratio calculation: ".concat(url));
            // Default aspect ratio for SVGs
            this.aspectRatio = 1;
            this.handleImageLoad();
            return;
        }
        // Create a test image to check if the URL loads and get dimensions
        var testImg = new Image();
        testImg.onload = function () {
            console.log("Test image loaded successfully: ".concat(url));
            // Calculate aspect ratio for proper display
            if (testImg.width > 0 && testImg.height > 0) {
                _this.aspectRatio = testImg.width / testImg.height;
            }
            _this.handleImageLoad();
        };
        testImg.onerror = function () {
            console.log("Test image failed to load: ".concat(url));
            _this.handleImageError();
        };
        // Force CORS mode to be anonymous to avoid CORS issues
        testImg.crossOrigin = "anonymous";
    };
    ImagePreview.prototype.componentWillUnmount = function () {
        this.cleanup();
    };
    ImagePreview.prototype.cleanup = function () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (this.heartbeatId) {
            clearInterval(this.heartbeatId);
            this.heartbeatId = null;
        }
    };
    ImagePreview.prototype.render = function () {
        var url = this.props.url;
        var _a = this.state, loading = _a.loading, error = _a.error, fetchStartTime = _a.fetchStartTime;
        // Calculate elapsed time for loading state
        var elapsedSeconds = loading ? Math.floor((Date.now() - fetchStartTime) / 1000) : 0;
        // Fallback display while loading
        if (loading) {
            return (<div className="image-preview-loading" style={{
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--vscode-editorWidget-border, rgba(127, 127, 127, 0.3))",
                    borderRadius: "4px",
                    height: "128px",
                    maxWidth: "512px",
                }}>
					<div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
						<div className="loading-spinner" style={{
                    marginRight: "8px",
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(127, 127, 127, 0.3)",
                    borderTopColor: "var(--vscode-textLink-foreground, #3794ff)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                }}/>
						<style>
							{"\n\t\t\t\t\t\t\t\t@keyframes spin {\n\t\t\t\t\t\t\t\t\tto { transform: rotate(360deg); }\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t"}
						</style>
						Loading image from {(0, mcpRichUtil_1.getSafeHostname)(url)}...
					</div>
					{elapsedSeconds > 3 && (<div style={{ fontSize: "11px", color: "var(--vscode-descriptionForeground)" }}>
							{elapsedSeconds > 60
                        ? "Waiting for ".concat(Math.floor(elapsedSeconds / 60), "m ").concat(elapsedSeconds % 60, "s...")
                        : "Waiting for ".concat(elapsedSeconds, "s...")}
						</div>)}
					{/* Hidden image that we'll use to detect load/error events */}
					{/\.svg(\?.*)?$/i.test(url) ? (<object type="image/svg+xml" data={dompurify_1.default.sanitize(url)} style={{ display: "none" }} onLoad={this.handleImageLoad} onError={this.handleImageError}/>) : (<img src={dompurify_1.default.sanitize(url)} alt="" ref={this.imgRef} onLoad={this.handleImageLoad} onError={this.handleImageError} style={{ display: "none" }}/>)}
				</div>);
        }
        // Handle error state
        if (error) {
            return (<div className="image-preview-error" style={{
                    padding: "12px",
                    border: "1px solid var(--vscode-editorWidget-border, rgba(127, 127, 127, 0.3))",
                    borderRadius: "4px",
                    color: "var(--vscode-errorForeground)",
                }} onClick={function () {
                    vscode_1.vscode.postMessage({
                        type: "openInBrowser",
                        url: dompurify_1.default.sanitize(url),
                    });
                }}>
					<div style={{ fontWeight: "bold" }}>Failed to load image</div>
					<div style={{ fontSize: "12px", marginTop: "4px" }}>{(0, mcpRichUtil_1.getSafeHostname)(url)}</div>
					<div style={{ fontSize: "11px", marginTop: "8px", color: "var(--vscode-textLink-foreground)" }}>
						Click to open in browser
					</div>
				</div>);
        }
        // Render the image
        return (<div className="image-preview" style={{
                margin: "10px 0",
                maxWidth: "100%",
                cursor: "pointer",
            }} onClick={function () {
                vscode_1.vscode.postMessage({
                    type: "openInBrowser",
                    url: dompurify_1.default.sanitize((0, mcpRichUtil_1.formatUrlForOpening)(url)),
                });
            }}>
				{/\.svg(\?.*)?$/i.test(url) ? (
            // Special handling for SVG images
            <object type="image/svg+xml" data={dompurify_1.default.sanitize(url)} style={{
                    width: "85%",
                    height: "auto",
                    borderRadius: "4px",
                }} aria-label={"SVG from ".concat((0, mcpRichUtil_1.getSafeHostname)(url))}>
						{/* Fallback if object tag fails */}
						<img src={dompurify_1.default.sanitize(url)} alt={"SVG from ".concat((0, mcpRichUtil_1.getSafeHostname)(url))} style={{
                    width: "85%",
                    height: "auto",
                    borderRadius: "4px",
                }}/>
					</object>) : (<img src={dompurify_1.default.sanitize(url)} alt={"Image from ".concat((0, mcpRichUtil_1.getSafeHostname)(url))} style={{
                    width: "85%",
                    height: "auto",
                    borderRadius: "4px",
                    // Use contain only for very extreme aspect ratios, otherwise use cover
                    objectFit: this.aspectRatio > 3 || this.aspectRatio < 0.33 ? "contain" : "cover",
                }} loading="eager" onLoad={function (e) {
                    // Double-check aspect ratio from the actual loaded image
                    var img = e.currentTarget;
                    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                        var newAspectRatio = img.naturalWidth / img.naturalHeight;
                        // Update object-fit based on actual aspect ratio
                        // Use contain only for very extreme aspect ratios, otherwise use cover
                        if (newAspectRatio > 3 || newAspectRatio < 0.33) {
                            img.style.objectFit = "contain";
                        }
                        else {
                            img.style.objectFit = "cover";
                        }
                    }
                }}/>)}
			</div>);
    };
    return ImagePreview;
}(react_1.default.Component));
// Create a wrapper component that memoizes the ImagePreview to prevent unnecessary re-renders
var MemoizedImagePreview = react_1.default.memo(function (props) { return <ImagePreview {...props}/>; }, function (prevProps, nextProps) { return prevProps.url === nextProps.url; });
// Wrap the ImagePreview component with an error boundary
var ImagePreviewWithErrorBoundary = function (props) {
    return (<ChatErrorBoundary_1.default errorTitle="Something went wrong displaying this image">
			<MemoizedImagePreview {...props}/>
		</ChatErrorBoundary_1.default>);
};
exports.default = ImagePreviewWithErrorBoundary;
