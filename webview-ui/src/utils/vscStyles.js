"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.VSC_TITLEBAR_INACTIVE_FOREGROUND =
	exports.VSC_INACTIVE_SELECTION_BACKGROUND =
	exports.VSC_DIFF_INSERTED_LINE_BACKGROUND =
	exports.VSC_DIFF_REMOVED_LINE_BACKGROUND =
	exports.VSC_SIDEBAR_BORDER =
	exports.VSC_BADGE_FOREGROUND =
	exports.VSC_BADGE_BACKGROUND =
	exports.VSC_INPUT_BORDER_FOCUS =
	exports.VSC_INPUT_BORDER =
	exports.VSC_QUICK_INPUT_BACKGROUND =
	exports.VSC_LIST_ACTIVE_FOREGROUND =
	exports.VSC_FOCUS_BORDER =
	exports.VSC_LIST_SELECTION_BACKGROUND =
	exports.VSC_EDITOR_BACKGROUND =
	exports.VSC_BUTTON_FOREGROUND =
	exports.VSC_BUTTON_BACKGROUND =
	exports.VSC_INPUT_PLACEHOLDER_FOREGROUND =
	exports.VSC_DESCRIPTION_FOREGROUND =
	exports.VSC_FOREGROUND_MUTED =
	exports.VSC_EDITOR_FOREGROUND =
	exports.VSC_FOREGROUND =
	exports.VSC_SIDEBAR_BACKGROUND =
	exports.VSC_INPUT_FOREGROUND =
	exports.VSC_INPUT_BACKGROUND =
		void 0
exports.getAsVar = getAsVar
exports.hexToRGB = hexToRGB
exports.colorToHex = colorToHex
exports.VSC_INPUT_BACKGROUND = "--vscode-input-background"
exports.VSC_INPUT_FOREGROUND = "--vscode-input-foreground"
exports.VSC_SIDEBAR_BACKGROUND = "--vscode-sideBar-background"
exports.VSC_FOREGROUND = "--vscode-foreground"
exports.VSC_EDITOR_FOREGROUND = "--vscode-editor-foreground"
exports.VSC_FOREGROUND_MUTED = "--vscode-foreground-muted"
exports.VSC_DESCRIPTION_FOREGROUND = "--vscode-descriptionForeground"
exports.VSC_INPUT_PLACEHOLDER_FOREGROUND = "--vscode-input-placeholderForeground"
exports.VSC_BUTTON_BACKGROUND = "--vscode-button-background"
exports.VSC_BUTTON_FOREGROUND = "--vscode-button-foreground"
exports.VSC_EDITOR_BACKGROUND = "--vscode-editor-background"
exports.VSC_LIST_SELECTION_BACKGROUND = "--vscode-list-activeSelectionBackground"
exports.VSC_FOCUS_BORDER = "--vscode-focus-border"
exports.VSC_LIST_ACTIVE_FOREGROUND = "--vscode-quickInputList-focusForeground"
exports.VSC_QUICK_INPUT_BACKGROUND = "--vscode-quickInput-background"
exports.VSC_INPUT_BORDER = "--vscode-input-border"
exports.VSC_INPUT_BORDER_FOCUS = "--vscode-focusBorder"
exports.VSC_BADGE_BACKGROUND = "--vscode-badge-background"
exports.VSC_BADGE_FOREGROUND = "--vscode-badge-foreground"
exports.VSC_SIDEBAR_BORDER = "--vscode-sideBar-border"
exports.VSC_DIFF_REMOVED_LINE_BACKGROUND = "--vscode-diffEditor-removedLineBackground"
exports.VSC_DIFF_INSERTED_LINE_BACKGROUND = "--vscode-diffEditor-insertedLineBackground"
exports.VSC_INACTIVE_SELECTION_BACKGROUND = "--vscode-editor-inactiveSelectionBackground"
exports.VSC_TITLEBAR_INACTIVE_FOREGROUND = "--vscode-titleBar-inactiveForeground"
function getAsVar(varName) {
	return "var(".concat(varName, ")")
}
function hexToRGB(hexColor) {
	var hex = hexColor.replace(/^#/, "").slice(0, 6)
	var _a = [0, 2, 4].map(function (offset) {
			return parseInt(hex.slice(offset, offset + 2), 16)
		}),
		r = _a[0],
		g = _a[1],
		b = _a[2]
	return { r: r, g: g, b: b }
}
function colorToHex(colorVar) {
	var _a
	var value = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim()
	if (value.startsWith("#")) {
		return value.slice(0, 7)
	}
	var rgbValues = ((_a = value.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.slice(0, 3).map(Number)) || []
	return "#".concat(
		rgbValues
			.map(function (x) {
				return x.toString(16).padStart(2, "0")
			})
			.join(""),
	)
}
