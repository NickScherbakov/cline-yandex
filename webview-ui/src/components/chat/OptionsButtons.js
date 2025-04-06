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
exports.OptionsButtons = void 0
var styled_components_1 = require("styled-components")
var CodeBlock_1 = require("@/components/common/CodeBlock")
var vscode_1 = require("@/utils/vscode")
var OptionButton = styled_components_1.default.button(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tpadding: 8px 12px;\n\tbackground: ",
				";\n\tcolor: ",
				";\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tborder-radius: 2px;\n\tcursor: ",
				";\n\ttext-align: left;\n\tfont-size: 12px;\n\n\t",
				"\n",
			],
			[
				"\n\tpadding: 8px 12px;\n\tbackground: ",
				";\n\tcolor: ",
				";\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tborder-radius: 2px;\n\tcursor: ",
				";\n\ttext-align: left;\n\tfont-size: 12px;\n\n\t",
				"\n",
			],
		)),
	function (props) {
		return props.isSelected ? "var(--vscode-focusBorder)" : CodeBlock_1.CODE_BLOCK_BG_COLOR
	},
	function (props) {
		return props.isSelected ? "white" : "var(--vscode-input-foreground)"
	},
	function (props) {
		return props.isNotSelectable ? "default" : "pointer"
	},
	function (props) {
		return (
			!props.isNotSelectable &&
			"\n\t\t&:hover {\n\t\t\tbackground: var(--vscode-focusBorder);\n\t\t\tcolor: white;\n\t\t}\n\t"
		)
	},
)
var OptionsButtons = function (_a) {
	var options = _a.options,
		selected = _a.selected,
		isActive = _a.isActive
	if (!(options === null || options === void 0 ? void 0 : options.length)) return null
	var hasSelected = selected !== undefined && options.includes(selected)
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				paddingTop: 15,
				// marginTop: "22px",
			}}>
			{/* <div style={{ color: "var(--vscode-descriptionForeground)", fontSize: "11px", textTransform: "uppercase" }}>
            SELECT ONE:
        </div> */}
			{options.map(function (option, index) {
				return (
					<OptionButton
						key={index}
						isSelected={option === selected}
						isNotSelectable={hasSelected || !isActive}
						onClick={function () {
							if (hasSelected || !isActive) {
								return
							}
							vscode_1.vscode.postMessage({
								type: "optionsResponse",
								text: option,
							})
						}}>
						{option}
					</OptionButton>
				)
			})}
		</div>
	)
}
exports.OptionsButtons = OptionsButtons
var templateObject_1
