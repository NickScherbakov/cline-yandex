"use strict"
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
exports.useExtensionState = exports.ExtensionStateContextProvider = void 0
var react_1 = require("react")
var react_use_1 = require("react-use")
var AutoApprovalSettings_1 = require("@shared/AutoApprovalSettings")
var ExtensionMessage_1 = require("@shared/ExtensionMessage")
var api_1 = require("@shared/api")
var array_1 = require("@shared/array")
var textMateToHljs_1 = require("../utils/textMateToHljs")
var vscode_1 = require("../utils/vscode")
var BrowserSettings_1 = require("@shared/BrowserSettings")
var ChatSettings_1 = require("@shared/ChatSettings")
var ExtensionStateContext = (0, react_1.createContext)(undefined)
var ExtensionStateContextProvider = function (_a) {
	var _b
	var children = _a.children
	var _c = (0, react_1.useState)({
			version: "",
			clineMessages: [],
			taskHistory: [],
			shouldShowAnnouncement: false,
			autoApprovalSettings: AutoApprovalSettings_1.DEFAULT_AUTO_APPROVAL_SETTINGS,
			browserSettings: BrowserSettings_1.DEFAULT_BROWSER_SETTINGS,
			chatSettings: ChatSettings_1.DEFAULT_CHAT_SETTINGS,
			platform: ExtensionMessage_1.DEFAULT_PLATFORM,
			telemetrySetting: "unset",
			vscMachineId: "",
			planActSeparateModelsSetting: true,
		}),
		state = _c[0],
		setState = _c[1]
	var _d = (0, react_1.useState)(false),
		didHydrateState = _d[0],
		setDidHydrateState = _d[1]
	var _e = (0, react_1.useState)(false),
		showWelcome = _e[0],
		setShowWelcome = _e[1]
	var _f = (0, react_1.useState)(undefined),
		theme = _f[0],
		setTheme = _f[1]
	var _g = (0, react_1.useState)([]),
		filePaths = _g[0],
		setFilePaths = _g[1]
	var _h = (0, react_1.useState)(((_b = {}), (_b[api_1.openRouterDefaultModelId] = api_1.openRouterDefaultModelInfo), _b)),
		openRouterModels = _h[0],
		setOpenRouterModels = _h[1]
	var _j = (0, react_1.useState)(null),
		totalTasksSize = _j[0],
		setTotalTasksSize = _j[1]
	var _k = (0, react_1.useState)([]),
		openAiModels = _k[0],
		setOpenAiModels = _k[1]
	var _l = (0, react_1.useState)([]),
		mcpServers = _l[0],
		setMcpServers = _l[1]
	var _m = (0, react_1.useState)({ items: [] }),
		mcpMarketplaceCatalog = _m[0],
		setMcpMarketplaceCatalog = _m[1]
	var handleMessage = (0, react_1.useCallback)(function (event) {
		var _a
		var _b, _c, _d, _e, _f, _g
		var message = event.data
		switch (message.type) {
			case "state": {
				setState(message.state)
				var config = (_b = message.state) === null || _b === void 0 ? void 0 : _b.apiConfiguration
				var hasKey = config
					? [
							config.apiKey,
							config.openRouterApiKey,
							config.awsRegion,
							config.vertexProjectId,
							config.openAiApiKey,
							config.ollamaModelId,
							config.lmStudioModelId,
							config.liteLlmApiKey,
							config.geminiApiKey,
							config.openAiNativeApiKey,
							config.deepSeekApiKey,
							config.requestyApiKey,
							config.togetherApiKey,
							config.qwenApiKey,
							config.doubaoApiKey,
							config.mistralApiKey,
							config.vsCodeLmModelSelector,
							config.clineApiKey,
							config.asksageApiKey,
							config.xaiApiKey,
							config.sambanovaApiKey,
						].some(function (key) {
							return key !== undefined
						})
					: false
				setShowWelcome(!hasKey)
				setDidHydrateState(true)
				break
			}
			case "theme": {
				if (message.text) {
					setTheme((0, textMateToHljs_1.convertTextMateToHljs)(JSON.parse(message.text)))
				}
				break
			}
			case "workspaceUpdated": {
				setFilePaths((_c = message.filePaths) !== null && _c !== void 0 ? _c : [])
				break
			}
			case "partialMessage": {
				var partialMessage_1 = message.partialMessage
				setState(function (prevState) {
					// worth noting it will never be possible for a more up-to-date message to be sent here or in normal messages post since the presentAssistantContent function uses lock
					var lastIndex = (0, array_1.findLastIndex)(prevState.clineMessages, function (msg) {
						return msg.ts === partialMessage_1.ts
					})
					if (lastIndex !== -1) {
						var newClineMessages = __spreadArray([], prevState.clineMessages, true)
						newClineMessages[lastIndex] = partialMessage_1
						return __assign(__assign({}, prevState), { clineMessages: newClineMessages })
					}
					return prevState
				})
				break
			}
			case "openRouterModels": {
				var updatedModels = (_d = message.openRouterModels) !== null && _d !== void 0 ? _d : {}
				setOpenRouterModels(
					__assign(
						((_a = {}), (_a[api_1.openRouterDefaultModelId] = api_1.openRouterDefaultModelInfo), _a),
						updatedModels,
					),
				)
				break
			}
			case "openAiModels": {
				var updatedModels = (_e = message.openAiModels) !== null && _e !== void 0 ? _e : []
				setOpenAiModels(updatedModels)
				break
			}
			case "mcpServers": {
				setMcpServers((_f = message.mcpServers) !== null && _f !== void 0 ? _f : [])
				break
			}
			case "mcpMarketplaceCatalog": {
				if (message.mcpMarketplaceCatalog) {
					setMcpMarketplaceCatalog(message.mcpMarketplaceCatalog)
				}
				break
			}
			case "totalTasksSize": {
				setTotalTasksSize((_g = message.totalTasksSize) !== null && _g !== void 0 ? _g : null)
				break
			}
		}
	}, [])
	;(0, react_use_1.useEvent)("message", handleMessage)
	;(0, react_1.useEffect)(function () {
		vscode_1.vscode.postMessage({ type: "webviewDidLaunch" })
	}, [])
	var contextValue = __assign(__assign({}, state), {
		didHydrateState: didHydrateState,
		showWelcome: showWelcome,
		theme: theme,
		openRouterModels: openRouterModels,
		openAiModels: openAiModels,
		mcpServers: mcpServers,
		mcpMarketplaceCatalog: mcpMarketplaceCatalog,
		filePaths: filePaths,
		totalTasksSize: totalTasksSize,
		setApiConfiguration: function (value) {
			return setState(function (prevState) {
				return __assign(__assign({}, prevState), { apiConfiguration: value })
			})
		},
		setCustomInstructions: function (value) {
			return setState(function (prevState) {
				return __assign(__assign({}, prevState), { customInstructions: value })
			})
		},
		setTelemetrySetting: function (value) {
			return setState(function (prevState) {
				return __assign(__assign({}, prevState), { telemetrySetting: value })
			})
		},
		setPlanActSeparateModelsSetting: function (value) {
			return setState(function (prevState) {
				return __assign(__assign({}, prevState), { planActSeparateModelsSetting: value })
			})
		},
		setShowAnnouncement: function (value) {
			return setState(function (prevState) {
				return __assign(__assign({}, prevState), { shouldShowAnnouncement: value })
			})
		},
	})
	return <ExtensionStateContext.Provider value={contextValue}>{children}</ExtensionStateContext.Provider>
}
exports.ExtensionStateContextProvider = ExtensionStateContextProvider
var useExtensionState = function () {
	var context = (0, react_1.useContext)(ExtensionStateContext)
	if (context === undefined) {
		throw new Error("useExtensionState must be used within an ExtensionStateContextProvider")
	}
	return context
}
exports.useExtensionState = useExtensionState
