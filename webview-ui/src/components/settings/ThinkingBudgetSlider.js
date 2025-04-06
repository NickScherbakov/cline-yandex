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
var __assign =
	(this && this.__assign) ||
	function () {
		__assign =
			Object.assign ||
			function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i]
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
				}
				return t
			}
		return __assign.apply(this, arguments)
	}
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("react")
var api_1 = require("@shared/api")
var react_2 = require("@vscode/webview-ui-toolkit/react")
var styled_components_1 = require("styled-components")
// Constants
var MIN_VALID_TOKENS = 1024
var MAX_PERCENTAGE = 0.8
var THUMB_SIZE = 16
// Styled Components
var Container = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			["\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 10px;\n"],
			["\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 10px;\n"],
		)),
)
var LabelContainer = styled_components_1.default.div(
	templateObject_2 ||
		(templateObject_2 = __makeTemplateObject(
			["\n\tdisplay: flex;\n\tjustify-content: space-between;\n\tflex-wrap: wrap;\n\tgap: 12px;\n"],
			["\n\tdisplay: flex;\n\tjustify-content: space-between;\n\tflex-wrap: wrap;\n\tgap: 12px;\n"],
		)),
)
var Label = styled_components_1.default.label(
	templateObject_3 ||
		(templateObject_3 = __makeTemplateObject(
			["\n\tfont-weight: 500;\n\tdisplay: block;\n\tmargin-right: auto;\n"],
			["\n\tfont-weight: 500;\n\tdisplay: block;\n\tmargin-right: auto;\n"],
		)),
)
var Description = styled_components_1.default.p(
	templateObject_4 ||
		(templateObject_4 = __makeTemplateObject(
			["\n\tfont-size: 12px;\n\tmargin-top: 0px;\n\tmargin-bottom: 0px;\n\tcolor: var(--vscode-descriptionForeground);\n"],
			["\n\tfont-size: 12px;\n\tmargin-top: 0px;\n\tmargin-bottom: 0px;\n\tcolor: var(--vscode-descriptionForeground);\n"],
		)),
)
var RangeInput = styled_components_1.default.input(
	templateObject_5 ||
		(templateObject_5 = __makeTemplateObject(
			[
				"\n\twidth: 100%;\n\theight: 8px;\n\tappearance: none;\n\tborder-radius: 4px;\n\toutline: none;\n\tcursor: pointer;\n\tmargin: 5px 0 0;\n\tpadding: 0;\n\tbackground: ",
				";\n\n\t&::-webkit-slider-thumb {\n\t\tappearance: none;\n\t\twidth: ",
				"px;\n\t\theight: ",
				"px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--vscode-foreground);\n\t\tcursor: pointer;\n\t\tborder: 0px solid var(--vscode-progressBar-background);\n\t\tbox-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n\t}\n\n\t&:focus {\n\t\toutline: none;\n\t}\n\n\t&:focus::-webkit-slider-thumb,\n\t&:hover::-webkit-slider-thumb {\n\t\tborder-color: var(--vscode-progressBar-background);\n\t\tbox-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n\t}\n\n\t&:active::-webkit-slider-thumb {\n\t\toutline: none;\n\t\tborder-color: var(--vscode-progressBar-background);\n\t}\n",
			],
			[
				"\n\twidth: 100%;\n\theight: 8px;\n\tappearance: none;\n\tborder-radius: 4px;\n\toutline: none;\n\tcursor: pointer;\n\tmargin: 5px 0 0;\n\tpadding: 0;\n\tbackground: ",
				";\n\n\t&::-webkit-slider-thumb {\n\t\tappearance: none;\n\t\twidth: ",
				"px;\n\t\theight: ",
				"px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--vscode-foreground);\n\t\tcursor: pointer;\n\t\tborder: 0px solid var(--vscode-progressBar-background);\n\t\tbox-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n\t}\n\n\t&:focus {\n\t\toutline: none;\n\t}\n\n\t&:focus::-webkit-slider-thumb,\n\t&:hover::-webkit-slider-thumb {\n\t\tborder-color: var(--vscode-progressBar-background);\n\t\tbox-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n\t}\n\n\t&:active::-webkit-slider-thumb {\n\t\toutline: none;\n\t\tborder-color: var(--vscode-progressBar-background);\n\t}\n",
			],
		)),
	function (props) {
		var percentage = ((props.$value - props.$min) / (props.$max - props.$min)) * 100
		return "linear-gradient(to right, \n\t\t\tvar(--vscode-progressBar-background) 0%,\n\t\t\tvar(--vscode-progressBar-background) "
			.concat(percentage, "%,\n\t\t\tvar(--vscode-scrollbarSlider-background) ")
			.concat(percentage, "%,\n\t\t\tvar(--vscode-scrollbarSlider-background) 100%)")
	},
	THUMB_SIZE,
	THUMB_SIZE,
)
var ThinkingBudgetSlider = function (_a) {
	var apiConfiguration = _a.apiConfiguration,
		setApiConfiguration = _a.setApiConfiguration
	var maxTokens = api_1.anthropicModels["claude-3-7-sonnet-20250219"].maxTokens
	var maxSliderValue = Math.floor(maxTokens * MAX_PERCENTAGE)
	var isEnabled =
		((apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.thinkingBudgetTokens) || 0) > 0
	// Add local state for the slider value
	var _b = (0, react_1.useState)(
			(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.thinkingBudgetTokens) || 0,
		),
		localValue = _b[0],
		setLocalValue = _b[1]
	var handleSliderChange = function (event) {
		var value = parseInt(event.target.value, 10)
		setLocalValue(value)
	}
	var handleSliderComplete = function () {
		setApiConfiguration(__assign(__assign({}, apiConfiguration), { thinkingBudgetTokens: localValue }))
	}
	var handleToggleChange = function (event) {
		var isChecked = event.target.checked
		var newValue = isChecked ? MIN_VALID_TOKENS : 0
		setLocalValue(newValue)
		setApiConfiguration(__assign(__assign({}, apiConfiguration), { thinkingBudgetTokens: newValue }))
	}
	return (
		<Container>
			<react_2.VSCodeCheckbox checked={isEnabled} onChange={handleToggleChange}>
				Enable extended thinking
			</react_2.VSCodeCheckbox>

			{isEnabled && (
				<>
					<LabelContainer>
						<Label htmlFor="thinking-budget-slider">
							<strong>Budget:</strong> {localValue.toLocaleString()} tokens
						</Label>
					</LabelContainer>
					<RangeInput
						id="thinking-budget-slider"
						type="range"
						min={MIN_VALID_TOKENS}
						max={maxSliderValue}
						step={100}
						value={localValue}
						onChange={handleSliderChange}
						onMouseUp={handleSliderComplete}
						onTouchEnd={handleSliderComplete}
						$value={localValue}
						$min={MIN_VALID_TOKENS}
						$max={maxSliderValue}
						aria-label={"Thinking budget: ".concat(localValue.toLocaleString(), " tokens")}
						aria-valuemin={MIN_VALID_TOKENS}
						aria-valuemax={maxSliderValue}
						aria-valuenow={localValue}
						aria-describedby="thinking-budget-description"
					/>

					<Description id="thinking-budget-description">
						Higher budgets may allow you to achieve more comprehensive and nuanced reasoning
					</Description>
				</>
			)}
		</Container>
	)
}
exports.default = (0, react_1.memo)(ThinkingBudgetSlider)
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5
