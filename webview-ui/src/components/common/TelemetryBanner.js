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
var react_2 = require("react")
var styled_components_1 = require("styled-components")
var vscode_1 = require("@/utils/vscode")
var BannerContainer = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tbackground-color: var(--vscode-banner-background);\n\tpadding: 12px 20px;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 10px;\n\tflex-shrink: 0;\n\tmargin-bottom: 6px;\n",
			],
			[
				"\n\tbackground-color: var(--vscode-banner-background);\n\tpadding: 12px 20px;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 10px;\n\tflex-shrink: 0;\n\tmargin-bottom: 6px;\n",
			],
		)),
)
var ButtonContainer = styled_components_1.default.div(
	templateObject_2 ||
		(templateObject_2 = __makeTemplateObject(
			["\n\tdisplay: flex;\n\tgap: 8px;\n\twidth: 100%;\n\n\t& > vscode-button {\n\t\tflex: 1;\n\t}\n"],
			["\n\tdisplay: flex;\n\tgap: 8px;\n\twidth: 100%;\n\n\t& > vscode-button {\n\t\tflex: 1;\n\t}\n"],
		)),
)
var TelemetryBanner = function () {
	var _a = (0, react_2.useState)(false),
		hasChosen = _a[0],
		setHasChosen = _a[1]
	var handleAllow = function () {
		setHasChosen(true)
		vscode_1.vscode.postMessage({ type: "telemetrySetting", telemetrySetting: "enabled" })
	}
	var handleDeny = function () {
		setHasChosen(true)
		vscode_1.vscode.postMessage({ type: "telemetrySetting", telemetrySetting: "disabled" })
	}
	var handleOpenSettings = function () {
		vscode_1.vscode.postMessage({ type: "openSettings" })
	}
	return (
		<BannerContainer>
			<div>
				<strong>Help Improve Cline</strong>
				<div style={{ marginTop: 4 }}>
					Send anonymous error and usage data to help us fix bugs and improve the extension. No code, prompts, or
					personal information is ever sent.
					<div style={{ marginTop: 4 }}>
						You can always change this in{" "}
						<react_1.VSCodeLink href="#" onClick={handleOpenSettings}>
							settings
						</react_1.VSCodeLink>
						.
					</div>
				</div>
			</div>
			<ButtonContainer>
				<react_1.VSCodeButton appearance="primary" onClick={handleAllow} disabled={hasChosen}>
					Allow
				</react_1.VSCodeButton>
				<react_1.VSCodeButton appearance="secondary" onClick={handleDeny} disabled={hasChosen}>
					Deny
				</react_1.VSCodeButton>
			</ButtonContainer>
		</BannerContainer>
	)
}
exports.default = (0, react_2.memo)(TelemetryBanner)
var templateObject_1, templateObject_2
