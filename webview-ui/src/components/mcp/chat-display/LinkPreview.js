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
var LinkPreview = /** @class */ (function (_super) {
    __extends(LinkPreview, _super);
    function LinkPreview(props) {
        var _this = _super.call(this, props) || this;
        _this.messageListener = null;
        _this.timeoutId = null;
        _this.heartbeatId = null;
        _this.state = {
            loading: true,
            error: null,
            errorMessage: null,
            ogData: null,
            hasCompletedFetch: false,
            fetchStartTime: 0,
        };
        return _this;
    }
    LinkPreview.prototype.componentDidMount = function () {
        // Only fetch if we haven't completed a fetch yet
        if (!this.state.hasCompletedFetch) {
            this.fetchOpenGraphData();
        }
    };
    LinkPreview.prototype.componentWillUnmount = function () {
        this.cleanup();
    };
    // Prevent updates if fetch has completed
    LinkPreview.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        // If URL changes, allow update
        if (nextProps.url !== this.props.url) {
            return true;
        }
        // If we've completed a fetch and state hasn't changed, prevent update
        if (this.state.hasCompletedFetch &&
            this.state.loading === nextState.loading &&
            this.state.error === nextState.error &&
            this.state.ogData === nextState.ogData) {
            return false;
        }
        return true;
    };
    LinkPreview.prototype.cleanup = function () {
        // Clean up event listeners and timeouts
        if (this.messageListener) {
            window.removeEventListener("message", this.messageListener);
            this.messageListener = null;
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (this.heartbeatId) {
            clearInterval(this.heartbeatId);
            this.heartbeatId = null;
        }
    };
    LinkPreview.prototype.fetchOpenGraphData = function () {
        var _this = this;
        try {
            // Record fetch start time
            var startTime_1 = Date.now();
            this.setState({ fetchStartTime: startTime_1 });
            // Send a message to the extension to fetch Open Graph data
            vscode_1.vscode.postMessage({
                type: "fetchOpenGraphData",
                text: this.props.url,
            });
            // Set up a listener for the response
            this.messageListener = function (event) {
                var message = event.data;
                if (message.type === "openGraphData" && message.url === _this.props.url) {
                    // Check if there was an error in the response
                    if (message.error) {
                        _this.setState({
                            error: "network",
                            errorMessage: message.error,
                            loading: false,
                            hasCompletedFetch: true,
                        });
                    }
                    else {
                        _this.setState({
                            ogData: message.openGraphData,
                            loading: false,
                            hasCompletedFetch: true, // Mark as completed
                        });
                    }
                    _this.cleanup();
                }
            };
            window.addEventListener("message", this.messageListener);
            // Instead of a fixed timeout, use a heartbeat to update the loading message
            // with the elapsed time, but don't actually timeout
            this.heartbeatId = setInterval(function () {
                var elapsedSeconds = Math.floor((Date.now() - startTime_1) / 1000);
                if (elapsedSeconds > 0) {
                    _this.forceUpdate(); // Just update the component to show new elapsed time
                }
            }, 1000);
        }
        catch (err) {
            this.setState({
                error: "general",
                errorMessage: err instanceof Error ? err.message : "Unknown error occurred",
                loading: false,
                hasCompletedFetch: true, // Mark as completed on error
            });
            this.cleanup();
        }
    };
    LinkPreview.prototype.render = function () {
        var url = this.props.url;
        var _a = this.state, loading = _a.loading, error = _a.error, errorMessage = _a.errorMessage, ogData = _a.ogData, fetchStartTime = _a.fetchStartTime;
        // Calculate elapsed time for loading state
        var elapsedSeconds = loading ? Math.floor((Date.now() - fetchStartTime) / 1000) : 0;
        // Fallback display while loading
        if (loading) {
            return (<div className="link-preview-loading" style={{
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
						Loading preview for {(0, mcpRichUtil_1.getSafeHostname)(url)}...
					</div>
					{elapsedSeconds > 5 && (<div style={{ fontSize: "11px", color: "var(--vscode-descriptionForeground)" }}>
							{elapsedSeconds > 60
                        ? "Waiting for ".concat(Math.floor(elapsedSeconds / 60), "m ").concat(elapsedSeconds % 60, "s...")
                        : "Waiting for ".concat(elapsedSeconds, "s...")}
						</div>)}
				</div>);
        }
        // Handle different error states with specific messages
        if (error) {
            var errorDisplay = "Unable to load preview";
            if (error === "timeout") {
                errorDisplay = "Preview request timed out";
            }
            else if (error === "network") {
                errorDisplay = "Network error loading preview";
            }
            return (<div className="link-preview-error" style={{
                    padding: "12px",
                    border: "1px solid var(--vscode-editorWidget-border, rgba(127, 127, 127, 0.3))",
                    borderRadius: "4px",
                    color: "var(--vscode-errorForeground)",
                    height: "128px",
                    maxWidth: "512px",
                    overflow: "auto",
                }} onClick={function () {
                    vscode_1.vscode.postMessage({
                        type: "openInBrowser",
                        url: dompurify_1.default.sanitize(url),
                    });
                }}>
					<div style={{ fontWeight: "bold" }}>{errorDisplay}</div>
					<div style={{ fontSize: "12px", marginTop: "4px" }}>{(0, mcpRichUtil_1.getSafeHostname)(url)}</div>
					{errorMessage && <div style={{ fontSize: "11px", marginTop: "4px", opacity: 0.8 }}>{errorMessage}</div>}
					<div style={{ fontSize: "11px", marginTop: "8px", color: "var(--vscode-textLink-foreground)" }}>
						Click to open in browser
					</div>
				</div>);
        }
        // Create a fallback object if ogData is null
        var data = ogData || {
            title: (0, mcpRichUtil_1.getSafeHostname)(url),
            description: "No description available",
            siteName: (0, mcpRichUtil_1.getSafeHostname)(url),
            url: url,
        };
        // Render the Open Graph preview
        return (<div className="link-preview" style={{
                display: "flex",
                border: "1px solid var(--vscode-editorWidget-border, rgba(127, 127, 127, 0.3))",
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                height: "128px",
                maxWidth: "512px",
            }} onClick={function () {
                vscode_1.vscode.postMessage({
                    type: "openInBrowser",
                    url: dompurify_1.default.sanitize(url),
                });
            }}>
				{data.image && (<div className="link-preview-image" style={{ width: "128px", height: "128px", flexShrink: 0 }}>
						<img src={dompurify_1.default.sanitize((0, mcpRichUtil_1.normalizeRelativeUrl)(data.image, url))} alt="" style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Use contain for link preview thumbnails to handle logos
                    objectPosition: "center", // Center the image
                }} onLoad={function (e) {
                    // Check aspect ratio to determine if we should use contain or cover
                    var img = e.currentTarget;
                    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                        var aspectRatio = img.naturalWidth / img.naturalHeight;
                        // Use contain for extreme aspect ratios (logos), cover for photos
                        if (aspectRatio > 2.5 || aspectRatio < 0.4) {
                            img.style.objectFit = "contain";
                        }
                        else {
                            img.style.objectFit = "cover";
                        }
                    }
                }} onError={function (e) {
                    console.log("Image could not be loaded: ".concat(data.image));
                    e.target.style.display = "none";
                }}/>
					</div>)}

				<div className="link-preview-content" style={{
                flex: 1,
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                height: "100%", // Ensure full height
            }}>
					{/* Top section with title and URL - top aligned */}
					<div className="link-preview-top">
						<div className="link-preview-title" style={{
                fontWeight: "bold",
                marginBottom: "4px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}>
							{data.title || "No title"}
						</div>

						<div className="link-preview-url" style={{
                fontSize: "12px",
                color: "var(--vscode-textLink-foreground, #3794ff)",
                marginBottom: "8px", // Increased for better separation
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}>
							{data.siteName || (0, mcpRichUtil_1.getSafeHostname)(url)}
						</div>
					</div>

					{/* Description with space-around in the remaining space */}
					<div className="link-preview-description-container" style={{
                flex: 1, // Take up remaining space
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around", // Space around in the remaining area
            }}>
						<div className="link-preview-description" style={{
                fontSize: "12px",
                color: "var(--vscode-descriptionForeground, rgba(204, 204, 204, 0.7))",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
            }}>
							{data.description || "No description available"}
						</div>
					</div>
				</div>
			</div>);
    };
    return LinkPreview;
}(react_1.default.Component));
// Create a wrapper component that memoizes the LinkPreview to prevent unnecessary re-renders
var MemoizedLinkPreview = react_1.default.memo(function (props) { return <LinkPreview {...props}/>; }, function (prevProps, nextProps) { return prevProps.url === nextProps.url; });
// Wrap the LinkPreview component with an error boundary
var LinkPreviewWithErrorBoundary = function (props) {
    return (<ChatErrorBoundary_1.default errorTitle="Something went wrong displaying this link preview">
			<MemoizedLinkPreview {...props}/>
		</ChatErrorBoundary_1.default>);
};
exports.default = LinkPreviewWithErrorBoundary;
