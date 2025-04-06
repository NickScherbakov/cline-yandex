"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("@vscode/webview-ui-toolkit/react")
var react_2 = require("react")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var validate_1 = require("@/utils/validate")
var vscode_1 = require("@/utils/vscode")
var ApiOptions_1 = require("@/components/settings/ApiOptions")
var ClineLogoWhite_1 = require("@/assets/ClineLogoWhite")
var WelcomeView = (0, react_2.memo)(function () {
	var apiConfiguration = (0, ExtensionStateContext_1.useExtensionState)().apiConfiguration
	var _a = (0, react_2.useState)(undefined),
		apiErrorMessage = _a[0],
		setApiErrorMessage = _a[1]
	var _b = (0, react_2.useState)(false),
		showApiOptions = _b[0],
		setShowApiOptions = _b[1]
	var disableLetsGoButton = apiErrorMessage != null
	var handleLogin = function () {
		vscode_1.vscode.postMessage({ type: "accountLoginClicked" })
	}
	var handleSubmit = function () {
		vscode_1.vscode.postMessage({ type: "apiConfiguration", apiConfiguration: apiConfiguration })
	}
	;(0, react_2.useEffect)(
		function () {
			setApiErrorMessage((0, validate_1.validateApiConfiguration)(apiConfiguration))
		},
		[apiConfiguration],
	)
	return (
		<div className="fixed inset-0 p-0 flex flex-col">
			<div className="h-full px-5 overflow-auto">
				<h2>Hi, I'm Cline</h2>
				<div className="flex justify-center my-5">
					<ClineLogoWhite_1.default className="size-16" />
				</div>
				<p>
					I can do all kinds of tasks thanks to breakthroughs in{" "}
					<react_1.VSCodeLink href="https://www.anthropic.com/claude/sonnet" className="inline">
						Claude 3.7 Sonnet's
					</react_1.VSCodeLink>
					agentic coding capabilities and access to tools that let me create & edit files, explore complex projects, use
					a browser, and execute terminal commands <i>(with your permission, of course)</i>. I can even use MCP to
					create new tools and extend my own capabilities.
				</p>

				<p className="text-[var(--vscode-descriptionForeground)]">
					Sign up for an account to get started for free, or use an API key that provides access to models like Claude
					3.7 Sonnet.
				</p>

				<react_1.VSCodeButton appearance="primary" onClick={handleLogin} className="w-full mt-1">
					Get Started for Free
				</react_1.VSCodeButton>

				{!showApiOptions && (
					<react_1.VSCodeButton
						appearance="secondary"
						onClick={function () {
							return setShowApiOptions(!showApiOptions)
						}}
						className="mt-2.5 w-full">
						Use your own API key
					</react_1.VSCodeButton>
				)}

				<div className="mt-4.5">
					{showApiOptions && (
						<div>
							<ApiOptions_1.default showModelOptions={false} />
							<react_1.VSCodeButton onClick={handleSubmit} disabled={disableLetsGoButton} className="mt-0.75">
								Let's go!
							</react_1.VSCodeButton>
						</div>
					)}
				</div>
			</div>
		</div>
	)
})
exports.default = WelcomeView
