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
var __spreadArray =
	(this && this.__spreadArray) ||
	function (to, from, pack) {
		if (pack || arguments.length === 2)
			for (var i = 0, l = from.length, ar; i < l; i++) {
				if (ar || !(i in from)) {
					if (!ar) ar = Array.prototype.slice.call(from, 0, i)
					ar[i] = from[i]
				}
			}
		return to.concat(ar || Array.prototype.slice.call(from))
	}
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("react")
var react_remark_1 = require("react-remark")
var rehype_highlight_1 = require("rehype-highlight")
var styled_components_1 = require("styled-components")
var unist_util_visit_1 = require("unist-util-visit")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var CodeBlock_1 = require("@/components/common/CodeBlock")
var MermaidBlock_1 = require("@/components/common/MermaidBlock")
/**
 * Custom remark plugin that converts plain URLs in text into clickable links
 *
 * The original bug: We were converting text nodes into paragraph nodes,
 * which broke the markdown structure because text nodes should remain as text nodes
 * within their parent elements (like paragraphs, list items, etc.).
 * This caused the entire content to disappear because the structure became invalid.
 */
var remarkUrlToLink = function () {
	return function (tree) {
		// Visit all "text" nodes in the markdown AST (Abstract Syntax Tree)
		;(0, unist_util_visit_1.visit)(tree, "text", function (node, index, parent) {
			var _a
			var urlRegex = /https?:\/\/[^\s<>)"]+/g
			var matches = node.value.match(urlRegex)
			if (!matches) return
			var parts = node.value.split(urlRegex)
			var children = []
			parts.forEach(function (part, i) {
				if (part) children.push({ type: "text", value: part })
				if (matches[i]) {
					children.push({
						type: "link",
						url: matches[i],
						children: [{ type: "text", value: matches[i] }],
					})
				}
			})
			// Fix: Instead of converting the node to a paragraph (which broke things),
			// we replace the original text node with our new nodes in the parent's children array.
			// This preserves the document structure while adding our links.
			if (parent) {
				;(_a = parent.children).splice.apply(_a, __spreadArray([index, 1], children, false))
			}
		})
	}
}
/**
 * Custom remark plugin that prevents filenames with extensions from being parsed as bold text
 * For example: __init__.py should not be rendered as bold "init" followed by ".py"
 * Solves https://github.com/cline/cline/issues/1028
 */
var remarkPreventBoldFilenames = function () {
	return function (tree) {
		;(0, unist_util_visit_1.visit)(tree, "strong", function (node, index, parent) {
			var _a, _b, _c
			// Only process if there's a next node (potential file extension)
			if (!parent || typeof index === "undefined" || index === parent.children.length - 1) return
			var nextNode = parent.children[index + 1]
			// Check if next node is text and starts with . followed by extension
			if (nextNode.type !== "text" || !nextNode.value.match(/^\.[a-zA-Z0-9]+/)) return
			// If the strong node has multiple children, something weird is happening
			if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) !== 1) return
			// Get the text content from inside the strong node
			var strongContent =
				(_c = (_b = node.children) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0
					? void 0
					: _c.value
			if (!strongContent || typeof strongContent !== "string") return
			// Validate that the strong content is a valid filename
			if (!strongContent.match(/^[a-zA-Z0-9_-]+$/)) return
			// Combine into a single text node
			var newNode = {
				type: "text",
				value: "__".concat(strongContent, "__").concat(nextNode.value),
			}
			// Replace both nodes with the combined text node
			parent.children.splice(index, 2, newNode)
		})
	}
}
var StyledMarkdown = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tpre {\n\t\tbackground-color: ",
				";\n\t\tborder-radius: 3px;\n\t\tmargin: 13x 0;\n\t\tpadding: 10px 10px;\n\t\tmax-width: calc(100vw - 20px);\n\t\toverflow-x: auto;\n\t\toverflow-y: hidden;\n\t}\n\n\tpre > code {\n\t\t.hljs-deletion {\n\t\t\tbackground-color: var(--vscode-diffEditor-removedTextBackground);\n\t\t\tdisplay: inline-block;\n\t\t\twidth: 100%;\n\t\t}\n\t\t.hljs-addition {\n\t\t\tbackground-color: var(--vscode-diffEditor-insertedTextBackground);\n\t\t\tdisplay: inline-block;\n\t\t\twidth: 100%;\n\t\t}\n\t}\n\n\tcode {\n\t\tspan.line:empty {\n\t\t\tdisplay: none;\n\t\t}\n\t\tword-wrap: break-word;\n\t\tborder-radius: 3px;\n\t\tbackground-color: ",
				';\n\t\tfont-size: var(--vscode-editor-font-size, var(--vscode-font-size, 12px));\n\t\tfont-family: var(--vscode-editor-font-family);\n\t}\n\n\tcode:not(pre > code) {\n\t\tfont-family: var(--vscode-editor-font-family, monospace);\n\t\tcolor: var(--vscode-textPreformat-foreground, #f78383);\n\t\tbackground-color: var(--vscode-textCodeBlock-background, #1e1e1e);\n\t\tpadding: 0px 2px;\n\t\tborder-radius: 3px;\n\t\tborder: 1px solid var(--vscode-textSeparator-foreground, #424242);\n\t\twhite-space: pre-line;\n\t\tword-break: break-word;\n\t\toverflow-wrap: anywhere;\n\t}\n\n\tfont-family:\n\t\tvar(--vscode-font-family),\n\t\tsystem-ui,\n\t\t-apple-system,\n\t\tBlinkMacSystemFont,\n\t\t"Segoe UI",\n\t\tRoboto,\n\t\tOxygen,\n\t\tUbuntu,\n\t\tCantarell,\n\t\t"Open Sans",\n\t\t"Helvetica Neue",\n\t\tsans-serif;\n\tfont-size: var(--vscode-font-size, 13px);\n\n\tp,\n\tli,\n\tol,\n\tul {\n\t\tline-height: 1.25;\n\t}\n\n\tol,\n\tul {\n\t\tpadding-left: 2.5em;\n\t\tmargin-left: 0;\n\t}\n\n\tp {\n\t\twhite-space: pre-wrap;\n\t}\n\n\ta {\n\t\ttext-decoration: none;\n\t}\n\ta {\n\t\t&:hover {\n\t\t\ttext-decoration: underline;\n\t\t}\n\t}\n',
			],
			[
				"\n\tpre {\n\t\tbackground-color: ",
				";\n\t\tborder-radius: 3px;\n\t\tmargin: 13x 0;\n\t\tpadding: 10px 10px;\n\t\tmax-width: calc(100vw - 20px);\n\t\toverflow-x: auto;\n\t\toverflow-y: hidden;\n\t}\n\n\tpre > code {\n\t\t.hljs-deletion {\n\t\t\tbackground-color: var(--vscode-diffEditor-removedTextBackground);\n\t\t\tdisplay: inline-block;\n\t\t\twidth: 100%;\n\t\t}\n\t\t.hljs-addition {\n\t\t\tbackground-color: var(--vscode-diffEditor-insertedTextBackground);\n\t\t\tdisplay: inline-block;\n\t\t\twidth: 100%;\n\t\t}\n\t}\n\n\tcode {\n\t\tspan.line:empty {\n\t\t\tdisplay: none;\n\t\t}\n\t\tword-wrap: break-word;\n\t\tborder-radius: 3px;\n\t\tbackground-color: ",
				';\n\t\tfont-size: var(--vscode-editor-font-size, var(--vscode-font-size, 12px));\n\t\tfont-family: var(--vscode-editor-font-family);\n\t}\n\n\tcode:not(pre > code) {\n\t\tfont-family: var(--vscode-editor-font-family, monospace);\n\t\tcolor: var(--vscode-textPreformat-foreground, #f78383);\n\t\tbackground-color: var(--vscode-textCodeBlock-background, #1e1e1e);\n\t\tpadding: 0px 2px;\n\t\tborder-radius: 3px;\n\t\tborder: 1px solid var(--vscode-textSeparator-foreground, #424242);\n\t\twhite-space: pre-line;\n\t\tword-break: break-word;\n\t\toverflow-wrap: anywhere;\n\t}\n\n\tfont-family:\n\t\tvar(--vscode-font-family),\n\t\tsystem-ui,\n\t\t-apple-system,\n\t\tBlinkMacSystemFont,\n\t\t"Segoe UI",\n\t\tRoboto,\n\t\tOxygen,\n\t\tUbuntu,\n\t\tCantarell,\n\t\t"Open Sans",\n\t\t"Helvetica Neue",\n\t\tsans-serif;\n\tfont-size: var(--vscode-font-size, 13px);\n\n\tp,\n\tli,\n\tol,\n\tul {\n\t\tline-height: 1.25;\n\t}\n\n\tol,\n\tul {\n\t\tpadding-left: 2.5em;\n\t\tmargin-left: 0;\n\t}\n\n\tp {\n\t\twhite-space: pre-wrap;\n\t}\n\n\ta {\n\t\ttext-decoration: none;\n\t}\n\ta {\n\t\t&:hover {\n\t\t\ttext-decoration: underline;\n\t\t}\n\t}\n',
			],
		)),
	CodeBlock_1.CODE_BLOCK_BG_COLOR,
	CodeBlock_1.CODE_BLOCK_BG_COLOR,
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
var MarkdownBlock = (0, react_1.memo)(function (_a) {
	var markdown = _a.markdown
	var theme = (0, ExtensionStateContext_1.useExtensionState)().theme
	var _b = (0, react_remark_1.useRemark)({
			remarkPlugins: [
				remarkPreventBoldFilenames,
				remarkUrlToLink,
				function () {
					return function (tree) {
						;(0, unist_util_visit_1.visit)(tree, "code", function (node) {
							if (!node.lang) {
								node.lang = "javascript"
							} else if (node.lang.includes(".")) {
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
						var _b, _c
						var node = _a.node,
							children = _a.children,
							preProps = __rest(_a, ["node", "children"])
						if (Array.isArray(children) && children.length === 1 && react_1.default.isValidElement(children[0])) {
							var child = children[0]
							if (
								(_c = (_b = child.props) === null || _b === void 0 ? void 0 : _b.className) === null ||
								_c === void 0
									? void 0
									: _c.includes("language-mermaid")
							) {
								return child
							}
						}
						return (
							<StyledPre {...preProps} theme={theme}>
								{children}
							</StyledPre>
						)
					},
					code: function (props) {
						var className = props.className || ""
						if (className.includes("language-mermaid")) {
							var codeText = String(props.children || "")
							return <MermaidBlock_1.default code={codeText} />
						}
						return <code {...props} />
					},
				},
			},
		}),
		reactContent = _b[0],
		setMarkdown = _b[1]
	;(0, react_1.useEffect)(
		function () {
			setMarkdown(markdown || "")
		},
		[markdown, setMarkdown, theme],
	)
	return (
		<div style={{}}>
			<StyledMarkdown>{reactContent}</StyledMarkdown>
		</div>
	)
})
exports.default = MarkdownBlock
var templateObject_1, templateObject_2
