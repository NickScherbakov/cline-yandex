"use strict"
var __makeTemplateObject =
	(this && this.__makeTemplateObject) ||
	function (cooked, raw) {
		if (Object.defineProperty) {
			Object.defineProperty(cooked, "raw", { value: raw })
		} else {
			cooked.raw = raw
		}
		return cooked
	}
var __rest =
	(this && this.__rest) ||
	function (s, e) {
		var t = {}
		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]
		if (s != null && typeof Object.getOwnPropertySymbols === "function")
			for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
				if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]]
			}
		return t
	}
Object.defineProperty(exports, "__esModule", { value: true })
exports.CODE_BLOCK_BG_COLOR = void 0
var react_1 = require("react")
var react_remark_1 = require("react-remark")
var rehype_highlight_1 = require("rehype-highlight")
var styled_components_1 = require("styled-components")
var unist_util_visit_1 = require("unist-util-visit")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
exports.CODE_BLOCK_BG_COLOR = "var(--vscode-editor-background, --vscode-sideBar-background, rgb(30 30 30))"
var StyledMarkdown = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\t",
				"\n\n\tpre {\n\t\tbackground-color: ",
				";\n\t\tborder-radius: 5px;\n\t\tmargin: 0;\n\t\tmin-width: ",
				";\n\t\tpadding: 10px 10px;\n\t}\n\n\tpre > code {\n\t\t.hljs-deletion {\n\t\t\tbackground-color: var(--vscode-diffEditor-removedTextBackground);\n\t\t\tdisplay: inline-block;\n\t\t\twidth: 100%;\n\t\t}\n\t\t.hljs-addition {\n\t\t\tbackground-color: var(--vscode-diffEditor-insertedTextBackground);\n\t\t\tdisplay: inline-block;\n\t\t\twidth: 100%;\n\t\t}\n\t}\n\n\tcode {\n\t\tspan.line:empty {\n\t\t\tdisplay: none;\n\t\t}\n\t\tword-wrap: break-word;\n\t\tborder-radius: 5px;\n\t\tbackground-color: ",
				";\n\t\tfont-size: var(--vscode-editor-font-size, var(--vscode-font-size, 12px));\n\t\tfont-family: var(--vscode-editor-font-family);\n\t}\n\n\tcode:not(pre > code) {\n\t\tfont-family: var(--vscode-editor-font-family);\n\t\tcolor: #f78383;\n\t}\n\n\tbackground-color: ",
				';\n\tfont-family:\n\t\tvar(--vscode-font-family),\n\t\tsystem-ui,\n\t\t-apple-system,\n\t\tBlinkMacSystemFont,\n\t\t"Segoe UI",\n\t\tRoboto,\n\t\tOxygen,\n\t\tUbuntu,\n\t\tCantarell,\n\t\t"Open Sans",\n\t\t"Helvetica Neue",\n\t\tsans-serif;\n\tfont-size: var(--vscode-editor-font-size, var(--vscode-font-size, 12px));\n\tcolor: var(--vscode-editor-foreground, #fff);\n\n\tp,\n\tli,\n\tol,\n\tul {\n\t\tline-height: 1.5;\n\t}\n',
			],
			[
				"\n\t",
				"\n\n\tpre {\n\t\tbackground-color: ",
				";\n\t\tborder-radius: 5px;\n\t\tmargin: 0;\n\t\tmin-width: ",
				";\n\t\tpadding: 10px 10px;\n\t}\n\n\tpre > code {\n\t\t.hljs-deletion {\n\t\t\tbackground-color: var(--vscode-diffEditor-removedTextBackground);\n\t\t\tdisplay: inline-block;\n\t\t\twidth: 100%;\n\t\t}\n\t\t.hljs-addition {\n\t\t\tbackground-color: var(--vscode-diffEditor-insertedTextBackground);\n\t\t\tdisplay: inline-block;\n\t\t\twidth: 100%;\n\t\t}\n\t}\n\n\tcode {\n\t\tspan.line:empty {\n\t\t\tdisplay: none;\n\t\t}\n\t\tword-wrap: break-word;\n\t\tborder-radius: 5px;\n\t\tbackground-color: ",
				";\n\t\tfont-size: var(--vscode-editor-font-size, var(--vscode-font-size, 12px));\n\t\tfont-family: var(--vscode-editor-font-family);\n\t}\n\n\tcode:not(pre > code) {\n\t\tfont-family: var(--vscode-editor-font-family);\n\t\tcolor: #f78383;\n\t}\n\n\tbackground-color: ",
				';\n\tfont-family:\n\t\tvar(--vscode-font-family),\n\t\tsystem-ui,\n\t\t-apple-system,\n\t\tBlinkMacSystemFont,\n\t\t"Segoe UI",\n\t\tRoboto,\n\t\tOxygen,\n\t\tUbuntu,\n\t\tCantarell,\n\t\t"Open Sans",\n\t\t"Helvetica Neue",\n\t\tsans-serif;\n\tfont-size: var(--vscode-editor-font-size, var(--vscode-font-size, 12px));\n\tcolor: var(--vscode-editor-foreground, #fff);\n\n\tp,\n\tli,\n\tol,\n\tul {\n\t\tline-height: 1.5;\n\t}\n',
			],
		)),
	function (_a) {
		var forceWrap = _a.forceWrap
		return (
			forceWrap &&
			"\n    pre, code {\n      white-space: pre-wrap;\n      word-break: break-all;\n      overflow-wrap: anywhere;\n    }\n  "
		)
	},
	exports.CODE_BLOCK_BG_COLOR,
	function (_a) {
		var forceWrap = _a.forceWrap
		return forceWrap ? "auto" : "max-content"
	},
	exports.CODE_BLOCK_BG_COLOR,
	exports.CODE_BLOCK_BG_COLOR,
)
var StyledPre = styled_components_1.default.pre(
	templateObject_2 ||
		(templateObject_2 = __makeTemplateObject(
			["\n\t& .hljs {\n\t\tcolor: var(--vscode-editor-foreground, #fff);\n\t}\n\n\t", "\n"],
			["\n\t& .hljs {\n\t\tcolor: var(--vscode-editor-foreground, #fff);\n\t}\n\n\t", "\n"],
		)),
	function (props) {
		return Object.keys(props.theme)
			.map(function (key, index) {
				return "\n      & ".concat(key, " {\n        color: ").concat(props.theme[key], ";\n      }\n    ")
			})
			.join("")
	},
)
var CodeBlock = (0, react_1.memo)(function (_a) {
	var source = _a.source,
		_b = _a.forceWrap,
		forceWrap = _b === void 0 ? false : _b
	var theme = (0, ExtensionStateContext_1.useExtensionState)().theme
	var _c = (0, react_remark_1.useRemark)({
			remarkPlugins: [
				function () {
					return function (tree) {
						;(0, unist_util_visit_1.visit)(tree, "code", function (node) {
							if (!node.lang) {
								node.lang = "javascript"
							} else if (node.lang.includes(".")) {
								// if the language is a file, get the extension
								node.lang = node.lang.split(".").slice(-1)[0]
							}
						})
					}
				},
			],
			rehypePlugins: [
				rehype_highlight_1.default,
				{
					// languages: {},
				},
			],
			rehypeReactOptions: {
				components: {
					pre: function (_a) {
						var node = _a.node,
							preProps = __rest(_a, ["node"])
						return <StyledPre {...preProps} theme={theme} />
					},
				},
			},
		}),
		reactContent = _c[0],
		setMarkdownSource = _c[1]
	;(0, react_1.useEffect)(
		function () {
			setMarkdownSource(source || "")
		},
		[source, setMarkdownSource, theme],
	)
	return (
		<div
			style={{
				overflowY: forceWrap ? "visible" : "auto",
				maxHeight: forceWrap ? "none" : "100%",
				backgroundColor: exports.CODE_BLOCK_BG_COLOR,
			}}>
			<StyledMarkdown forceWrap={forceWrap}>{reactContent}</StyledMarkdown>
		</div>
	)
})
exports.default = CodeBlock
var templateObject_1, templateObject_2
