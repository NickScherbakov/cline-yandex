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
var react_1 = require("react")
var styled_components_1 = require("styled-components")
var vscStyles_1 = require("@/utils/vscStyles")
// add styled component for tooltip
var TooltipBody = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tposition: absolute;\n\tbackground-color: ",
				";\n\tcolor: ",
				";\n\tpadding: 5px;\n\tborder-radius: 5px;\n\tbottom: 100%;\n\tleft: -180%;\n\tz-index: ",
				";\n\twhite-space: wrap;\n\tmax-width: 200px;\n\tborder: 1px solid ",
				";\n\tpointer-events: none;\n\tfont-size: 0.9em;\n",
			],
			[
				"\n\tposition: absolute;\n\tbackground-color: ",
				";\n\tcolor: ",
				";\n\tpadding: 5px;\n\tborder-radius: 5px;\n\tbottom: 100%;\n\tleft: -180%;\n\tz-index: ",
				";\n\twhite-space: wrap;\n\tmax-width: 200px;\n\tborder: 1px solid ",
				";\n\tpointer-events: none;\n\tfont-size: 0.9em;\n",
			],
		)),
	(0, vscStyles_1.getAsVar)(vscStyles_1.VSC_SIDEBAR_BACKGROUND),
	(0, vscStyles_1.getAsVar)(vscStyles_1.VSC_DESCRIPTION_FOREGROUND),
	function (props) {
		var _a, _b
		return (_b = (_a = props.style) === null || _a === void 0 ? void 0 : _a.zIndex) !== null && _b !== void 0 ? _b : 10
	},
	(0, vscStyles_1.getAsVar)(vscStyles_1.VSC_INPUT_BORDER),
)
var Hint = styled_components_1.default.div(
	templateObject_2 ||
		(templateObject_2 = __makeTemplateObject(
			["\n\tfont-size: 0.8em;\n\tcolor: ", ";\n\topacity: 0.8;\n\tmargin-top: 2px;\n"],
			["\n\tfont-size: 0.8em;\n\tcolor: ", ";\n\topacity: 0.8;\n\tmargin-top: 2px;\n"],
		)),
	(0, vscStyles_1.getAsVar)(vscStyles_1.VSC_INPUT_PLACEHOLDER_FOREGROUND),
)
var Tooltip = function (_a) {
	var visible = _a.visible,
		tipText = _a.tipText,
		hintText = _a.hintText,
		children = _a.children,
		style = _a.style
	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			{children}
			{visible && (
				<TooltipBody style={style}>
					{tipText}
					{hintText && <Hint>{hintText}</Hint>}
				</TooltipBody>
			)}
		</div>
	)
}
exports.default = Tooltip
var templateObject_1, templateObject_2
