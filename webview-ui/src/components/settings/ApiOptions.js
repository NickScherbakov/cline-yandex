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
exports.ModelInfoView = exports.formatPrice = exports.DropdownContainer = void 0
exports.getOpenRouterAuthUrl = getOpenRouterAuthUrl
exports.normalizeApiConfiguration = normalizeApiConfiguration
var react_1 = require("@vscode/webview-ui-toolkit/react")
var react_2 = require("react")
var ThinkingBudgetSlider_1 = require("./ThinkingBudgetSlider")
var react_use_1 = require("react-use")
var styled_components_1 = require("styled-components")
var api_1 = require("@shared/api")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var vscode_1 = require("@/utils/vscode")
var vscStyles_1 = require("@/utils/vscStyles")
var VSCodeButtonLink_1 = require("@/components/common/VSCodeButtonLink")
var OpenRouterModelPicker_1 = require("./OpenRouterModelPicker")
var ClineAccountInfoCard_1 = require("./ClineAccountInfoCard")
// This is necessary to ensure dropdown opens downward, important for when this is used in popup
var DROPDOWN_Z_INDEX = OpenRouterModelPicker_1.OPENROUTER_MODEL_PICKER_Z_INDEX + 2 // Higher than the OpenRouterModelPicker's and ModelSelectorTooltip's z-index
exports.DropdownContainer = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tposition: relative;\n\tz-index: ",
				";\n\n\t// Force dropdowns to open downward\n\t& vscode-dropdown::part(listbox) {\n\t\tposition: absolute !important;\n\t\ttop: 100% !important;\n\t\tbottom: auto !important;\n\t}\n",
			],
			[
				"\n\tposition: relative;\n\tz-index: ",
				";\n\n\t// Force dropdowns to open downward\n\t& vscode-dropdown::part(listbox) {\n\t\tposition: absolute !important;\n\t\ttop: 100% !important;\n\t\tbottom: auto !important;\n\t}\n",
			],
		)),
	function (props) {
		return props.zIndex || DROPDOWN_Z_INDEX
	},
)
var ApiOptions = function (_a) {
	var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r
	var showModelOptions = _a.showModelOptions,
		apiErrorMessage = _a.apiErrorMessage,
		modelIdErrorMessage = _a.modelIdErrorMessage,
		isPopup = _a.isPopup
	var _s = (0, ExtensionStateContext_1.useExtensionState)(),
		apiConfiguration = _s.apiConfiguration,
		setApiConfiguration = _s.setApiConfiguration,
		uriScheme = _s.uriScheme
	var _t = (0, react_2.useState)([]),
		ollamaModels = _t[0],
		setOllamaModels = _t[1]
	var _u = (0, react_2.useState)([]),
		lmStudioModels = _u[0],
		setLmStudioModels = _u[1]
	var _v = (0, react_2.useState)([]),
		vsCodeLmModels = _v[0],
		setVsCodeLmModels = _v[1]
	var _w = (0, react_2.useState)(
			!!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.anthropicBaseUrl),
		),
		anthropicBaseUrlSelected = _w[0],
		setAnthropicBaseUrlSelected = _w[1]
	var _x = (0, react_2.useState)(
			!!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.azureApiVersion),
		),
		azureApiVersionSelected = _x[0],
		setAzureApiVersionSelected = _x[1]
	var _y = (0, react_2.useState)(
			!!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.awsBedrockEndpoint),
		),
		awsEndpointSelected = _y[0],
		setAwsEndpointSelected = _y[1]
	var _z = (0, react_2.useState)(false),
		modelConfigurationSelected = _z[0],
		setModelConfigurationSelected = _z[1]
	var _0 = (0, react_2.useState)(false),
		isDescriptionExpanded = _0[0],
		setIsDescriptionExpanded = _0[1]
	var _1 = (0, react_2.useState)(
			!!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openRouterProviderSorting),
		),
		providerSortingSelected = _1[0],
		setProviderSortingSelected = _1[1]
	var handleInputChange = function (field) {
		return function (event) {
			var _a
			setApiConfiguration(__assign(__assign({}, apiConfiguration), ((_a = {}), (_a[field] = event.target.value), _a)))
		}
	}
	var _2 = (0, react_2.useMemo)(
			function () {
				return normalizeApiConfiguration(apiConfiguration)
			},
			[apiConfiguration],
		),
		selectedProvider = _2.selectedProvider,
		selectedModelId = _2.selectedModelId,
		selectedModelInfo = _2.selectedModelInfo
	// Poll ollama/lmstudio models
	var requestLocalModels = (0, react_2.useCallback)(
		function () {
			if (selectedProvider === "ollama") {
				vscode_1.vscode.postMessage({
					type: "requestOllamaModels",
					text: apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.ollamaBaseUrl,
				})
			} else if (selectedProvider === "lmstudio") {
				vscode_1.vscode.postMessage({
					type: "requestLmStudioModels",
					text: apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.lmStudioBaseUrl,
				})
			} else if (selectedProvider === "vscode-lm") {
				vscode_1.vscode.postMessage({ type: "requestVsCodeLmModels" })
			}
		},
		[
			selectedProvider,
			apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.ollamaBaseUrl,
			apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.lmStudioBaseUrl,
		],
	)
	;(0, react_2.useEffect)(
		function () {
			if (selectedProvider === "ollama" || selectedProvider === "lmstudio" || selectedProvider === "vscode-lm") {
				requestLocalModels()
			}
		},
		[selectedProvider, requestLocalModels],
	)
	;(0, react_use_1.useInterval)(
		requestLocalModels,
		selectedProvider === "ollama" || selectedProvider === "lmstudio" || selectedProvider === "vscode-lm" ? 2000 : null,
	)
	var handleMessage = (0, react_2.useCallback)(function (event) {
		var message = event.data
		if (message.type === "ollamaModels" && message.ollamaModels) {
			setOllamaModels(message.ollamaModels)
		} else if (message.type === "lmStudioModels" && message.lmStudioModels) {
			setLmStudioModels(message.lmStudioModels)
		} else if (message.type === "vsCodeLmModels" && message.vsCodeLmModels) {
			setVsCodeLmModels(message.vsCodeLmModels)
		}
	}, [])
	;(0, react_use_1.useEvent)("message", handleMessage)
	/*
    VSCodeDropdown has an open bug where dynamically rendered options don't auto select the provided value prop. You can see this for yourself by comparing  it with normal select/option elements, which work as expected.
    https://github.com/microsoft/vscode-webview-ui-toolkit/issues/433

    In our case, when the user switches between providers, we recalculate the selectedModelId depending on the provider, the default model for that provider, and a modelId that the user may have selected. Unfortunately, the VSCodeDropdown component wouldn't select this calculated value, and would default to the first "Select a model..." option instead, which makes it seem like the model was cleared out when it wasn't.

    As a workaround, we create separate instances of the dropdown for each provider, and then conditionally render the one that matches the current provider.
    */
	var createDropdown = function (models) {
		return (
			<react_1.VSCodeDropdown
				id="model-id"
				value={selectedModelId}
				onChange={handleInputChange("apiModelId")}
				style={{ width: "100%" }}>
				<react_1.VSCodeOption value="">Select a model...</react_1.VSCodeOption>
				{Object.keys(models).map(function (modelId) {
					return (
						<react_1.VSCodeOption
							key={modelId}
							value={modelId}
							style={{
								whiteSpace: "normal",
								wordWrap: "break-word",
								maxWidth: "100%",
							}}>
							{modelId}
						</react_1.VSCodeOption>
					)
				})}
			</react_1.VSCodeDropdown>
		)
	}
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: isPopup ? -10 : 0 }}>
			<exports.DropdownContainer className="dropdown-container">
				<label htmlFor="api-provider">
					<span style={{ fontWeight: 500 }}>API Provider</span>
				</label>
				<react_1.VSCodeDropdown
					id="api-provider"
					value={selectedProvider}
					onChange={handleInputChange("apiProvider")}
					style={{
						minWidth: 130,
						position: "relative",
					}}>
					<react_1.VSCodeOption value="cline">Cline</react_1.VSCodeOption>
					<react_1.VSCodeOption value="openrouter">OpenRouter</react_1.VSCodeOption>
					<react_1.VSCodeOption value="anthropic">Anthropic</react_1.VSCodeOption>
					<react_1.VSCodeOption value="bedrock">AWS Bedrock</react_1.VSCodeOption>
					<react_1.VSCodeOption value="openai">OpenAI Compatible</react_1.VSCodeOption>
					<react_1.VSCodeOption value="vertex">GCP Vertex AI</react_1.VSCodeOption>
					<react_1.VSCodeOption value="gemini">Google Gemini</react_1.VSCodeOption>
					<react_1.VSCodeOption value="deepseek">DeepSeek</react_1.VSCodeOption>
					<react_1.VSCodeOption value="mistral">Mistral</react_1.VSCodeOption>
					<react_1.VSCodeOption value="openai-native">OpenAI</react_1.VSCodeOption>
					<react_1.VSCodeOption value="vscode-lm">VS Code LM API</react_1.VSCodeOption>
					<react_1.VSCodeOption value="requesty">Requesty</react_1.VSCodeOption>
					<react_1.VSCodeOption value="together">Together</react_1.VSCodeOption>
					<react_1.VSCodeOption value="qwen">Alibaba Qwen</react_1.VSCodeOption>
					<react_1.VSCodeOption value="doubao">Bytedance Doubao</react_1.VSCodeOption>
					<react_1.VSCodeOption value="lmstudio">LM Studio</react_1.VSCodeOption>
					<react_1.VSCodeOption value="ollama">Ollama</react_1.VSCodeOption>
					<react_1.VSCodeOption value="litellm">LiteLLM</react_1.VSCodeOption>
					<react_1.VSCodeOption value="asksage">AskSage</react_1.VSCodeOption>
					<react_1.VSCodeOption value="xai">X AI</react_1.VSCodeOption>
					<react_1.VSCodeOption value="sambanova">SambaNova</react_1.VSCodeOption>
					<react_1.VSCodeOption value="yandexcloud">Yandex Cloud</react_1.VSCodeOption>
				</react_1.VSCodeDropdown>
			</exports.DropdownContainer>

			{selectedProvider === "cline" && (
				<div style={{ marginBottom: 14, marginTop: 4 }}>
					<ClineAccountInfoCard_1.ClineAccountInfoCard />
				</div>
			)}

			{selectedProvider === "asksage" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.asksageApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("asksageApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>AskSage API Key</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
					</p>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.asksageApiUrl) || api_1.askSageDefaultURL
						}
						style={{ width: "100%" }}
						type="url"
						onInput={handleInputChange("asksageApiUrl")}
						placeholder="Enter AskSage API URL...">
						<span style={{ fontWeight: 500 }}>AskSage API URL</span>
					</react_1.VSCodeTextField>
				</div>
			)}

			{selectedProvider === "anthropic" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("apiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>Anthropic API Key</span>
					</react_1.VSCodeTextField>

					<react_1.VSCodeCheckbox
						checked={anthropicBaseUrlSelected}
						onChange={function (e) {
							var isChecked = e.target.checked === true
							setAnthropicBaseUrlSelected(isChecked)
							if (!isChecked) {
								setApiConfiguration(__assign(__assign({}, apiConfiguration), { anthropicBaseUrl: "" }))
							}
						}}>
						Use custom base URL
					</react_1.VSCodeCheckbox>

					{anthropicBaseUrlSelected && (
						<react_1.VSCodeTextField
							value={
								(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.anthropicBaseUrl) || ""
							}
							style={{ width: "100%", marginTop: 3 }}
							type="url"
							onInput={handleInputChange("anthropicBaseUrl")}
							placeholder="Default: https://api.anthropic.com"
						/>
					)}

					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiKey) && (
							<react_1.VSCodeLink
								href="https://console.anthropic.com/settings/keys"
								style={{
									display: "inline",
									fontSize: "inherit",
								}}>
								You can get an Anthropic API key by signing up here.
							</react_1.VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "openai-native" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.openAiNativeApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("openAiNativeApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>OpenAI API Key</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0
							? void 0
							: apiConfiguration.openAiNativeApiKey) && (
							<react_1.VSCodeLink
								href="https://platform.openai.com/api-keys"
								style={{
									display: "inline",
									fontSize: "inherit",
								}}>
								You can get an OpenAI API key by signing up here.
							</react_1.VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "deepseek" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.deepSeekApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("deepSeekApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>DeepSeek API Key</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0
							? void 0
							: apiConfiguration.deepSeekApiKey) && (
							<react_1.VSCodeLink
								href="https://www.deepseek.com/"
								style={{
									display: "inline",
									fontSize: "inherit",
								}}>
								You can get a DeepSeek API key by signing up here.
							</react_1.VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "qwen" && (
				<div>
					<exports.DropdownContainer className="dropdown-container" style={{ position: "inherit" }}>
						<label htmlFor="qwen-line-provider">
							<span style={{ fontWeight: 500, marginTop: 5 }}>Alibaba API Line</span>
						</label>
						<react_1.VSCodeDropdown
							id="qwen-line-provider"
							value={
								(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.qwenApiLine) || "china"
							}
							onChange={handleInputChange("qwenApiLine")}
							style={{
								minWidth: 130,
								position: "relative",
							}}>
							<react_1.VSCodeOption value="china">China API</react_1.VSCodeOption>
							<react_1.VSCodeOption value="international">International API</react_1.VSCodeOption>
						</react_1.VSCodeDropdown>
					</exports.DropdownContainer>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						Please select the appropriate API interface based on your location. If you are in China, choose the China
						API interface. Otherwise, choose the International API interface.
					</p>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.qwenApiKey) ||
							""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("qwenApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>Qwen API Key</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.qwenApiKey) && (
							<react_1.VSCodeLink
								href="https://bailian.console.aliyun.com/"
								style={{
									display: "inline",
									fontSize: "inherit",
								}}>
								You can get a Qwen API key by signing up here.
							</react_1.VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "doubao" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.doubaoApiKey) ||
							""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("doubaoApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>Doubao API Key</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.doubaoApiKey) && (
							<react_1.VSCodeLink
								href="https://console.volcengine.com/home"
								style={{
									display: "inline",
									fontSize: "inherit",
								}}>
								You can get a Doubao API key by signing up here.
							</react_1.VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "mistral" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.mistralApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("mistralApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>Mistral API Key</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0
							? void 0
							: apiConfiguration.mistralApiKey) && (
							<react_1.VSCodeLink
								href="https://console.mistral.ai/codestral"
								style={{
									display: "inline",
									fontSize: "inherit",
								}}>
								You can get a Mistral API key by signing up here.
							</react_1.VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "openrouter" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.openRouterApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("openRouterApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>OpenRouter API Key</span>
					</react_1.VSCodeTextField>
					{!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openRouterApiKey) && (
						<VSCodeButtonLink_1.default
							href={getOpenRouterAuthUrl(uriScheme)}
							style={{ margin: "5px 0 0 0" }}
							appearance="secondary">
							Get OpenRouter API Key
						</VSCodeButtonLink_1.default>
					)}
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.{" "}
						{/* {!apiConfiguration?.openRouterApiKey && (
                <span style={{ color: "var(--vscode-charts-green)" }}>
                    (<span style={{ fontWeight: 500 }}>Note:</span> OpenRouter is recommended for high rate
                    limits, prompt caching, and wider selection of models.)
                </span>
            )} */}
					</p>
				</div>
			)}

			{selectedProvider === "bedrock" && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 5,
					}}>
					<react_1.VSCodeRadioGroup
						value={
							(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.awsUseProfile)
								? "profile"
								: "credentials"
						}
						onChange={function (e) {
							var _a
							var value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value
							var useProfile = value === "profile"
							setApiConfiguration(__assign(__assign({}, apiConfiguration), { awsUseProfile: useProfile }))
						}}>
						<react_1.VSCodeRadio value="credentials">AWS Credentials</react_1.VSCodeRadio>
						<react_1.VSCodeRadio value="profile">AWS Profile</react_1.VSCodeRadio>
					</react_1.VSCodeRadioGroup>

					{(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.awsUseProfile) ? (
						<react_1.VSCodeTextField
							value={
								(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.awsProfile) || ""
							}
							style={{ width: "100%" }}
							onInput={handleInputChange("awsProfile")}
							placeholder="Enter profile name (default if empty)">
							<span style={{ fontWeight: 500 }}>AWS Profile Name</span>
						</react_1.VSCodeTextField>
					) : (
						<>
							<react_1.VSCodeTextField
								value={
									(apiConfiguration === null || apiConfiguration === void 0
										? void 0
										: apiConfiguration.awsAccessKey) || ""
								}
								style={{ width: "100%" }}
								type="password"
								onInput={handleInputChange("awsAccessKey")}
								placeholder="Enter Access Key...">
								<span style={{ fontWeight: 500 }}>AWS Access Key</span>
							</react_1.VSCodeTextField>
							<react_1.VSCodeTextField
								value={
									(apiConfiguration === null || apiConfiguration === void 0
										? void 0
										: apiConfiguration.awsSecretKey) || ""
								}
								style={{ width: "100%" }}
								type="password"
								onInput={handleInputChange("awsSecretKey")}
								placeholder="Enter Secret Key...">
								<span style={{ fontWeight: 500 }}>AWS Secret Key</span>
							</react_1.VSCodeTextField>
							<react_1.VSCodeTextField
								value={
									(apiConfiguration === null || apiConfiguration === void 0
										? void 0
										: apiConfiguration.awsSessionToken) || ""
								}
								style={{ width: "100%" }}
								type="password"
								onInput={handleInputChange("awsSessionToken")}
								placeholder="Enter Session Token...">
								<span style={{ fontWeight: 500 }}>AWS Session Token</span>
							</react_1.VSCodeTextField>
						</>
					)}
					<exports.DropdownContainer zIndex={DROPDOWN_Z_INDEX - 1} className="dropdown-container">
						<label htmlFor="aws-region-dropdown">
							<span style={{ fontWeight: 500 }}>AWS Region</span>
						</label>
						<react_1.VSCodeDropdown
							id="aws-region-dropdown"
							value={
								(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.awsRegion) || ""
							}
							style={{ width: "100%" }}
							onChange={handleInputChange("awsRegion")}>
							<react_1.VSCodeOption value="">Select a region...</react_1.VSCodeOption>
							{/* The user will have to choose a region that supports the model they use, but this shouldn't be a problem since they'd have to request access for it in that region in the first place. */}
							<react_1.VSCodeOption value="us-east-1">us-east-1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="us-east-2">us-east-2</react_1.VSCodeOption>
							{/* <VSCodeOption value="us-west-1">us-west-1</VSCodeOption> */}
							<react_1.VSCodeOption value="us-west-2">us-west-2</react_1.VSCodeOption>
							{/* <VSCodeOption value="af-south-1">af-south-1</VSCodeOption> */}
							{/* <VSCodeOption value="ap-east-1">ap-east-1</VSCodeOption> */}
							<react_1.VSCodeOption value="ap-south-1">ap-south-1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="ap-northeast-1">ap-northeast-1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="ap-northeast-2">ap-northeast-2</react_1.VSCodeOption>
							<react_1.VSCodeOption value="ap-northeast-3">ap-northeast-3</react_1.VSCodeOption>
							<react_1.VSCodeOption value="ap-southeast-1">ap-southeast-1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="ap-southeast-2">ap-southeast-2</react_1.VSCodeOption>
							<react_1.VSCodeOption value="ca-central-1">ca-central-1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="eu-central-1">eu-central-1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="eu-central-2">eu-central-2</react_1.VSCodeOption>
							<react_1.VSCodeOption value="eu-west-1">eu-west-1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="eu-west-2">eu-west-2</react_1.VSCodeOption>
							<react_1.VSCodeOption value="eu-west-3">eu-west-3</react_1.VSCodeOption>
							<react_1.VSCodeOption value="eu-north-1">eu-north-1</react_1.VSCodeOption>
							{/* <VSCodeOption value="me-south-1">me-south-1</VSCodeOption> */}
							<react_1.VSCodeOption value="sa-east-1">sa-east-1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="us-gov-east-1">us-gov-east-1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="us-gov-west-1">us-gov-west-1</react_1.VSCodeOption>
							{/* <VSCodeOption value="us-gov-east-1">us-gov-east-1</VSCodeOption> */}
						</react_1.VSCodeDropdown>
					</exports.DropdownContainer>

					<div style={{ display: "flex", flexDirection: "column" }}>
						<react_1.VSCodeCheckbox
							checked={awsEndpointSelected}
							onChange={function (e) {
								var isChecked = e.target.checked === true
								setAwsEndpointSelected(isChecked)
								if (!isChecked) {
									setApiConfiguration(__assign(__assign({}, apiConfiguration), { awsBedrockEndpoint: "" }))
								}
							}}>
							Use custom VPC endpoint
						</react_1.VSCodeCheckbox>

						{awsEndpointSelected && (
							<react_1.VSCodeTextField
								value={
									(apiConfiguration === null || apiConfiguration === void 0
										? void 0
										: apiConfiguration.awsBedrockEndpoint) || ""
								}
								style={{ width: "100%", marginTop: 3, marginBottom: 5 }}
								type="url"
								onInput={handleInputChange("awsBedrockEndpoint")}
								placeholder="Enter VPC Endpoint URL (optional)"
							/>
						)}

						<react_1.VSCodeCheckbox
							checked={
								(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.awsUseCrossRegionInference) || false
							}
							onChange={function (e) {
								var isChecked = e.target.checked === true
								setApiConfiguration(
									__assign(__assign({}, apiConfiguration), { awsUseCrossRegionInference: isChecked }),
								)
							}}>
							Use cross-region inference
						</react_1.VSCodeCheckbox>

						{selectedModelInfo.supportsPromptCache && (
							<>
								<react_1.VSCodeCheckbox
									checked={
										(apiConfiguration === null || apiConfiguration === void 0
											? void 0
											: apiConfiguration.awsBedrockUsePromptCache) || false
									}
									onChange={function (e) {
										var isChecked = e.target.checked === true
										setApiConfiguration(
											__assign(__assign({}, apiConfiguration), { awsBedrockUsePromptCache: isChecked }),
										)
									}}>
									Use prompt caching
								</react_1.VSCodeCheckbox>
							</>
						)}
					</div>
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						{(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.awsUseProfile) ? (
							<>
								Using AWS Profile credentials from ~/.aws/credentials. Leave profile name empty to use the default
								profile. These credentials are only used locally to make API requests from this extension.
							</>
						) : (
							<>
								Authenticate by either providing the keys above or use the default AWS credential providers, i.e.
								~/.aws/credentials or environment variables. These credentials are only used locally to make API
								requests from this extension.
							</>
						)}
					</p>
				</div>
			)}

			{(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) === "vertex" && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 5,
					}}>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.vertexProjectId) || ""
						}
						style={{ width: "100%" }}
						onInput={handleInputChange("vertexProjectId")}
						placeholder="Enter Project ID...">
						<span style={{ fontWeight: 500 }}>Google Cloud Project ID</span>
					</react_1.VSCodeTextField>
					<exports.DropdownContainer zIndex={DROPDOWN_Z_INDEX - 1} className="dropdown-container">
						<label htmlFor="vertex-region-dropdown">
							<span style={{ fontWeight: 500 }}>Google Cloud Region</span>
						</label>
						<react_1.VSCodeDropdown
							id="vertex-region-dropdown"
							value={
								(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.vertexRegion) || ""
							}
							style={{ width: "100%" }}
							onChange={handleInputChange("vertexRegion")}>
							<react_1.VSCodeOption value="">Select a region...</react_1.VSCodeOption>
							<react_1.VSCodeOption value="us-east5">us-east5</react_1.VSCodeOption>
							<react_1.VSCodeOption value="us-central1">us-central1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="europe-west1">europe-west1</react_1.VSCodeOption>
							<react_1.VSCodeOption value="europe-west4">europe-west4</react_1.VSCodeOption>
							<react_1.VSCodeOption value="asia-southeast1">asia-southeast1</react_1.VSCodeOption>
						</react_1.VSCodeDropdown>
					</exports.DropdownContainer>
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						To use Google Cloud Vertex AI, you need to
						<react_1.VSCodeLink
							href="https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-claude#before_you_begin"
							style={{ display: "inline", fontSize: "inherit" }}>
							{"1) create a Google Cloud account › enable the Vertex AI API › enable the desired Claude models,"}
						</react_1.VSCodeLink>{" "}
						<react_1.VSCodeLink
							href="https://cloud.google.com/docs/authentication/provide-credentials-adc#google-idp"
							style={{ display: "inline", fontSize: "inherit" }}>
							{"2) install the Google Cloud CLI › configure Application Default Credentials."}
						</react_1.VSCodeLink>
					</p>
				</div>
			)}

			{selectedProvider === "gemini" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.geminiApiKey) ||
							""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("geminiApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>Gemini API Key</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.geminiApiKey) && (
							<react_1.VSCodeLink
								href="https://aistudio.google.com/apikey"
								style={{
									display: "inline",
									fontSize: "inherit",
								}}>
								You can get a Gemini API key by signing up here.
							</react_1.VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "openai" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.openAiBaseUrl) || ""
						}
						style={{ width: "100%" }}
						type="url"
						onInput={handleInputChange("openAiBaseUrl")}
						placeholder={"Enter base URL..."}>
						<span style={{ fontWeight: 500 }}>Base URL</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openAiApiKey) ||
							""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("openAiApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>API Key</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.openAiModelId) || ""
						}
						style={{ width: "100%" }}
						onInput={handleInputChange("openAiModelId")}
						placeholder={"Enter Model ID..."}>
						<span style={{ fontWeight: 500 }}>Model ID</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeCheckbox
						checked={azureApiVersionSelected}
						onChange={function (e) {
							var isChecked = e.target.checked === true
							setAzureApiVersionSelected(isChecked)
							if (!isChecked) {
								setApiConfiguration(__assign(__assign({}, apiConfiguration), { azureApiVersion: "" }))
							}
						}}>
						Set Azure API version
					</react_1.VSCodeCheckbox>
					{azureApiVersionSelected && (
						<react_1.VSCodeTextField
							value={
								(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.azureApiVersion) || ""
							}
							style={{ width: "100%", marginTop: 3 }}
							onInput={handleInputChange("azureApiVersion")}
							placeholder={"Default: ".concat(api_1.azureOpenAiDefaultApiVersion)}
						/>
					)}
					<div
						style={{
							color: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_DESCRIPTION_FOREGROUND),
							display: "flex",
							margin: "10px 0",
							cursor: "pointer",
							alignItems: "center",
						}}
						onClick={function () {
							return setModelConfigurationSelected(function (val) {
								return !val
							})
						}}>
						<span
							className={"codicon ".concat(
								modelConfigurationSelected ? "codicon-chevron-down" : "codicon-chevron-right",
							)}
							style={{
								marginRight: "4px",
							}}></span>
						<span
							style={{
								fontWeight: 700,
								textTransform: "uppercase",
							}}>
							Model Configuration
						</span>
					</div>
					{modelConfigurationSelected && (
						<>
							<react_1.VSCodeCheckbox
								checked={
									!!((_b =
										apiConfiguration === null || apiConfiguration === void 0
											? void 0
											: apiConfiguration.openAiModelInfo) === null || _b === void 0
										? void 0
										: _b.supportsImages)
								}
								onChange={function (e) {
									var isChecked = e.target.checked === true
									var modelInfo = (
										apiConfiguration === null || apiConfiguration === void 0
											? void 0
											: apiConfiguration.openAiModelInfo
									)
										? apiConfiguration.openAiModelInfo
										: __assign({}, api_1.openAiModelInfoSaneDefaults)
									modelInfo.supportsImages = isChecked
									setApiConfiguration(__assign(__assign({}, apiConfiguration), { openAiModelInfo: modelInfo }))
								}}>
								Supports Images
							</react_1.VSCodeCheckbox>
							<react_1.VSCodeCheckbox
								checked={
									!!((_c =
										apiConfiguration === null || apiConfiguration === void 0
											? void 0
											: apiConfiguration.openAiModelInfo) === null || _c === void 0
										? void 0
										: _c.supportsComputerUse)
								}
								onChange={function (e) {
									var isChecked = e.target.checked === true
									var modelInfo = (
										apiConfiguration === null || apiConfiguration === void 0
											? void 0
											: apiConfiguration.openAiModelInfo
									)
										? apiConfiguration.openAiModelInfo
										: __assign({}, api_1.openAiModelInfoSaneDefaults)
									modelInfo = __assign(__assign({}, modelInfo), { supportsComputerUse: isChecked })
									setApiConfiguration(__assign(__assign({}, apiConfiguration), { openAiModelInfo: modelInfo }))
								}}>
								Supports Computer Use
							</react_1.VSCodeCheckbox>
							<react_1.VSCodeCheckbox
								checked={
									!!((_d =
										apiConfiguration === null || apiConfiguration === void 0
											? void 0
											: apiConfiguration.openAiModelInfo) === null || _d === void 0
										? void 0
										: _d.isR1FormatRequired)
								}
								onChange={function (e) {
									var isChecked = e.target.checked === true
									var modelInfo = (
										apiConfiguration === null || apiConfiguration === void 0
											? void 0
											: apiConfiguration.openAiModelInfo
									)
										? apiConfiguration.openAiModelInfo
										: __assign({}, api_1.openAiModelInfoSaneDefaults)
									modelInfo = __assign(__assign({}, modelInfo), { isR1FormatRequired: isChecked })
									setApiConfiguration(__assign(__assign({}, apiConfiguration), { openAiModelInfo: modelInfo }))
								}}>
								Enable R1 messages format
							</react_1.VSCodeCheckbox>
							<div style={{ display: "flex", gap: 10, marginTop: "5px" }}>
								<react_1.VSCodeTextField
									value={
										(
											(_e =
												apiConfiguration === null || apiConfiguration === void 0
													? void 0
													: apiConfiguration.openAiModelInfo) === null || _e === void 0
												? void 0
												: _e.contextWindow
										)
											? apiConfiguration.openAiModelInfo.contextWindow.toString()
											: (_f = api_1.openAiModelInfoSaneDefaults.contextWindow) === null || _f === void 0
												? void 0
												: _f.toString()
									}
									style={{ flex: 1 }}
									onInput={function (input) {
										var modelInfo = (
											apiConfiguration === null || apiConfiguration === void 0
												? void 0
												: apiConfiguration.openAiModelInfo
										)
											? apiConfiguration.openAiModelInfo
											: __assign({}, api_1.openAiModelInfoSaneDefaults)
										modelInfo.contextWindow = Number(input.target.value)
										setApiConfiguration(
											__assign(__assign({}, apiConfiguration), { openAiModelInfo: modelInfo }),
										)
									}}>
									<span style={{ fontWeight: 500 }}>Context Window Size</span>
								</react_1.VSCodeTextField>
								<react_1.VSCodeTextField
									value={
										(
											(_g =
												apiConfiguration === null || apiConfiguration === void 0
													? void 0
													: apiConfiguration.openAiModelInfo) === null || _g === void 0
												? void 0
												: _g.maxTokens
										)
											? apiConfiguration.openAiModelInfo.maxTokens.toString()
											: (_h = api_1.openAiModelInfoSaneDefaults.maxTokens) === null || _h === void 0
												? void 0
												: _h.toString()
									}
									style={{ flex: 1 }}
									onInput={function (input) {
										var modelInfo = (
											apiConfiguration === null || apiConfiguration === void 0
												? void 0
												: apiConfiguration.openAiModelInfo
										)
											? apiConfiguration.openAiModelInfo
											: __assign({}, api_1.openAiModelInfoSaneDefaults)
										modelInfo.maxTokens = input.target.value
										setApiConfiguration(
											__assign(__assign({}, apiConfiguration), { openAiModelInfo: modelInfo }),
										)
									}}>
									<span style={{ fontWeight: 500 }}>Max Output Tokens</span>
								</react_1.VSCodeTextField>
							</div>
							<div style={{ display: "flex", gap: 10, marginTop: "5px" }}>
								<react_1.VSCodeTextField
									value={
										(
											(_j =
												apiConfiguration === null || apiConfiguration === void 0
													? void 0
													: apiConfiguration.openAiModelInfo) === null || _j === void 0
												? void 0
												: _j.inputPrice
										)
											? apiConfiguration.openAiModelInfo.inputPrice.toString()
											: (_k = api_1.openAiModelInfoSaneDefaults.inputPrice) === null || _k === void 0
												? void 0
												: _k.toString()
									}
									style={{ flex: 1 }}
									onInput={function (input) {
										var modelInfo = (
											apiConfiguration === null || apiConfiguration === void 0
												? void 0
												: apiConfiguration.openAiModelInfo
										)
											? apiConfiguration.openAiModelInfo
											: __assign({}, api_1.openAiModelInfoSaneDefaults)
										modelInfo.inputPrice = input.target.value
										setApiConfiguration(
											__assign(__assign({}, apiConfiguration), { openAiModelInfo: modelInfo }),
										)
									}}>
									<span style={{ fontWeight: 500 }}>Input Price / 1M tokens</span>
								</react_1.VSCodeTextField>
								<react_1.VSCodeTextField
									value={
										(
											(_l =
												apiConfiguration === null || apiConfiguration === void 0
													? void 0
													: apiConfiguration.openAiModelInfo) === null || _l === void 0
												? void 0
												: _l.outputPrice
										)
											? apiConfiguration.openAiModelInfo.outputPrice.toString()
											: (_m = api_1.openAiModelInfoSaneDefaults.outputPrice) === null || _m === void 0
												? void 0
												: _m.toString()
									}
									style={{ flex: 1 }}
									onInput={function (input) {
										var modelInfo = (
											apiConfiguration === null || apiConfiguration === void 0
												? void 0
												: apiConfiguration.openAiModelInfo
										)
											? apiConfiguration.openAiModelInfo
											: __assign({}, api_1.openAiModelInfoSaneDefaults)
										modelInfo.outputPrice = input.target.value
										setApiConfiguration(
											__assign(__assign({}, apiConfiguration), { openAiModelInfo: modelInfo }),
										)
									}}>
									<span style={{ fontWeight: 500 }}>Output Price / 1M tokens</span>
								</react_1.VSCodeTextField>
							</div>
							<div style={{ display: "flex", gap: 10, marginTop: "5px" }}>
								<react_1.VSCodeTextField
									value={
										(
											(_o =
												apiConfiguration === null || apiConfiguration === void 0
													? void 0
													: apiConfiguration.openAiModelInfo) === null || _o === void 0
												? void 0
												: _o.temperature
										)
											? apiConfiguration.openAiModelInfo.temperature.toString()
											: (_p = api_1.openAiModelInfoSaneDefaults.temperature) === null || _p === void 0
												? void 0
												: _p.toString()
									}
									onInput={function (input) {
										var modelInfo = (
											apiConfiguration === null || apiConfiguration === void 0
												? void 0
												: apiConfiguration.openAiModelInfo
										)
											? apiConfiguration.openAiModelInfo
											: __assign({}, api_1.openAiModelInfoSaneDefaults)
										// Check if the input ends with a decimal point or has trailing zeros after decimal
										var value = input.target.value
										var shouldPreserveFormat =
											value.endsWith(".") || (value.includes(".") && value.endsWith("0"))
										modelInfo.temperature =
											value === ""
												? api_1.openAiModelInfoSaneDefaults.temperature
												: shouldPreserveFormat
													? value // Keep as string to preserve decimal format
													: parseFloat(value)
										setApiConfiguration(
											__assign(__assign({}, apiConfiguration), { openAiModelInfo: modelInfo }),
										)
									}}>
									<span style={{ fontWeight: 500 }}>Temperature</span>
								</react_1.VSCodeTextField>
							</div>
						</>
					)}
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						<span style={{ color: "var(--vscode-errorForeground)" }}>
							(<span style={{ fontWeight: 500 }}>Note:</span> Cline uses complex prompts and works best with Claude
							models. Less capable models may not work as expected.)
						</span>
					</p>
				</div>
			)}

			{selectedProvider === "requesty" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.requestyApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("requestyApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>API Key</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.requestyModelId) || ""
						}
						style={{ width: "100%" }}
						onInput={handleInputChange("requestyModelId")}
						placeholder={"Enter Model ID..."}>
						<span style={{ fontWeight: 500 }}>Model ID</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						<span style={{ color: "var(--vscode-errorForeground)" }}>
							(<span style={{ fontWeight: 500 }}>Note:</span> Cline uses complex prompts and works best with Claude
							models. Less capable models may not work as expected.)
						</span>
					</p>
				</div>
			)}

			{selectedProvider === "together" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.togetherApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("togetherApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>API Key</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.togetherModelId) || ""
						}
						style={{ width: "100%" }}
						onInput={handleInputChange("togetherModelId")}
						placeholder={"Enter Model ID..."}>
						<span style={{ fontWeight: 500 }}>Model ID</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						<span style={{ color: "var(--vscode-errorForeground)" }}>
							(<span style={{ fontWeight: 500 }}>Note:</span> Cline uses complex prompts and works best with Claude
							models. Less capable models may not work as expected.)
						</span>
					</p>
				</div>
			)}

			{selectedProvider === "vscode-lm" && (
				<div>
					<exports.DropdownContainer zIndex={DROPDOWN_Z_INDEX - 2} className="dropdown-container">
						<label htmlFor="vscode-lm-model">
							<span style={{ fontWeight: 500 }}>Language Model</span>
						</label>
						{vsCodeLmModels.length > 0 ? (
							<react_1.VSCodeDropdown
								id="vscode-lm-model"
								value={
									(
										apiConfiguration === null || apiConfiguration === void 0
											? void 0
											: apiConfiguration.vsCodeLmModelSelector
									)
										? ""
												.concat(
													(_q = apiConfiguration.vsCodeLmModelSelector.vendor) !== null && _q !== void 0
														? _q
														: "",
													"/",
												)
												.concat(
													(_r = apiConfiguration.vsCodeLmModelSelector.family) !== null && _r !== void 0
														? _r
														: "",
												)
										: ""
								}
								onChange={function (e) {
									var value = e.target.value
									if (!value) {
										return
									}
									var _a = value.split("/"),
										vendor = _a[0],
										family = _a[1]
									handleInputChange("vsCodeLmModelSelector")({
										target: {
											value: { vendor: vendor, family: family },
										},
									})
								}}
								style={{ width: "100%" }}>
								<react_1.VSCodeOption value="">Select a model...</react_1.VSCodeOption>
								{vsCodeLmModels.map(function (model) {
									return (
										<react_1.VSCodeOption
											key={"".concat(model.vendor, "/").concat(model.family)}
											value={"".concat(model.vendor, "/").concat(model.family)}>
											{model.vendor} - {model.family}
										</react_1.VSCodeOption>
									)
								})}
							</react_1.VSCodeDropdown>
						) : (
							<p
								style={{
									fontSize: "12px",
									marginTop: "5px",
									color: "var(--vscode-descriptionForeground)",
								}}>
								The VS Code Language Model API allows you to run models provided by other VS Code extensions
								(including but not limited to GitHub Copilot). The easiest way to get started is to install the
								Copilot extension from the VS Marketplace and enabling Claude 3.7 Sonnet.
							</p>
						)}

						<p
							style={{
								fontSize: "12px",
								marginTop: "5px",
								color: "var(--vscode-errorForeground)",
								fontWeight: 500,
							}}>
							Note: This is a very experimental integration and may not work as expected.
						</p>
					</exports.DropdownContainer>
				</div>
			)}

			{selectedProvider === "lmstudio" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.lmStudioBaseUrl) || ""
						}
						style={{ width: "100%" }}
						type="url"
						onInput={handleInputChange("lmStudioBaseUrl")}
						placeholder={"Default: http://localhost:1234"}>
						<span style={{ fontWeight: 500 }}>Base URL (optional)</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.lmStudioModelId) || ""
						}
						style={{ width: "100%" }}
						onInput={handleInputChange("lmStudioModelId")}
						placeholder={"e.g. meta-llama-3.1-8b-instruct"}>
						<span style={{ fontWeight: 500 }}>Model ID</span>
					</react_1.VSCodeTextField>
					{lmStudioModels.length > 0 && (
						<react_1.VSCodeRadioGroup
							value={
								lmStudioModels.includes(
									(apiConfiguration === null || apiConfiguration === void 0
										? void 0
										: apiConfiguration.lmStudioModelId) || "",
								)
									? apiConfiguration === null || apiConfiguration === void 0
										? void 0
										: apiConfiguration.lmStudioModelId
									: ""
							}
							onChange={function (e) {
								var _a
								var value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value
								// need to check value first since radio group returns empty string sometimes
								if (value) {
									handleInputChange("lmStudioModelId")({
										target: { value: value },
									})
								}
							}}>
							{lmStudioModels.map(function (model) {
								return (
									<react_1.VSCodeRadio
										key={model}
										value={model}
										checked={
											(apiConfiguration === null || apiConfiguration === void 0
												? void 0
												: apiConfiguration.lmStudioModelId) === model
										}>
										{model}
									</react_1.VSCodeRadio>
								)
							})}
						</react_1.VSCodeRadioGroup>
					)}
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						LM Studio allows you to run models locally on your computer. For instructions on how to get started, see
						their
						<react_1.VSCodeLink href="https://lmstudio.ai/docs" style={{ display: "inline", fontSize: "inherit" }}>
							quickstart guide.
						</react_1.VSCodeLink>
						You will also need to start LM Studio's{" "}
						<react_1.VSCodeLink
							href="https://lmstudio.ai/docs/basics/server"
							style={{ display: "inline", fontSize: "inherit" }}>
							local server
						</react_1.VSCodeLink>{" "}
						feature to use it with this extension.{" "}
						<span style={{ color: "var(--vscode-errorForeground)" }}>
							(<span style={{ fontWeight: 500 }}>Note:</span> Cline uses complex prompts and works best with Claude
							models. Less capable models may not work as expected.)
						</span>
					</p>
				</div>
			)}

			{selectedProvider === "litellm" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.liteLlmApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("liteLlmApiKey")}
						placeholder="Default: noop">
						<span style={{ fontWeight: 500 }}>API Key</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.liteLlmBaseUrl) || ""
						}
						style={{ width: "100%" }}
						type="url"
						onInput={handleInputChange("liteLlmBaseUrl")}
						placeholder={"Default: http://localhost:4000"}>
						<span style={{ fontWeight: 500 }}>Base URL (optional)</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.liteLlmModelId) || ""
						}
						style={{ width: "100%" }}
						onInput={handleInputChange("liteLlmModelId")}
						placeholder={"e.g. gpt-4"}>
						<span style={{ fontWeight: 500 }}>Model ID</span>
					</react_1.VSCodeTextField>

					<>
						<ThinkingBudgetSlider_1.default
							apiConfiguration={apiConfiguration}
							setApiConfiguration={setApiConfiguration}
						/>
						<p
							style={{
								fontSize: "12px",
								marginTop: "5px",
								color: "var(--vscode-descriptionForeground)",
							}}>
							Extended thinking is available for models as Sonnet-3-7, o3-mini, Deepseek R1, etc. More info on{" "}
							<react_1.VSCodeLink
								href="https://docs.litellm.ai/docs/reasoning_content"
								style={{ display: "inline", fontSize: "inherit" }}>
								thinking mode configuration
							</react_1.VSCodeLink>
						</p>
					</>

					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						LiteLLM provides a unified interface to access various LLM providers' models. See their{" "}
						<react_1.VSCodeLink
							href="https://docs.litellm.ai/docs/"
							style={{ display: "inline", fontSize: "inherit" }}>
							quickstart guide
						</react_1.VSCodeLink>{" "}
						for more information.
					</p>
				</div>
			)}

			{selectedProvider === "ollama" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.ollamaBaseUrl) || ""
						}
						style={{ width: "100%" }}
						type="url"
						onInput={handleInputChange("ollamaBaseUrl")}
						placeholder={"Default: http://localhost:11434"}>
						<span style={{ fontWeight: 500 }}>Base URL (optional)</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.ollamaModelId) || ""
						}
						style={{ width: "100%" }}
						onInput={handleInputChange("ollamaModelId")}
						placeholder={"e.g. llama3.1"}>
						<span style={{ fontWeight: 500 }}>Model ID</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.ollamaApiOptionsCtxNum) || "32768"
						}
						style={{ width: "100%" }}
						onInput={handleInputChange("ollamaApiOptionsCtxNum")}
						placeholder={"e.g. 32768"}>
						<span style={{ fontWeight: 500 }}>Model Context Window</span>
					</react_1.VSCodeTextField>
					{ollamaModels.length > 0 && (
						<react_1.VSCodeRadioGroup
							value={
								ollamaModels.includes(
									(apiConfiguration === null || apiConfiguration === void 0
										? void 0
										: apiConfiguration.ollamaModelId) || "",
								)
									? apiConfiguration === null || apiConfiguration === void 0
										? void 0
										: apiConfiguration.ollamaModelId
									: ""
							}
							onChange={function (e) {
								var _a
								var value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value
								// need to check value first since radio group returns empty string sometimes
								if (value) {
									handleInputChange("ollamaModelId")({
										target: { value: value },
									})
								}
							}}>
							{ollamaModels.map(function (model) {
								return (
									<react_1.VSCodeRadio
										key={model}
										value={model}
										checked={
											(apiConfiguration === null || apiConfiguration === void 0
												? void 0
												: apiConfiguration.ollamaModelId) === model
										}>
										{model}
									</react_1.VSCodeRadio>
								)
							})}
						</react_1.VSCodeRadioGroup>
					)}
					<p
						style={{
							fontSize: "12px",
							marginTop: "5px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						Ollama allows you to run models locally on your computer. For instructions on how to get started, see
						their
						<react_1.VSCodeLink
							href="https://github.com/ollama/ollama/blob/main/README.md"
							style={{ display: "inline", fontSize: "inherit" }}>
							quickstart guide.
						</react_1.VSCodeLink>
						<span style={{ color: "var(--vscode-errorForeground)" }}>
							(<span style={{ fontWeight: 500 }}>Note:</span> Cline uses complex prompts and works best with Claude
							models. Less capable models may not work as expected.)
						</span>
					</p>
				</div>
			)}

			{selectedProvider === "xai" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.xaiApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("xaiApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>X AI API Key</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.xaiApiKey) && (
							<react_1.VSCodeLink href="https://x.ai" style={{ display: "inline", fontSize: "inherit" }}>
								You can get an X AI API key by signing up here.
							</react_1.VSCodeLink>
						)}
					</p>
					{/* Note: To fully implement this, you would need to add a handler in ClineProvider.ts */}
					{/* {apiConfiguration?.xaiApiKey && (
                <button
                    onClick={() => {
                        vscode.postMessage({
                            type: "requestXAIModels",
                            text: apiConfiguration?.xaiApiKey,
                        })
                    }}
                    style={{ margin: "5px 0 0 0" }}
                    className="vscode-button">
                    Fetch Available Models
                </button>
            )} */}
				</div>
			)}

			{selectedProvider === "sambanova" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.sambanovaApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("sambanovaApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>SambaNova API Key</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0
							? void 0
							: apiConfiguration.sambanovaApiKey) && (
							<react_1.VSCodeLink
								href="https://docs.sambanova.ai/cloud/docs/get-started/overview"
								style={{
									display: "inline",
									fontSize: "inherit",
								}}>
								You can get a SambaNova API key by signing up here.
							</react_1.VSCodeLink>
						)}
					</p>
				</div>
			)}

			{selectedProvider === "yandexcloud" && (
				<div>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.yandexcloudApiKey) || ""
						}
						style={{ width: "100%" }}
						type="password"
						onInput={handleInputChange("yandexcloudApiKey")}
						placeholder="Enter API Key...">
						<span style={{ fontWeight: 500 }}>Yandex Cloud API Key</span>
					</react_1.VSCodeTextField>
					<react_1.VSCodeTextField
						value={
							(apiConfiguration === null || apiConfiguration === void 0
								? void 0
								: apiConfiguration.yandexcloudFolderId) || ""
						}
						style={{ width: "100%" }}
						onInput={handleInputChange("yandexcloudFolderId")}
						placeholder="Enter Folder ID...">
						<span style={{ fontWeight: 500 }}>Folder ID</span>
					</react_1.VSCodeTextField>
					<p
						style={{
							fontSize: "12px",
							marginTop: 3,
							color: "var(--vscode-descriptionForeground)",
						}}>
						This key is stored locally and only used to make API requests from this extension.
						{!(apiConfiguration === null || apiConfiguration === void 0
							? void 0
							: apiConfiguration.yandexcloudApiKey) && (
							<react_1.VSCodeLink
								href="https://cloud.yandex.ru/ru/docs/yandexgpt/api-ref/authentication"
								style={{
									display: "inline",
									fontSize: "inherit",
								}}>
								Вы можете получить API ключ Yandex Cloud зарегистрировавшись здесь.
							</react_1.VSCodeLink>
						)}
					</p>
				</div>
			)}

			{apiErrorMessage && (
				<p
					style={{
						margin: "-10px 0 4px 0",
						fontSize: 12,
						color: "var(--vscode-errorForeground)",
					}}>
					{apiErrorMessage}
				</p>
			)}

			{(selectedProvider === "openrouter" || selectedProvider === "cline") && showModelOptions && (
				<>
					<react_1.VSCodeCheckbox
						style={{ marginTop: -10 }}
						checked={providerSortingSelected}
						onChange={function (e) {
							var isChecked = e.target.checked === true
							setProviderSortingSelected(isChecked)
							if (!isChecked) {
								setApiConfiguration(__assign(__assign({}, apiConfiguration), { openRouterProviderSorting: "" }))
							}
						}}>
						Sort underlying provider routing
					</react_1.VSCodeCheckbox>

					{providerSortingSelected && (
						<div style={{ marginBottom: -6 }}>
							<exports.DropdownContainer
								className="dropdown-container"
								zIndex={OpenRouterModelPicker_1.OPENROUTER_MODEL_PICKER_Z_INDEX + 1}>
								<react_1.VSCodeDropdown
									style={{ width: "100%", marginTop: 3 }}
									value={
										apiConfiguration === null || apiConfiguration === void 0
											? void 0
											: apiConfiguration.openRouterProviderSorting
									}
									onChange={function (e) {
										setApiConfiguration(
											__assign(__assign({}, apiConfiguration), {
												openRouterProviderSorting: e.target.value,
											}),
										)
									}}>
									<react_1.VSCodeOption value="">Default</react_1.VSCodeOption>
									<react_1.VSCodeOption value="price">Price</react_1.VSCodeOption>
									<react_1.VSCodeOption value="throughput">Throughput</react_1.VSCodeOption>
									<react_1.VSCodeOption value="latency">Latency</react_1.VSCodeOption>
								</react_1.VSCodeDropdown>
							</exports.DropdownContainer>
							<p style={{ fontSize: "12px", marginTop: 3, color: "var(--vscode-descriptionForeground)" }}>
								{!(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.openRouterProviderSorting) &&
									"Default behavior is to load balance requests across providers (like AWS, Google Vertex, Anthropic), prioritizing price while considering provider uptime"}
								{(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.openRouterProviderSorting) === "price" &&
									"Sort providers by price, prioritizing the lowest cost provider"}
								{(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.openRouterProviderSorting) === "throughput" &&
									"Sort providers by throughput, prioritizing the provider with the highest throughput (may increase cost)"}
								{(apiConfiguration === null || apiConfiguration === void 0
									? void 0
									: apiConfiguration.openRouterProviderSorting) === "latency" &&
									"Sort providers by response time, prioritizing the provider with the lowest latency"}
							</p>
						</div>
					)}
				</>
			)}

			{selectedProvider !== "openrouter" &&
				selectedProvider !== "cline" &&
				selectedProvider !== "openai" &&
				selectedProvider !== "ollama" &&
				selectedProvider !== "lmstudio" &&
				selectedProvider !== "vscode-lm" &&
				selectedProvider !== "litellm" &&
				selectedProvider !== "requesty" &&
				showModelOptions && (
					<>
						<exports.DropdownContainer zIndex={DROPDOWN_Z_INDEX - 2} className="dropdown-container">
							<label htmlFor="model-id">
								<span style={{ fontWeight: 500 }}>Model</span>
							</label>
							{selectedProvider === "anthropic" && createDropdown(api_1.anthropicModels)}
							{selectedProvider === "bedrock" && createDropdown(api_1.bedrockModels)}
							{selectedProvider === "vertex" && createDropdown(api_1.vertexModels)}
							{selectedProvider === "gemini" && createDropdown(api_1.geminiModels)}
							{selectedProvider === "openai-native" && createDropdown(api_1.openAiNativeModels)}
							{selectedProvider === "deepseek" && createDropdown(api_1.deepSeekModels)}
							{selectedProvider === "qwen" &&
								createDropdown(
									(apiConfiguration === null || apiConfiguration === void 0
										? void 0
										: apiConfiguration.qwenApiLine) === "china"
										? api_1.mainlandQwenModels
										: api_1.internationalQwenModels,
								)}
							{selectedProvider === "doubao" && createDropdown(api_1.doubaoModels)}
							{selectedProvider === "mistral" && createDropdown(api_1.mistralModels)}
							{selectedProvider === "asksage" && createDropdown(api_1.askSageModels)}
							{selectedProvider === "xai" && createDropdown(api_1.xaiModels)}
							{selectedProvider === "sambanova" && createDropdown(api_1.sambanovaModels)}
						</exports.DropdownContainer>

						{((selectedProvider === "anthropic" && selectedModelId === "claude-3-7-sonnet-20250219") ||
							(selectedProvider === "bedrock" && selectedModelId === "anthropic.claude-3-7-sonnet-20250219-v1:0") ||
							(selectedProvider === "vertex" && selectedModelId === "claude-3-7-sonnet@20250219")) && (
							<ThinkingBudgetSlider_1.default
								apiConfiguration={apiConfiguration}
								setApiConfiguration={setApiConfiguration}
							/>
						)}

						<exports.ModelInfoView
							selectedModelId={selectedModelId}
							modelInfo={selectedModelInfo}
							isDescriptionExpanded={isDescriptionExpanded}
							setIsDescriptionExpanded={setIsDescriptionExpanded}
							isPopup={isPopup}
						/>
					</>
				)}

			{(selectedProvider === "openrouter" || selectedProvider === "cline") && showModelOptions && (
				<OpenRouterModelPicker_1.default isPopup={isPopup} />
			)}

			{modelIdErrorMessage && (
				<p
					style={{
						margin: "-10px 0 4px 0",
						fontSize: 12,
						color: "var(--vscode-errorForeground)",
					}}>
					{modelIdErrorMessage}
				</p>
			)}
		</div>
	)
}
function getOpenRouterAuthUrl(uriScheme) {
	return "https://openrouter.ai/auth?callback_url=".concat(uriScheme || "vscode", "://saoudrizwan.claude-dev/openrouter")
}
var formatPrice = function (price) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(price)
}
exports.formatPrice = formatPrice
var ModelInfoView = function (_a) {
	var _b, _c, _d
	var selectedModelId = _a.selectedModelId,
		modelInfo = _a.modelInfo,
		isDescriptionExpanded = _a.isDescriptionExpanded,
		setIsDescriptionExpanded = _a.setIsDescriptionExpanded,
		isPopup = _a.isPopup
	var isGemini = Object.keys(api_1.geminiModels).includes(selectedModelId)
	var infoItems = [
		modelInfo.description && (
			<OpenRouterModelPicker_1.ModelDescriptionMarkdown
				key="description"
				markdown={modelInfo.description}
				isExpanded={isDescriptionExpanded}
				setIsExpanded={setIsDescriptionExpanded}
				isPopup={isPopup}
			/>
		),
		<ModelInfoSupportsItem
			key="supportsImages"
			isSupported={(_b = modelInfo.supportsImages) !== null && _b !== void 0 ? _b : false}
			supportsLabel="Supports images"
			doesNotSupportLabel="Does not support images"
		/>,
		<ModelInfoSupportsItem
			key="supportsComputerUse"
			isSupported={(_c = modelInfo.supportsComputerUse) !== null && _c !== void 0 ? _c : false}
			supportsLabel="Supports computer use"
			doesNotSupportLabel="Does not support computer use"
		/>,
		!isGemini && (
			<ModelInfoSupportsItem
				key="supportsPromptCache"
				isSupported={modelInfo.supportsPromptCache}
				supportsLabel="Supports prompt caching"
				doesNotSupportLabel="Does not support prompt caching"
			/>
		),
		modelInfo.maxTokens !== undefined && modelInfo.maxTokens > 0 && (
			<span key="maxTokens">
				<span style={{ fontWeight: 500 }}>Max output:</span>{" "}
				{(_d = modelInfo.maxTokens) === null || _d === void 0 ? void 0 : _d.toLocaleString()} tokens
			</span>
		),
		modelInfo.inputPrice !== undefined && modelInfo.inputPrice > 0 && (
			<span key="inputPrice">
				<span style={{ fontWeight: 500 }}>Input price:</span> {(0, exports.formatPrice)(modelInfo.inputPrice)}/million
				tokens
			</span>
		),
		modelInfo.supportsPromptCache && modelInfo.cacheWritesPrice && (
			<span key="cacheWritesPrice">
				<span style={{ fontWeight: 500 }}>Cache writes price:</span>{" "}
				{(0, exports.formatPrice)(modelInfo.cacheWritesPrice || 0)}
				/million tokens
			</span>
		),
		modelInfo.supportsPromptCache && modelInfo.cacheReadsPrice && (
			<span key="cacheReadsPrice">
				<span style={{ fontWeight: 500 }}>Cache reads price:</span>{" "}
				{(0, exports.formatPrice)(modelInfo.cacheReadsPrice || 0)}/million tokens
			</span>
		),
		modelInfo.outputPrice !== undefined && modelInfo.outputPrice > 0 && (
			<span key="outputPrice">
				<span style={{ fontWeight: 500 }}>Output price:</span> {(0, exports.formatPrice)(modelInfo.outputPrice)}/million
				tokens
			</span>
		),
		isGemini && (
			<span key="geminiInfo" style={{ fontStyle: "italic" }}>
				* Free up to {selectedModelId && selectedModelId.includes("flash") ? "15" : "2"} requests per minute. After that,
				billing depends on prompt size.{" "}
				<react_1.VSCodeLink href="https://ai.google.dev/pricing" style={{ display: "inline", fontSize: "inherit" }}>
					For more info, see pricing details.
				</react_1.VSCodeLink>
			</span>
		),
	].filter(Boolean)
	return (
		<p
			style={{
				fontSize: "12px",
				marginTop: "2px",
				color: "var(--vscode-descriptionForeground)",
			}}>
			{infoItems.map(function (item, index) {
				return (
					<react_2.Fragment key={index}>
						{item}
						{index < infoItems.length - 1 && <br />}
					</react_2.Fragment>
				)
			})}
		</p>
	)
}
exports.ModelInfoView = ModelInfoView
var ModelInfoSupportsItem = function (_a) {
	var isSupported = _a.isSupported,
		supportsLabel = _a.supportsLabel,
		doesNotSupportLabel = _a.doesNotSupportLabel
	return (
		<span
			style={{
				fontWeight: 500,
				color: isSupported ? "var(--vscode-charts-green)" : "var(--vscode-errorForeground)",
			}}>
			<i
				className={"codicon codicon-".concat(isSupported ? "check" : "x")}
				style={{
					marginRight: 4,
					marginBottom: isSupported ? 1 : -1,
					fontSize: isSupported ? 11 : 13,
					fontWeight: 700,
					display: "inline-block",
					verticalAlign: "bottom",
				}}></i>
			{isSupported ? supportsLabel : doesNotSupportLabel}
		</span>
	)
}
function normalizeApiConfiguration(apiConfiguration) {
	var provider =
		(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) || "anthropic"
	var modelId = apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiModelId
	var getProviderData = function (models, defaultId) {
		var selectedModelId
		var selectedModelInfo
		if (modelId && modelId in models) {
			selectedModelId = modelId
			selectedModelInfo = models[modelId]
		} else {
			selectedModelId = defaultId
			selectedModelInfo = models[defaultId]
		}
		return {
			selectedProvider: provider,
			selectedModelId: selectedModelId,
			selectedModelInfo: selectedModelInfo,
		}
	}
	switch (provider) {
		case "anthropic":
			return getProviderData(api_1.anthropicModels, api_1.anthropicDefaultModelId)
		case "bedrock":
			return getProviderData(api_1.bedrockModels, api_1.bedrockDefaultModelId)
		case "vertex":
			return getProviderData(api_1.vertexModels, api_1.vertexDefaultModelId)
		case "gemini":
			return getProviderData(api_1.geminiModels, api_1.geminiDefaultModelId)
		case "openai-native":
			return getProviderData(api_1.openAiNativeModels, api_1.openAiNativeDefaultModelId)
		case "deepseek":
			return getProviderData(api_1.deepSeekModels, api_1.deepSeekDefaultModelId)
		case "qwen":
			var qwenModels =
				(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.qwenApiLine) === "china"
					? api_1.mainlandQwenModels
					: api_1.internationalQwenModels
			var qwenDefaultId =
				(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.qwenApiLine) === "china"
					? api_1.mainlandQwenDefaultModelId
					: api_1.internationalQwenDefaultModelId
			return getProviderData(qwenModels, qwenDefaultId)
		case "doubao":
			return getProviderData(api_1.doubaoModels, api_1.doubaoDefaultModelId)
		case "mistral":
			return getProviderData(api_1.mistralModels, api_1.mistralDefaultModelId)
		case "asksage":
			return getProviderData(api_1.askSageModels, api_1.askSageDefaultModelId)
		case "openrouter":
			return {
				selectedProvider: provider,
				selectedModelId:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openRouterModelId) ||
					api_1.openRouterDefaultModelId,
				selectedModelInfo:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openRouterModelInfo) ||
					api_1.openRouterDefaultModelInfo,
			}
		case "cline":
			return {
				selectedProvider: provider,
				selectedModelId:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openRouterModelId) ||
					api_1.openRouterDefaultModelId,
				selectedModelInfo:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openRouterModelInfo) ||
					api_1.openRouterDefaultModelInfo,
			}
		case "openai":
			return {
				selectedProvider: provider,
				selectedModelId:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openAiModelId) || "",
				selectedModelInfo:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openAiModelInfo) ||
					api_1.openAiModelInfoSaneDefaults,
			}
		case "ollama":
			return {
				selectedProvider: provider,
				selectedModelId:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.ollamaModelId) || "",
				selectedModelInfo: api_1.openAiModelInfoSaneDefaults,
			}
		case "lmstudio":
			return {
				selectedProvider: provider,
				selectedModelId:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.lmStudioModelId) || "",
				selectedModelInfo: api_1.openAiModelInfoSaneDefaults,
			}
		case "requesty":
			return {
				selectedProvider: provider,
				selectedModelId:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.requestyModelId) || "",
				selectedModelInfo: api_1.openAiModelInfoSaneDefaults,
			}
		case "vscode-lm":
			return {
				selectedProvider: provider,
				selectedModelId: (
					apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.vsCodeLmModelSelector
				)
					? ""
							.concat(apiConfiguration.vsCodeLmModelSelector.vendor, "/")
							.concat(apiConfiguration.vsCodeLmModelSelector.family)
					: "",
				selectedModelInfo: __assign(__assign({}, api_1.openAiModelInfoSaneDefaults), { supportsImages: false }),
			}
		case "litellm":
			return {
				selectedProvider: provider,
				selectedModelId:
					(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.liteLlmModelId) || "",
				selectedModelInfo: api_1.openAiModelInfoSaneDefaults,
			}
		case "xai":
			return getProviderData(api_1.xaiModels, api_1.xaiDefaultModelId)
		case "sambanova":
			return getProviderData(api_1.sambanovaModels, api_1.sambanovaDefaultModelId)
		case "yandexcloud":
			return getProviderData(api_1.yandexCloudModels, api_1.yandexCloudDefaultModelId)
		default:
			return getProviderData(api_1.anthropicModels, api_1.anthropicDefaultModelId)
	}
}
exports.default = (0, react_2.memo)(ApiOptions)
var templateObject_1
