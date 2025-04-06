"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MermaidBlock;
var react_1 = require("react");
var mermaid_1 = require("mermaid");
var useDebounceEffect_1 = require("@/utils/useDebounceEffect");
var styled_components_1 = require("styled-components");
var vscode_1 = require("@/utils/vscode");
var MERMAID_THEME = {
    background: "#1e1e1e", // VS Code dark theme background
    textColor: "#ffffff", // Main text color
    mainBkg: "#2d2d2d", // Background for nodes
    nodeBorder: "#888888", // Border color for nodes
    lineColor: "#cccccc", // Lines connecting nodes
    primaryColor: "#3c3c3c", // Primary color for highlights
    primaryTextColor: "#ffffff", // Text in primary colored elements
    primaryBorderColor: "#888888",
    secondaryColor: "#2d2d2d", // Secondary color for alternate elements
    tertiaryColor: "#454545", // Third color for special elements
    // Class diagram specific
    classText: "#ffffff",
    // State diagram specific
    labelColor: "#ffffff",
    // Sequence diagram specific
    actorLineColor: "#cccccc",
    actorBkg: "#2d2d2d",
    actorBorder: "#888888",
    actorTextColor: "#ffffff",
    // Flow diagram specific
    fillType0: "#2d2d2d",
    fillType1: "#3c3c3c",
    fillType2: "#454545",
};
mermaid_1.default.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "dark",
    themeVariables: __assign(__assign({}, MERMAID_THEME), { fontSize: "16px", fontFamily: "var(--vscode-font-family, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif)", 
        // Additional styling
        noteTextColor: "#ffffff", noteBkgColor: "#454545", noteBorderColor: "#888888", 
        // Improve contrast for special elements
        critBorderColor: "#ff9580", critBkgColor: "#803d36", 
        // Task diagram specific
        taskTextColor: "#ffffff", taskTextOutsideColor: "#ffffff", taskTextLightColor: "#ffffff", 
        // Numbers/sections
        sectionBkgColor: "#2d2d2d", sectionBkgColor2: "#3c3c3c", 
        // Alt sections in sequence diagrams
        altBackground: "#2d2d2d", 
        // Links
        linkColor: "#6cb6ff", 
        // Borders and lines
        compositeBackground: "#2d2d2d", compositeBorder: "#888888", titleColor: "#ffffff" }),
});
function MermaidBlock(_a) {
    var _this = this;
    var code = _a.code;
    var containerRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    // 1) Whenever `code` changes, mark that we need to re-render a new chart
    (0, react_1.useEffect)(function () {
        setIsLoading(true);
    }, [code]);
    // 2) Debounce the actual parse/render
    (0, useDebounceEffect_1.useDebounceEffect)(function () {
        if (containerRef.current) {
            containerRef.current.innerHTML = "";
        }
        mermaid_1.default
            .parse(code, { suppressErrors: true })
            .then(function (isValid) {
            if (!isValid) {
                throw new Error("Invalid or incomplete Mermaid code");
            }
            var id = "mermaid-".concat(Math.random().toString(36).substring(2));
            return mermaid_1.default.render(id, code);
        })
            .then(function (_a) {
            var svg = _a.svg;
            if (containerRef.current) {
                containerRef.current.innerHTML = svg;
            }
        })
            .catch(function (err) {
            console.warn("Mermaid parse/render failed:", err);
            containerRef.current.innerHTML = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        })
            .finally(function () {
            setIsLoading(false);
        });
    }, 500, // Delay 500ms
    [code]);
    /**
     * Called when user clicks the rendered diagram.
     * Converts the <svg> to a PNG and sends it to the extension.
     */
    var handleClick = function () { return __awaiter(_this, void 0, void 0, function () {
        var svgEl, pngDataUrl, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!containerRef.current)
                        return [2 /*return*/];
                    svgEl = containerRef.current.querySelector("svg");
                    if (!svgEl)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, svgToPng(svgEl)];
                case 2:
                    pngDataUrl = _a.sent();
                    vscode_1.vscode.postMessage({
                        type: "openImage",
                        text: pngDataUrl,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Error converting SVG to PNG:", err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<MermaidBlockContainer>
			{isLoading && <LoadingMessage>Generating mermaid diagram...</LoadingMessage>}

			{/* The container for the final <svg> or raw code. */}
			<SvgContainer onClick={handleClick} ref={containerRef} $isLoading={isLoading}/>
		</MermaidBlockContainer>);
}
function svgToPng(svgEl) {
    return __awaiter(this, void 0, void 0, function () {
        var svgClone, viewBox, originalWidth, originalHeight, editorWidth, scale, scaledHeight, serializer, svgString, svgDataUrl;
        var _a;
        return __generator(this, function (_b) {
            console.log("svgToPng function called");
            svgClone = svgEl.cloneNode(true);
            viewBox = ((_a = svgClone.getAttribute("viewBox")) === null || _a === void 0 ? void 0 : _a.split(" ").map(Number)) || [];
            originalWidth = viewBox[2] || svgClone.clientWidth;
            originalHeight = viewBox[3] || svgClone.clientHeight;
            editorWidth = 3600;
            scale = editorWidth / originalWidth;
            scaledHeight = originalHeight * scale;
            // Update SVG dimensions
            svgClone.setAttribute("width", "".concat(editorWidth));
            svgClone.setAttribute("height", "".concat(scaledHeight));
            serializer = new XMLSerializer();
            svgString = serializer.serializeToString(svgClone);
            svgDataUrl = "data:image/svg+xml;base64," + btoa(decodeURIComponent(encodeURIComponent(svgString)));
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.onload = function () {
                        var canvas = document.createElement("canvas");
                        canvas.width = editorWidth;
                        canvas.height = scaledHeight;
                        var ctx = canvas.getContext("2d");
                        if (!ctx)
                            return reject("Canvas context not available");
                        // Fill background with Mermaid's dark theme background color
                        ctx.fillStyle = MERMAID_THEME.background;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = "high";
                        ctx.drawImage(img, 0, 0, editorWidth, scaledHeight);
                        resolve(canvas.toDataURL("image/png", 1.0));
                    };
                    img.onerror = reject;
                    img.src = svgDataUrl;
                })];
        });
    });
}
var MermaidBlockContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tposition: relative;\n\tmargin: 8px 0;\n"], ["\n\tposition: relative;\n\tmargin: 8px 0;\n"])));
var LoadingMessage = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tpadding: 8px 0;\n\tcolor: var(--vscode-descriptionForeground);\n\tfont-style: italic;\n\tfont-size: 0.9em;\n"], ["\n\tpadding: 8px 0;\n\tcolor: var(--vscode-descriptionForeground);\n\tfont-style: italic;\n\tfont-size: 0.9em;\n"])));
var SvgContainer = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\topacity: ", ";\n\tmin-height: 20px;\n\ttransition: opacity 0.2s ease;\n\tcursor: pointer;\n\tdisplay: flex;\n\tjustify-content: center;\n"], ["\n\topacity: ", ";\n\tmin-height: 20px;\n\ttransition: opacity 0.2s ease;\n\tcursor: pointer;\n\tdisplay: flex;\n\tjustify-content: center;\n"])), function (props) { return (props.$isLoading ? 0.3 : 1); });
var templateObject_1, templateObject_2, templateObject_3;
