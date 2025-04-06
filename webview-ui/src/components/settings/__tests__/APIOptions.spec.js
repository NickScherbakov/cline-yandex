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
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value)
					})
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value))
				} catch (e) {
					reject(e)
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value))
				} catch (e) {
					reject(e)
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next())
		})
	}
var __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		var _ = {
				label: 0,
				sent: function () {
					if (t[0] & 1) throw t[1]
					return t[1]
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype)
		return (
			(g.next = verb(0)),
			(g["throw"] = verb(1)),
			(g["return"] = verb(2)),
			typeof Symbol === "function" &&
				(g[Symbol.iterator] = function () {
					return this
				}),
			g
		)
		function verb(n) {
			return function (v) {
				return step([n, v])
			}
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.")
			while ((g && ((g = 0), op[0] && (_ = 0)), _))
				try {
					if (
						((f = 1),
						y &&
							(t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t
					if (((y = 0), t)) op = [op[0] & 2, t.value]
					switch (op[0]) {
						case 0:
						case 1:
							t = op
							break
						case 4:
							_.label++
							return { value: op[1], done: false }
						case 5:
							_.label++
							y = op[1]
							op = [0]
							continue
						case 7:
							op = _.ops.pop()
							_.trys.pop()
							continue
						default:
							if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
								_ = 0
								continue
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1]
								break
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1]
								t = op
								break
							}
							if (t && _.label < t[2]) {
								_.label = t[2]
								_.ops.push(op)
								break
							}
							if (t[2]) _.ops.pop()
							_.trys.pop()
							continue
					}
					op = body.call(thisArg, _)
				} catch (e) {
					op = [6, e]
					y = 0
				} finally {
					f = t = 0
				}
			if (op[0] & 5) throw op[1]
			return { value: op[0] ? op[1] : void 0, done: true }
		}
	}
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("@testing-library/react")
var vitest_1 = require("vitest")
var ApiOptions_1 = require("../ApiOptions")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
vitest_1.vi.mock("../../../context/ExtensionStateContext", function (importOriginal) {
	return __awaiter(void 0, void 0, void 0, function () {
		var actual
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					return [4 /*yield*/, importOriginal()]
				case 1:
					actual = _a.sent()
					return [
						2 /*return*/,
						__assign(__assign({}, actual), {
							// your mocked methods
							useExtensionState: vitest_1.vi.fn(function () {
								return {
									apiConfiguration: {
										apiProvider: "requesty",
										requestyApiKey: "",
										requestyModelId: "",
									},
									setApiConfiguration: vitest_1.vi.fn(),
									uriScheme: "vscode",
								}
							}),
						}),
					]
			}
		})
	})
})
;(0, vitest_1.describe)("ApiOptions Component", function () {
	vitest_1.vi.clearAllMocks()
	var mockPostMessage = vitest_1.vi.fn()
	beforeEach(function () {
		global.vscode = { postMessage: mockPostMessage }
	})
	;(0, vitest_1.it)("renders Requesty API Key input", function () {
		;(0, react_1.render)(
			<ExtensionStateContext_1.ExtensionStateContextProvider>
				<ApiOptions_1.default showModelOptions={true} />
			</ExtensionStateContext_1.ExtensionStateContextProvider>,
		)
		var apiKeyInput = react_1.screen.getByPlaceholderText("Enter API Key...")
		;(0, vitest_1.expect)(apiKeyInput).toBeInTheDocument()
	})
	;(0, vitest_1.it)("renders Requesty Model ID input", function () {
		;(0, react_1.render)(
			<ExtensionStateContext_1.ExtensionStateContextProvider>
				<ApiOptions_1.default showModelOptions={true} />
			</ExtensionStateContext_1.ExtensionStateContextProvider>,
		)
		var modelIdInput = react_1.screen.getByPlaceholderText("Enter Model ID...")
		;(0, vitest_1.expect)(modelIdInput).toBeInTheDocument()
	})
})
vitest_1.vi.mock("../../../context/ExtensionStateContext", function (importOriginal) {
	return __awaiter(void 0, void 0, void 0, function () {
		var actual
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					return [4 /*yield*/, importOriginal()]
				case 1:
					actual = _a.sent()
					return [
						2 /*return*/,
						__assign(__assign({}, actual), {
							// your mocked methods
							useExtensionState: vitest_1.vi.fn(function () {
								return {
									apiConfiguration: {
										apiProvider: "together",
										requestyApiKey: "",
										requestyModelId: "",
									},
									setApiConfiguration: vitest_1.vi.fn(),
									uriScheme: "vscode",
								}
							}),
						}),
					]
			}
		})
	})
})
;(0, vitest_1.describe)("ApiOptions Component", function () {
	vitest_1.vi.clearAllMocks()
	var mockPostMessage = vitest_1.vi.fn()
	beforeEach(function () {
		global.vscode = { postMessage: mockPostMessage }
	})
	;(0, vitest_1.it)("renders Together API Key input", function () {
		;(0, react_1.render)(
			<ExtensionStateContext_1.ExtensionStateContextProvider>
				<ApiOptions_1.default showModelOptions={true} />
			</ExtensionStateContext_1.ExtensionStateContextProvider>,
		)
		var apiKeyInput = react_1.screen.getByPlaceholderText("Enter API Key...")
		;(0, vitest_1.expect)(apiKeyInput).toBeInTheDocument()
	})
	;(0, vitest_1.it)("renders Together Model ID input", function () {
		;(0, react_1.render)(
			<ExtensionStateContext_1.ExtensionStateContextProvider>
				<ApiOptions_1.default showModelOptions={true} />
			</ExtensionStateContext_1.ExtensionStateContextProvider>,
		)
		var modelIdInput = react_1.screen.getByPlaceholderText("Enter Model ID...")
		;(0, vitest_1.expect)(modelIdInput).toBeInTheDocument()
	})
})
vitest_1.vi.mock("../../../context/ExtensionStateContext", function (importOriginal) {
	return __awaiter(void 0, void 0, void 0, function () {
		var actual
		return __generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					return [4 /*yield*/, importOriginal()]
				case 1:
					actual = _a.sent()
					return [
						2 /*return*/,
						__assign(__assign({}, actual), {
							// your mocked methods
							useExtensionState: vitest_1.vi.fn(function () {
								return {
									apiConfiguration: {
										apiProvider: "openai",
										requestyApiKey: "",
										requestyModelId: "",
									},
									setApiConfiguration: vitest_1.vi.fn(),
									uriScheme: "vscode",
								}
							}),
						}),
					]
			}
		})
	})
})
;(0, vitest_1.describe)("OpenApiInfoOptions", function () {
	var mockPostMessage = vitest_1.vi.fn()
	beforeEach(function () {
		vitest_1.vi.clearAllMocks()
		global.vscode = { postMessage: mockPostMessage }
	})
	;(0, vitest_1.it)("renders OpenAI Supports Images input", function () {
		;(0, react_1.render)(
			<ExtensionStateContext_1.ExtensionStateContextProvider>
				<ApiOptions_1.default showModelOptions={true} />
			</ExtensionStateContext_1.ExtensionStateContextProvider>,
		)
		react_1.fireEvent.click(react_1.screen.getByText("Model Configuration"))
		var apiKeyInput = react_1.screen.getByText("Supports Images")
		;(0, vitest_1.expect)(apiKeyInput).toBeInTheDocument()
	})
	;(0, vitest_1.it)("renders OpenAI Context Window Size input", function () {
		;(0, react_1.render)(
			<ExtensionStateContext_1.ExtensionStateContextProvider>
				<ApiOptions_1.default showModelOptions={true} />
			</ExtensionStateContext_1.ExtensionStateContextProvider>,
		)
		react_1.fireEvent.click(react_1.screen.getByText("Model Configuration"))
		var orgIdInput = react_1.screen.getByText("Context Window Size")
		;(0, vitest_1.expect)(orgIdInput).toBeInTheDocument()
	})
	;(0, vitest_1.it)("renders OpenAI Max Output Tokens input", function () {
		;(0, react_1.render)(
			<ExtensionStateContext_1.ExtensionStateContextProvider>
				<ApiOptions_1.default showModelOptions={true} />
			</ExtensionStateContext_1.ExtensionStateContextProvider>,
		)
		react_1.fireEvent.click(react_1.screen.getByText("Model Configuration"))
		var modelInput = react_1.screen.getByText("Max Output Tokens")
		;(0, vitest_1.expect)(modelInput).toBeInTheDocument()
	})
})
