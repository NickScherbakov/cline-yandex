"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_use_1 = require("react-use");
var vscode_1 = require("@/utils/vscode");
var Thumbnails = function (_a) {
    var images = _a.images, style = _a.style, setImages = _a.setImages, onHeightChange = _a.onHeightChange;
    var _b = (0, react_1.useState)(null), hoveredIndex = _b[0], setHoveredIndex = _b[1];
    var containerRef = (0, react_1.useRef)(null);
    var width = (0, react_use_1.useWindowSize)().width;
    (0, react_1.useLayoutEffect)(function () {
        if (containerRef.current) {
            var height = containerRef.current.clientHeight;
            // some browsers return 0 for clientHeight
            if (!height) {
                height = containerRef.current.getBoundingClientRect().height;
            }
            onHeightChange === null || onHeightChange === void 0 ? void 0 : onHeightChange(height);
        }
        setHoveredIndex(null);
    }, [images, width, onHeightChange]);
    var handleDelete = function (index) {
        setImages === null || setImages === void 0 ? void 0 : setImages(function (prevImages) { return prevImages.filter(function (_, i) { return i !== index; }); });
    };
    var isDeletable = setImages !== undefined;
    var handleImageClick = function (image) {
        vscode_1.vscode.postMessage({ type: "openImage", text: image });
    };
    return (<div ref={containerRef} style={__assign({ display: "flex", flexWrap: "wrap", gap: 5, rowGap: 3 }, style)}>
			{images.map(function (image, index) { return (<div key={index} style={{ position: "relative" }} onMouseEnter={function () { return setHoveredIndex(index); }} onMouseLeave={function () { return setHoveredIndex(null); }}>
					<img src={image} alt={"Thumbnail ".concat(index + 1)} style={{
                width: 34,
                height: 34,
                objectFit: "cover",
                borderRadius: 4,
                cursor: "pointer",
            }} onClick={function () { return handleImageClick(image); }}/>
					{isDeletable && hoveredIndex === index && (<div onClick={function () { return handleDelete(index); }} style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    backgroundColor: "var(--vscode-badge-background)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}>
							<span className="codicon codicon-close" style={{
                    color: "var(--vscode-foreground)",
                    fontSize: 10,
                    fontWeight: "bold",
                }}></span>
						</div>)}
				</div>); })}
		</div>);
};
exports.default = (0, react_1.memo)(Thumbnails);
