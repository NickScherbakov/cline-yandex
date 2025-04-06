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
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("@vscode/webview-ui-toolkit/react")
var styled_components_1 = require("styled-components")
var StyledButton = (0, styled_components_1.default)(react_1.VSCodeButton)(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\t--settings-button-bg: var(--vscode-button-secondaryBackground);\n\t--settings-button-hover: var(--vscode-button-secondaryHoverBackground);\n\t--settings-button-active: var(--vscode-button-secondaryBackground);\n\n\tbackground-color: var(--settings-button-bg) !important;\n\tborder-color: var(--settings-button-bg) !important;\n\twidth: 100% !important;\n\n\t&:hover {\n\t\tbackground-color: var(--settings-button-hover) !important;\n\t\tborder-color: var(--settings-button-hover) !important;\n\t}\n\n\t&:active {\n\t\tbackground-color: var(--settings-button-active) !important;\n\t\tborder-color: var(--settings-button-active) !important;\n\t}\n\n\ti.codicon {\n\t\tmargin-right: 6px;\n\t\tflex-shrink: 0;\n\t\tfont-size: 16px !important;\n\t}\n",
			],
			[
				"\n\t--settings-button-bg: var(--vscode-button-secondaryBackground);\n\t--settings-button-hover: var(--vscode-button-secondaryHoverBackground);\n\t--settings-button-active: var(--vscode-button-secondaryBackground);\n\n\tbackground-color: var(--settings-button-bg) !important;\n\tborder-color: var(--settings-button-bg) !important;\n\twidth: 100% !important;\n\n\t&:hover {\n\t\tbackground-color: var(--settings-button-hover) !important;\n\t\tborder-color: var(--settings-button-hover) !important;\n\t}\n\n\t&:active {\n\t\tbackground-color: var(--settings-button-active) !important;\n\t\tborder-color: var(--settings-button-active) !important;\n\t}\n\n\ti.codicon {\n\t\tmargin-right: 6px;\n\t\tflex-shrink: 0;\n\t\tfont-size: 16px !important;\n\t}\n",
			],
		)),
)
var SettingsButton = function (props) {
	return <StyledButton appearance="secondary" {...props} />
}
exports.default = SettingsButton
var templateObject_1
