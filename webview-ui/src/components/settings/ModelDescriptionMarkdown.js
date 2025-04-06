"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelDescriptionMarkdown = void 0;
var react_1 = require("@vscode/webview-ui-toolkit/react");
var react_2 = require("react");
var react_remark_1 = require("react-remark");
var styled_components_1 = require("styled-components");
var CodeBlock_1 = require("@/components/common/CodeBlock");
var StyledMarkdown = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tfont-family:\n\t\tvar(--vscode-font-family),\n\t\tsystem-ui,\n\t\t-apple-system,\n\t\tBlinkMacSystemFont,\n\t\t\"Segoe UI\",\n\t\tRoboto,\n\t\tOxygen,\n\t\tUbuntu,\n\t\tCantarell,\n\t\t\"Open Sans\",\n\t\t\"Helvetica Neue\",\n\t\tsans-serif;\n\tfont-size: 12px;\n\tcolor: var(--vscode-descriptionForeground);\n\n\tp,\n\tli,\n\tol,\n\tul {\n\t\tline-height: 1.25;\n\t\tmargin: 0;\n\t}\n\n\tol,\n\tul {\n\t\tpadding-left: 1.5em;\n\t\tmargin-left: 0;\n\t}\n\n\tp {\n\t\twhite-space: pre-wrap;\n\t}\n\n\ta {\n\t\ttext-decoration: none;\n\t}\n\ta {\n\t\t&:hover {\n\t\t\ttext-decoration: underline;\n\t\t}\n\t}\n"], ["\n\tfont-family:\n\t\tvar(--vscode-font-family),\n\t\tsystem-ui,\n\t\t-apple-system,\n\t\tBlinkMacSystemFont,\n\t\t\"Segoe UI\",\n\t\tRoboto,\n\t\tOxygen,\n\t\tUbuntu,\n\t\tCantarell,\n\t\t\"Open Sans\",\n\t\t\"Helvetica Neue\",\n\t\tsans-serif;\n\tfont-size: 12px;\n\tcolor: var(--vscode-descriptionForeground);\n\n\tp,\n\tli,\n\tol,\n\tul {\n\t\tline-height: 1.25;\n\t\tmargin: 0;\n\t}\n\n\tol,\n\tul {\n\t\tpadding-left: 1.5em;\n\t\tmargin-left: 0;\n\t}\n\n\tp {\n\t\twhite-space: pre-wrap;\n\t}\n\n\ta {\n\t\ttext-decoration: none;\n\t}\n\ta {\n\t\t&:hover {\n\t\t\ttext-decoration: underline;\n\t\t}\n\t}\n"])));
exports.ModelDescriptionMarkdown = (0, react_2.memo)(function (_a) {
    var markdown = _a.markdown, key = _a.key, isExpanded = _a.isExpanded, setIsExpanded = _a.setIsExpanded, isPopup = _a.isPopup;
    var _b = (0, react_remark_1.useRemark)(), reactContent = _b[0], setMarkdown = _b[1];
    var _c = (0, react_2.useState)(false), showSeeMore = _c[0], setShowSeeMore = _c[1];
    var textContainerRef = (0, react_2.useRef)(null);
    var textRef = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(function () {
        setMarkdown(markdown || "");
    }, [markdown, setMarkdown]);
    (0, react_2.useEffect)(function () {
        if (textRef.current && textContainerRef.current) {
            var scrollHeight = textRef.current.scrollHeight;
            var clientHeight = textContainerRef.current.clientHeight;
            var isOverflowing = scrollHeight > clientHeight;
            setShowSeeMore(isOverflowing);
        }
    }, [reactContent, setIsExpanded]);
    return (<StyledMarkdown key={key} style={{ display: "inline-block", marginBottom: 0 }}>
				<div ref={textContainerRef} style={{
            overflowY: isExpanded ? "auto" : "hidden",
            position: "relative",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
        }}>
					<div ref={textRef} style={{
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "unset" : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
        }}>
						{reactContent}
					</div>
					{!isExpanded && showSeeMore && (<div style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
            }}>
							<div style={{
                width: 30,
                height: "1.2em",
                background: "linear-gradient(to right, transparent, var(--vscode-sideBar-background))",
            }}/>
							<react_1.VSCodeLink style={{
                fontSize: "inherit",
                paddingRight: 0,
                paddingLeft: 3,
                backgroundColor: isPopup ? CodeBlock_1.CODE_BLOCK_BG_COLOR : "var(--vscode-sideBar-background)",
            }} onClick={function () { return setIsExpanded(true); }}>
								See more
							</react_1.VSCodeLink>
						</div>)}
				</div>
			</StyledMarkdown>);
});
exports.default = exports.ModelDescriptionMarkdown;
var templateObject_1;
