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
var react_1 = require("@vscode/webview-ui-toolkit/react")
var react_2 = require("react")
var react_textarea_autosize_1 = require("react-textarea-autosize")
var react_use_1 = require("react-use")
var styled_components_1 = require("styled-components")
var context_mentions_1 = require("@shared/context-mentions")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var context_mentions_2 = require("@/utils/context-mentions")
var hooks_1 = require("@/utils/hooks")
var validate_1 = require("@/utils/validate")
var vscode_1 = require("@/utils/vscode")
var CodeBlock_1 = require("@/components/common/CodeBlock")
var Thumbnails_1 = require("@/components/common/Thumbnails")
var Tooltip_1 = require("@/components/common/Tooltip")
var ApiOptions_1 = require("@/components/settings/ApiOptions")
var ChatView_1 = require("@/components/chat/ChatView")
var ContextMenu_1 = require("@/components/chat/ContextMenu")
var PLAN_MODE_COLOR = "var(--vscode-inputValidation-warningBorder)"
var SwitchOption = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tpadding: 2px 8px;\n\tcolor: ",
				";\n\tz-index: 1;\n\ttransition: color 0.2s ease;\n\tfont-size: 12px;\n\twidth: 50%;\n\ttext-align: center;\n\n\t&:hover {\n\t\tbackground-color: ",
				";\n\t}\n",
			],
			[
				"\n\tpadding: 2px 8px;\n\tcolor: ",
				";\n\tz-index: 1;\n\ttransition: color 0.2s ease;\n\tfont-size: 12px;\n\twidth: 50%;\n\ttext-align: center;\n\n\t&:hover {\n\t\tbackground-color: ",
				";\n\t}\n",
			],
		)),
	function (props) {
		return props.isActive ? "white" : "var(--vscode-input-foreground)"
	},
	function (props) {
		return !props.isActive ? "var(--vscode-toolbar-hoverBackground)" : "transparent"
	},
)
var SwitchContainer = styled_components_1.default.div(
	templateObject_2 ||
		(templateObject_2 = __makeTemplateObject(
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tbackground-color: var(--vscode-editor-background);\n\tborder: 1px solid var(--vscode-input-border);\n\tborder-radius: 12px;\n\toverflow: hidden;\n\tcursor: ",
				";\n\topacity: ",
				";\n\ttransform: scale(0.85);\n\ttransform-origin: right center;\n\tmargin-left: -10px; // compensate for the transform so flex spacing works\n\tuser-select: none; // Prevent text selection\n",
			],
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tbackground-color: var(--vscode-editor-background);\n\tborder: 1px solid var(--vscode-input-border);\n\tborder-radius: 12px;\n\toverflow: hidden;\n\tcursor: ",
				";\n\topacity: ",
				";\n\ttransform: scale(0.85);\n\ttransform-origin: right center;\n\tmargin-left: -10px; // compensate for the transform so flex spacing works\n\tuser-select: none; // Prevent text selection\n",
			],
		)),
	function (props) {
		return props.disabled ? "not-allowed" : "pointer"
	},
	function (props) {
		return props.disabled ? 0.5 : 1
	},
)
var Slider = styled_components_1.default.div(
	templateObject_3 ||
		(templateObject_3 = __makeTemplateObject(
			[
				"\n\tposition: absolute;\n\theight: 100%;\n\twidth: 50%;\n\tbackground-color: ",
				";\n\ttransition: transform 0.2s ease;\n\ttransform: translateX(",
				");\n",
			],
			[
				"\n\tposition: absolute;\n\theight: 100%;\n\twidth: 50%;\n\tbackground-color: ",
				";\n\ttransition: transform 0.2s ease;\n\ttransform: translateX(",
				");\n",
			],
		)),
	function (props) {
		return props.isPlan ? PLAN_MODE_COLOR : "var(--vscode-focusBorder)"
	},
	function (props) {
		return props.isAct ? "100%" : "0%"
	},
)
var ButtonGroup = styled_components_1.default.div(
	templateObject_4 ||
		(templateObject_4 = __makeTemplateObject(
			["\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 4px;\n\tflex: 1;\n\tmin-width: 0;\n"],
			["\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 4px;\n\tflex: 1;\n\tmin-width: 0;\n"],
		)),
)
var ButtonContainer = styled_components_1.default.div(
	templateObject_5 ||
		(templateObject_5 = __makeTemplateObject(
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 3px;\n\tfont-size: 10px;\n\twhite-space: nowrap;\n\tmin-width: 0;\n\twidth: 100%;\n",
			],
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 3px;\n\tfont-size: 10px;\n\twhite-space: nowrap;\n\tmin-width: 0;\n\twidth: 100%;\n",
			],
		)),
)
var ControlsContainer = styled_components_1.default.div(
	templateObject_6 ||
		(templateObject_6 = __makeTemplateObject(
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tmargin-top: -5px;\n\tpadding: 0px 15px 5px 15px;\n",
			],
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tmargin-top: -5px;\n\tpadding: 0px 15px 5px 15px;\n",
			],
		)),
)
var ModelSelectorTooltip = styled_components_1.default.div(
	templateObject_7 ||
		(templateObject_7 = __makeTemplateObject(
			[
				"\n\tposition: fixed;\n\tbottom: calc(100% + 9px);\n\tleft: 15px;\n\tright: 15px;\n\tbackground: ",
				';\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tpadding: 12px;\n\tborder-radius: 3px;\n\tz-index: 1000;\n\tmax-height: calc(100vh - 100px);\n\toverflow-y: auto;\n\toverscroll-behavior: contain;\n\n\t// Add invisible padding for hover zone\n\t&::before {\n\t\tcontent: "";\n\t\tposition: fixed;\n\t\tbottom: ',
				';\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 8px;\n\t}\n\n\t// Arrow pointing down\n\t&::after {\n\t\tcontent: "";\n\t\tposition: fixed;\n\t\tbottom: ',
				";\n\t\tright: ",
				"px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tbackground: ",
				";\n\t\tborder-right: 1px solid var(--vscode-editorGroup-border);\n\t\tborder-bottom: 1px solid var(--vscode-editorGroup-border);\n\t\ttransform: rotate(45deg);\n\t\tz-index: -1;\n\t}\n",
			],
			[
				"\n\tposition: fixed;\n\tbottom: calc(100% + 9px);\n\tleft: 15px;\n\tright: 15px;\n\tbackground: ",
				';\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tpadding: 12px;\n\tborder-radius: 3px;\n\tz-index: 1000;\n\tmax-height: calc(100vh - 100px);\n\toverflow-y: auto;\n\toverscroll-behavior: contain;\n\n\t// Add invisible padding for hover zone\n\t&::before {\n\t\tcontent: "";\n\t\tposition: fixed;\n\t\tbottom: ',
				';\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 8px;\n\t}\n\n\t// Arrow pointing down\n\t&::after {\n\t\tcontent: "";\n\t\tposition: fixed;\n\t\tbottom: ',
				";\n\t\tright: ",
				"px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tbackground: ",
				";\n\t\tborder-right: 1px solid var(--vscode-editorGroup-border);\n\t\tborder-bottom: 1px solid var(--vscode-editorGroup-border);\n\t\ttransform: rotate(45deg);\n\t\tz-index: -1;\n\t}\n",
			],
		)),
	CodeBlock_1.CODE_BLOCK_BG_COLOR,
	function (props) {
		return "calc(100vh - ".concat(props.menuPosition, "px - 2px)")
	},
	function (props) {
		return "calc(100vh - ".concat(props.menuPosition, "px)")
	},
	function (props) {
		return props.arrowPosition
	},
	CodeBlock_1.CODE_BLOCK_BG_COLOR,
)
var ModelContainer = styled_components_1.default.div(
	templateObject_8 ||
		(templateObject_8 = __makeTemplateObject(
			["\n\tposition: relative;\n\tdisplay: flex;\n\tflex: 1;\n\tmin-width: 0;\n"],
			["\n\tposition: relative;\n\tdisplay: flex;\n\tflex: 1;\n\tmin-width: 0;\n"],
		)),
)
var ModelButtonWrapper = styled_components_1.default.div(
	templateObject_9 ||
		(templateObject_9 = __makeTemplateObject(
			[
				"\n\tdisplay: inline-flex; // Make it shrink to content\n\tmin-width: 0; // Allow shrinking\n\tmax-width: 100%; // Don't overflow parent\n",
			],
			[
				"\n\tdisplay: inline-flex; // Make it shrink to content\n\tmin-width: 0; // Allow shrinking\n\tmax-width: 100%; // Don't overflow parent\n",
			],
		)),
)
var ModelDisplayButton = styled_components_1.default.a(
	templateObject_10 ||
		(templateObject_10 = __makeTemplateObject(
			[
				"\n\tpadding: 0px 0px;\n\theight: 20px;\n\twidth: 100%;\n\tmin-width: 0;\n\tcursor: ",
				";\n\ttext-decoration: ",
				";\n\tcolor: ",
				";\n\tdisplay: flex;\n\talign-items: center;\n\tfont-size: 10px;\n\toutline: none;\n\tuser-select: none;\n\topacity: ",
				";\n\tpointer-events: ",
				";\n\n\t&:hover,\n\t&:focus {\n\t\tcolor: ",
				";\n\t\ttext-decoration: ",
				";\n\t\toutline: none;\n\t}\n\n\t&:active {\n\t\tcolor: ",
				";\n\t\ttext-decoration: ",
				";\n\t\toutline: none;\n\t}\n\n\t&:focus-visible {\n\t\toutline: none;\n\t}\n",
			],
			[
				"\n\tpadding: 0px 0px;\n\theight: 20px;\n\twidth: 100%;\n\tmin-width: 0;\n\tcursor: ",
				";\n\ttext-decoration: ",
				";\n\tcolor: ",
				";\n\tdisplay: flex;\n\talign-items: center;\n\tfont-size: 10px;\n\toutline: none;\n\tuser-select: none;\n\topacity: ",
				";\n\tpointer-events: ",
				";\n\n\t&:hover,\n\t&:focus {\n\t\tcolor: ",
				";\n\t\ttext-decoration: ",
				";\n\t\toutline: none;\n\t}\n\n\t&:active {\n\t\tcolor: ",
				";\n\t\ttext-decoration: ",
				";\n\t\toutline: none;\n\t}\n\n\t&:focus-visible {\n\t\toutline: none;\n\t}\n",
			],
		)),
	function (props) {
		return props.disabled ? "not-allowed" : "pointer"
	},
	function (props) {
		return props.isActive ? "underline" : "none"
	},
	function (props) {
		return props.isActive ? "var(--vscode-foreground)" : "var(--vscode-descriptionForeground)"
	},
	function (props) {
		return props.disabled ? 0.5 : 1
	},
	function (props) {
		return props.disabled ? "none" : "auto"
	},
	function (props) {
		return props.disabled ? "var(--vscode-descriptionForeground)" : "var(--vscode-foreground)"
	},
	function (props) {
		return props.disabled ? "none" : "underline"
	},
	function (props) {
		return props.disabled ? "var(--vscode-descriptionForeground)" : "var(--vscode-foreground)"
	},
	function (props) {
		return props.disabled ? "none" : "underline"
	},
)
var ModelButtonContent = styled_components_1.default.div(
	templateObject_11 ||
		(templateObject_11 = __makeTemplateObject(
			["\n\twidth: 100%;\n\tmin-width: 0;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n"],
			["\n\twidth: 100%;\n\tmin-width: 0;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n"],
		)),
)
var ChatTextArea = (0, react_2.forwardRef)(function (_a, ref) {
	var inputValue = _a.inputValue,
		setInputValue = _a.setInputValue,
		textAreaDisabled = _a.textAreaDisabled,
		placeholderText = _a.placeholderText,
		selectedImages = _a.selectedImages,
		setSelectedImages = _a.setSelectedImages,
		onSend = _a.onSend,
		onSelectImages = _a.onSelectImages,
		shouldDisableImages = _a.shouldDisableImages,
		onHeightChange = _a.onHeightChange
	var _b = (0, ExtensionStateContext_1.useExtensionState)(),
		filePaths = _b.filePaths,
		chatSettings = _b.chatSettings,
		apiConfiguration = _b.apiConfiguration,
		openRouterModels = _b.openRouterModels,
		platform = _b.platform
	var _c = (0, react_2.useState)(false),
		isTextAreaFocused = _c[0],
		setIsTextAreaFocused = _c[1]
	var _d = (0, react_2.useState)([]),
		gitCommits = _d[0],
		setGitCommits = _d[1]
	var _e = (0, react_2.useState)(0),
		thumbnailsHeight = _e[0],
		setThumbnailsHeight = _e[1]
	var _f = (0, react_2.useState)(undefined),
		textAreaBaseHeight = _f[0],
		setTextAreaBaseHeight = _f[1]
	var _g = (0, react_2.useState)(false),
		showContextMenu = _g[0],
		setShowContextMenu = _g[1]
	var _h = (0, react_2.useState)(0),
		cursorPosition = _h[0],
		setCursorPosition = _h[1]
	var _j = (0, react_2.useState)(""),
		searchQuery = _j[0],
		setSearchQuery = _j[1]
	var textAreaRef = (0, react_2.useRef)(null)
	var _k = (0, react_2.useState)(false),
		isMouseDownOnMenu = _k[0],
		setIsMouseDownOnMenu = _k[1]
	var highlightLayerRef = (0, react_2.useRef)(null)
	var _l = (0, react_2.useState)(-1),
		selectedMenuIndex = _l[0],
		setSelectedMenuIndex = _l[1]
	var _m = (0, react_2.useState)(null),
		selectedType = _m[0],
		setSelectedType = _m[1]
	var _o = (0, react_2.useState)(false),
		justDeletedSpaceAfterMention = _o[0],
		setJustDeletedSpaceAfterMention = _o[1]
	var _p = (0, react_2.useState)(null),
		intendedCursorPosition = _p[0],
		setIntendedCursorPosition = _p[1]
	var contextMenuContainerRef = (0, react_2.useRef)(null)
	var _q = (0, react_2.useState)(false),
		showModelSelector = _q[0],
		setShowModelSelector = _q[1]
	var modelSelectorRef = (0, react_2.useRef)(null)
	var _r = (0, react_use_1.useWindowSize)(),
		viewportWidth = _r.width,
		viewportHeight = _r.height
	var buttonRef = (0, react_2.useRef)(null)
	var _s = (0, react_2.useState)(0),
		arrowPosition = _s[0],
		setArrowPosition = _s[1]
	var _t = (0, react_2.useState)(0),
		menuPosition = _t[0],
		setMenuPosition = _t[1]
	var _u = (0, react_2.useState)(null),
		shownTooltipMode = _u[0],
		setShownTooltipMode = _u[1]
	var _v = (0, react_2.useState)([]),
		fileSearchResults = _v[0],
		setFileSearchResults = _v[1]
	var _w = (0, react_2.useState)(false),
		searchLoading = _w[0],
		setSearchLoading = _w[1]
	var _x = (0, hooks_1.useMetaKeyDetection)(platform),
		metaKeyChar = _x[1]
	// Add a ref to track previous menu state
	var prevShowModelSelector = (0, react_2.useRef)(showModelSelector)
	// Fetch git commits when Git is selected or when typing a hash
	;(0, react_2.useEffect)(
		function () {
			if (selectedType === context_mentions_2.ContextMenuOptionType.Git || /^[a-f0-9]+$/i.test(searchQuery)) {
				vscode_1.vscode.postMessage({
					type: "searchCommits",
					text: searchQuery || "",
				})
			}
		},
		[selectedType, searchQuery],
	)
	var handleMessage = (0, react_2.useCallback)(function (event) {
		var _a
		var message = event.data
		switch (message.type) {
			case "commitSearchResults": {
				var commits =
					((_a = message.commits) === null || _a === void 0
						? void 0
						: _a.map(function (commit) {
								return {
									type: context_mentions_2.ContextMenuOptionType.Git,
									value: commit.hash,
									label: commit.subject,
									description: ""
										.concat(commit.shortHash, " by ")
										.concat(commit.author, " on ")
										.concat(commit.date),
								}
							})) || []
				setGitCommits(commits)
				break
			}
			case "fileSearchResults": {
				// Only update results if they match the current query or if there's no mentionsRequestId - better UX
				if (!message.mentionsRequestId || message.mentionsRequestId === currentSearchQueryRef.current) {
					setFileSearchResults(message.results || [])
					setSearchLoading(false)
				}
				break
			}
		}
	}, [])
	;(0, react_use_1.useEvent)("message", handleMessage)
	var queryItems = (0, react_2.useMemo)(
		function () {
			return __spreadArray(
				__spreadArray(
					[
						{ type: context_mentions_2.ContextMenuOptionType.Problems, value: "problems" },
						{ type: context_mentions_2.ContextMenuOptionType.Terminal, value: "terminal" },
					],
					gitCommits,
					true,
				),
				filePaths
					.map(function (file) {
						return "/" + file
					})
					.map(function (path) {
						return {
							type: path.endsWith("/")
								? context_mentions_2.ContextMenuOptionType.Folder
								: context_mentions_2.ContextMenuOptionType.File,
							value: path,
						}
					}),
				true,
			)
		},
		[filePaths, gitCommits],
	)
	;(0, react_2.useEffect)(
		function () {
			var handleClickOutside = function (event) {
				if (contextMenuContainerRef.current && !contextMenuContainerRef.current.contains(event.target)) {
					setShowContextMenu(false)
				}
			}
			if (showContextMenu) {
				document.addEventListener("mousedown", handleClickOutside)
			}
			return function () {
				document.removeEventListener("mousedown", handleClickOutside)
			}
		},
		[showContextMenu, setShowContextMenu],
	)
	var handleMentionSelect = (0, react_2.useCallback)(
		function (type, value) {
			if (type === context_mentions_2.ContextMenuOptionType.NoResults) {
				return
			}
			if (
				type === context_mentions_2.ContextMenuOptionType.File ||
				type === context_mentions_2.ContextMenuOptionType.Folder ||
				type === context_mentions_2.ContextMenuOptionType.Git
			) {
				if (!value) {
					setSelectedType(type)
					setSearchQuery("")
					setSelectedMenuIndex(0)
					return
				}
			}
			setShowContextMenu(false)
			setSelectedType(null)
			if (textAreaRef.current) {
				var insertValue = value || ""
				if (type === context_mentions_2.ContextMenuOptionType.URL) {
					insertValue = value || ""
				} else if (
					type === context_mentions_2.ContextMenuOptionType.File ||
					type === context_mentions_2.ContextMenuOptionType.Folder
				) {
					insertValue = value || ""
				} else if (type === context_mentions_2.ContextMenuOptionType.Problems) {
					insertValue = "problems"
				} else if (type === context_mentions_2.ContextMenuOptionType.Terminal) {
					insertValue = "terminal"
				} else if (type === context_mentions_2.ContextMenuOptionType.Git) {
					insertValue = value || ""
				}
				var _a = (0, context_mentions_2.insertMention)(textAreaRef.current.value, cursorPosition, insertValue),
					newValue = _a.newValue,
					mentionIndex = _a.mentionIndex
				setInputValue(newValue)
				var newCursorPosition = newValue.indexOf(" ", mentionIndex + insertValue.length) + 1
				setCursorPosition(newCursorPosition)
				setIntendedCursorPosition(newCursorPosition)
				// textAreaRef.current.focus()
				// scroll to cursor
				setTimeout(function () {
					if (textAreaRef.current) {
						textAreaRef.current.blur()
						textAreaRef.current.focus()
					}
				}, 0)
			}
		},
		[setInputValue, cursorPosition],
	)
	var handleKeyDown = (0, react_2.useCallback)(
		function (event) {
			var _a, _b, _c
			if (showContextMenu) {
				if (event.key === "Escape") {
					// event.preventDefault()
					setSelectedType(null)
					setSelectedMenuIndex(3) // File by default
					return
				}
				if (event.key === "ArrowUp" || event.key === "ArrowDown") {
					event.preventDefault()
					setSelectedMenuIndex(function (prevIndex) {
						var direction = event.key === "ArrowUp" ? -1 : 1
						var options = (0, context_mentions_2.getContextMenuOptions)(
							searchQuery,
							selectedType,
							queryItems,
							fileSearchResults,
						)
						var optionsLength = options.length
						if (optionsLength === 0) return prevIndex
						// Find selectable options (non-URL types)
						var selectableOptions = options.filter(function (option) {
							return (
								option.type !== context_mentions_2.ContextMenuOptionType.URL &&
								option.type !== context_mentions_2.ContextMenuOptionType.NoResults
							)
						})
						if (selectableOptions.length === 0) return -1 // No selectable options
						// Find the index of the next selectable option
						var currentSelectableIndex = selectableOptions.findIndex(function (option) {
							return option === options[prevIndex]
						})
						var newSelectableIndex =
							(currentSelectableIndex + direction + selectableOptions.length) % selectableOptions.length
						// Find the index of the selected option in the original options array
						return options.findIndex(function (option) {
							return option === selectableOptions[newSelectableIndex]
						})
					})
					return
				}
				if ((event.key === "Enter" || event.key === "Tab") && selectedMenuIndex !== -1) {
					event.preventDefault()
					var selectedOption = (0, context_mentions_2.getContextMenuOptions)(
						searchQuery,
						selectedType,
						queryItems,
						fileSearchResults,
					)[selectedMenuIndex]
					if (
						selectedOption &&
						selectedOption.type !== context_mentions_2.ContextMenuOptionType.URL &&
						selectedOption.type !== context_mentions_2.ContextMenuOptionType.NoResults
					) {
						handleMentionSelect(selectedOption.type, selectedOption.value)
					}
					return
				}
			}
			var isComposing =
				(_b = (_a = event.nativeEvent) === null || _a === void 0 ? void 0 : _a.isComposing) !== null && _b !== void 0
					? _b
					: false
			if (event.key === "Enter" && !event.shiftKey && !isComposing) {
				event.preventDefault()
				setIsTextAreaFocused(false)
				onSend()
			}
			if (event.key === "Backspace" && !isComposing) {
				var charBeforeCursor = inputValue[cursorPosition - 1]
				var charAfterCursor = inputValue[cursorPosition + 1]
				var charBeforeIsWhitespace = charBeforeCursor === " " || charBeforeCursor === "\n" || charBeforeCursor === "\r\n"
				var charAfterIsWhitespace = charAfterCursor === " " || charAfterCursor === "\n" || charAfterCursor === "\r\n"
				// checks if char before cursor is whitespace after a mention
				if (
					charBeforeIsWhitespace &&
					inputValue.slice(0, cursorPosition - 1).match(new RegExp(context_mentions_1.mentionRegex.source + "$")) // "$" is added to ensure the match occurs at the end of the string
				) {
					var newCursorPosition = cursorPosition - 1
					// if mention is followed by another word, then instead of deleting the space separating them we just move the cursor to the end of the mention
					if (!charAfterIsWhitespace) {
						event.preventDefault()
						;(_c = textAreaRef.current) === null || _c === void 0
							? void 0
							: _c.setSelectionRange(newCursorPosition, newCursorPosition)
						setCursorPosition(newCursorPosition)
					}
					setCursorPosition(newCursorPosition)
					setJustDeletedSpaceAfterMention(true)
				} else if (justDeletedSpaceAfterMention) {
					var _d = (0, context_mentions_2.removeMention)(inputValue, cursorPosition),
						newText = _d.newText,
						newPosition = _d.newPosition
					if (newText !== inputValue) {
						event.preventDefault()
						setInputValue(newText)
						setIntendedCursorPosition(newPosition) // Store the new cursor position in state
					}
					setJustDeletedSpaceAfterMention(false)
					setShowContextMenu(false)
				} else {
					setJustDeletedSpaceAfterMention(false)
				}
			}
		},
		[
			onSend,
			showContextMenu,
			searchQuery,
			selectedMenuIndex,
			handleMentionSelect,
			selectedType,
			inputValue,
			cursorPosition,
			setInputValue,
			justDeletedSpaceAfterMention,
			queryItems,
			fileSearchResults,
		],
	)
	;(0, react_2.useLayoutEffect)(
		function () {
			if (intendedCursorPosition !== null && textAreaRef.current) {
				textAreaRef.current.setSelectionRange(intendedCursorPosition, intendedCursorPosition)
				setIntendedCursorPosition(null) // Reset the state
			}
		},
		[inputValue, intendedCursorPosition],
	)
	var searchTimeoutRef = (0, react_2.useRef)(null)
	var currentSearchQueryRef = (0, react_2.useRef)("")
	var handleInputChange = (0, react_2.useCallback)(
		function (e) {
			var newValue = e.target.value
			var newCursorPosition = e.target.selectionStart
			setInputValue(newValue)
			setCursorPosition(newCursorPosition)
			var showMenu = (0, context_mentions_2.shouldShowContextMenu)(newValue, newCursorPosition)
			setShowContextMenu(showMenu)
			if (showMenu) {
				var lastAtIndex = newValue.lastIndexOf("@", newCursorPosition - 1)
				var query_1 = newValue.slice(lastAtIndex + 1, newCursorPosition)
				setSearchQuery(query_1)
				currentSearchQueryRef.current = query_1
				if (query_1.length > 0 && !selectedType) {
					setSelectedMenuIndex(0)
					// Clear any existing timeout
					if (searchTimeoutRef.current) {
						clearTimeout(searchTimeoutRef.current)
					}
					setSearchLoading(true)
					// Set a timeout to debounce the search requests
					searchTimeoutRef.current = setTimeout(function () {
						vscode_1.vscode.postMessage({
							type: "searchFiles",
							query: query_1,
							mentionsRequestId: query_1,
						})
					}, 200) // 200ms debounce
				} else {
					setSelectedMenuIndex(3) // Set to "File" option by default
				}
			} else {
				setSearchQuery("")
				setSelectedMenuIndex(-1)
				setFileSearchResults([])
			}
		},
		[setInputValue, setFileSearchResults, selectedType],
	)
	;(0, react_2.useEffect)(
		function () {
			if (!showContextMenu) {
				setSelectedType(null)
			}
		},
		[showContextMenu],
	)
	var handleBlur = (0, react_2.useCallback)(
		function () {
			// Only hide the context menu if the user didn't click on it
			if (!isMouseDownOnMenu) {
				setShowContextMenu(false)
			}
			setIsTextAreaFocused(false)
		},
		[isMouseDownOnMenu],
	)
	var handlePaste = (0, react_2.useCallback)(
		function (e) {
			return __awaiter(void 0, void 0, void 0, function () {
				var items,
					pastedText,
					urlRegex,
					trimmedUrl,
					newValue,
					newCursorPosition,
					acceptedTypes,
					imageItems,
					imagePromises,
					imageDataArray,
					dataUrls_1
				return __generator(this, function (_a) {
					switch (_a.label) {
						case 0:
							items = e.clipboardData.items
							pastedText = e.clipboardData.getData("text")
							urlRegex = /^\S+:\/\/\S+$/
							if (urlRegex.test(pastedText.trim())) {
								e.preventDefault()
								trimmedUrl = pastedText.trim()
								newValue =
									inputValue.slice(0, cursorPosition) + trimmedUrl + " " + inputValue.slice(cursorPosition)
								setInputValue(newValue)
								newCursorPosition = cursorPosition + trimmedUrl.length + 1
								setCursorPosition(newCursorPosition)
								setIntendedCursorPosition(newCursorPosition)
								setShowContextMenu(false)
								// Scroll to new cursor position
								// https://stackoverflow.com/questions/29899364/how-do-you-scroll-to-the-position-of-the-cursor-in-a-textarea/40951875#40951875
								setTimeout(function () {
									if (textAreaRef.current) {
										textAreaRef.current.blur()
										textAreaRef.current.focus()
									}
								}, 0)
								// NOTE: callbacks dont utilize return function to cleanup, but it's fine since this timeout immediately executes and will be cleaned up by the browser (no chance component unmounts before it executes)
								return [2 /*return*/]
							}
							acceptedTypes = ["png", "jpeg", "webp"] // supported by anthropic and openrouter (jpg is just a file extension but the image will be recognized as jpeg)
							imageItems = Array.from(items).filter(function (item) {
								var _a = item.type.split("/"),
									type = _a[0],
									subtype = _a[1]
								return type === "image" && acceptedTypes.includes(subtype)
							})
							if (!(!shouldDisableImages && imageItems.length > 0)) return [3 /*break*/, 2]
							e.preventDefault()
							imagePromises = imageItems.map(function (item) {
								return new Promise(function (resolve) {
									var blob = item.getAsFile()
									if (!blob) {
										resolve(null)
										return
									}
									var reader = new FileReader()
									reader.onloadend = function () {
										if (reader.error) {
											console.error("Error reading file:", reader.error)
											resolve(null)
										} else {
											var result = reader.result
											resolve(typeof result === "string" ? result : null)
										}
									}
									reader.readAsDataURL(blob)
								})
							})
							return [4 /*yield*/, Promise.all(imagePromises)]
						case 1:
							imageDataArray = _a.sent()
							dataUrls_1 = imageDataArray.filter(function (dataUrl) {
								return dataUrl !== null
							})
							//.map((dataUrl) => dataUrl.split(",")[1]) // strip the mime type prefix, sharp doesn't need it
							if (dataUrls_1.length > 0) {
								setSelectedImages(function (prevImages) {
									return __spreadArray(__spreadArray([], prevImages, true), dataUrls_1, true).slice(
										0,
										ChatView_1.MAX_IMAGES_PER_MESSAGE,
									)
								})
							} else {
								console.warn("No valid images were processed")
							}
							_a.label = 2
						case 2:
							return [2 /*return*/]
					}
				})
			})
		},
		[shouldDisableImages, setSelectedImages, cursorPosition, setInputValue, inputValue],
	)
	var handleThumbnailsHeightChange = (0, react_2.useCallback)(function (height) {
		setThumbnailsHeight(height)
	}, [])
	;(0, react_2.useEffect)(
		function () {
			if (selectedImages.length === 0) {
				setThumbnailsHeight(0)
			}
		},
		[selectedImages],
	)
	var handleMenuMouseDown = (0, react_2.useCallback)(function () {
		setIsMouseDownOnMenu(true)
	}, [])
	var updateHighlights = (0, react_2.useCallback)(function () {
		if (!textAreaRef.current || !highlightLayerRef.current) return
		var text = textAreaRef.current.value
		highlightLayerRef.current.innerHTML = text
			.replace(/\n$/, "\n\n")
			.replace(/[<>&]/g, function (c) {
				return { "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] || c
			})
			.replace(context_mentions_1.mentionRegexGlobal, '<mark class="mention-context-textarea-highlight">$&</mark>')
		highlightLayerRef.current.scrollTop = textAreaRef.current.scrollTop
		highlightLayerRef.current.scrollLeft = textAreaRef.current.scrollLeft
	}, [])
	;(0, react_2.useLayoutEffect)(
		function () {
			updateHighlights()
		},
		[inputValue, updateHighlights],
	)
	var updateCursorPosition = (0, react_2.useCallback)(function () {
		if (textAreaRef.current) {
			setCursorPosition(textAreaRef.current.selectionStart)
		}
	}, [])
	var handleKeyUp = (0, react_2.useCallback)(
		function (e) {
			if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) {
				updateCursorPosition()
			}
		},
		[updateCursorPosition],
	)
	// Separate the API config submission logic
	var submitApiConfig = (0, react_2.useCallback)(
		function () {
			var apiValidationResult = (0, validate_1.validateApiConfiguration)(apiConfiguration)
			var modelIdValidationResult = (0, validate_1.validateModelId)(apiConfiguration, openRouterModels)
			if (!apiValidationResult && !modelIdValidationResult) {
				vscode_1.vscode.postMessage({ type: "apiConfiguration", apiConfiguration: apiConfiguration })
			} else {
				vscode_1.vscode.postMessage({ type: "getLatestState" })
			}
		},
		[apiConfiguration, openRouterModels],
	)
	var onModeToggle = (0, react_2.useCallback)(
		function () {
			// if (textAreaDisabled) return
			var changeModeDelay = 0
			if (showModelSelector) {
				// user has model selector open, so we should save it before switching modes
				submitApiConfig()
				changeModeDelay = 250 // necessary to let the api config update (we send message and wait for it to be saved) FIXME: this is a hack and we ideally should check for api config changes, then wait for it to be saved, before switching modes
			}
			setTimeout(function () {
				var newMode = chatSettings.mode === "plan" ? "act" : "plan"
				vscode_1.vscode.postMessage({
					type: "togglePlanActMode",
					chatSettings: {
						mode: newMode,
					},
					chatContent: {
						message: inputValue.trim() ? inputValue : undefined,
						images: selectedImages.length > 0 ? selectedImages : undefined,
					},
				})
				// Focus the textarea after mode toggle with slight delay
				setTimeout(function () {
					var _a
					;(_a = textAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus()
				}, 100)
			}, changeModeDelay)
		},
		[chatSettings.mode, showModelSelector, submitApiConfig, inputValue, selectedImages],
	)
	;(0, hooks_1.useShortcut)("Meta+Shift+a", onModeToggle, { disableTextInputs: false }) // important that we don't disable the text input here
	var handleContextButtonClick = (0, react_2.useCallback)(
		function () {
			var _a
			if (textAreaDisabled) return // Focus the textarea first
			;(_a = textAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus()
			// If input is empty, just insert @
			if (!inputValue.trim()) {
				var event_1 = {
					target: {
						value: "@",
						selectionStart: 1,
					},
				}
				handleInputChange(event_1)
				updateHighlights()
				return
			}
			// If input ends with space or is empty, just append @
			if (inputValue.endsWith(" ")) {
				var event_2 = {
					target: {
						value: inputValue + "@",
						selectionStart: inputValue.length + 1,
					},
				}
				handleInputChange(event_2)
				updateHighlights()
				return
			}
			// Otherwise add space then @
			var event = {
				target: {
					value: inputValue + " @",
					selectionStart: inputValue.length + 2,
				},
			}
			handleInputChange(event)
			updateHighlights()
		},
		[inputValue, textAreaDisabled, handleInputChange, updateHighlights],
	)
	// Use an effect to detect menu close
	;(0, react_2.useEffect)(
		function () {
			if (prevShowModelSelector.current && !showModelSelector) {
				// Menu was just closed
				submitApiConfig()
			}
			prevShowModelSelector.current = showModelSelector
		},
		[showModelSelector, submitApiConfig],
	)
	// Remove the handleApiConfigSubmit callback
	// Update click handler to just toggle the menu
	var handleModelButtonClick = function () {
		setShowModelSelector(!showModelSelector)
	}
	// Update click away handler to just close menu
	;(0, react_use_1.useClickAway)(modelSelectorRef, function () {
		setShowModelSelector(false)
	})
	// Get model display name
	var modelDisplayName = (0, react_2.useMemo)(
		function () {
			var _a, _b
			var _c = (0, ApiOptions_1.normalizeApiConfiguration)(apiConfiguration),
				selectedProvider = _c.selectedProvider,
				selectedModelId = _c.selectedModelId
			var unknownModel = "unknown"
			if (!apiConfiguration) return unknownModel
			switch (selectedProvider) {
				case "cline":
					return "".concat(selectedProvider, ":").concat(selectedModelId)
				case "openai":
					return "openai-compat:".concat(selectedModelId)
				case "vscode-lm":
					return "vscode-lm:".concat(
						apiConfiguration.vsCodeLmModelSelector
							? ""
									.concat(
										(_a = apiConfiguration.vsCodeLmModelSelector.vendor) !== null && _a !== void 0 ? _a : "",
										"/",
									)
									.concat(
										(_b = apiConfiguration.vsCodeLmModelSelector.family) !== null && _b !== void 0 ? _b : "",
									)
							: unknownModel,
					)
				case "together":
					return "".concat(selectedProvider, ":").concat(apiConfiguration.togetherModelId)
				case "lmstudio":
					return "".concat(selectedProvider, ":").concat(apiConfiguration.lmStudioModelId)
				case "ollama":
					return "".concat(selectedProvider, ":").concat(apiConfiguration.ollamaModelId)
				case "litellm":
					return "".concat(selectedProvider, ":").concat(apiConfiguration.liteLlmModelId)
				case "requesty":
				case "anthropic":
				case "openrouter":
				default:
					return "".concat(selectedProvider, ":").concat(selectedModelId)
			}
		},
		[apiConfiguration],
	)
	// Calculate arrow position and menu position based on button location
	;(0, react_2.useEffect)(
		function () {
			if (showModelSelector && buttonRef.current) {
				var buttonRect = buttonRef.current.getBoundingClientRect()
				var buttonCenter = buttonRect.left + buttonRect.width / 2
				// Calculate distance from right edge of viewport using viewport coordinates
				var rightPosition = document.documentElement.clientWidth - buttonCenter - 5
				setArrowPosition(rightPosition)
				setMenuPosition(buttonRect.top + 1) // Added +1 to move menu down by 1px
			}
		},
		[showModelSelector, viewportWidth, viewportHeight],
	)
	;(0, react_2.useEffect)(
		function () {
			var _a
			if (!showModelSelector) {
				// Attempt to save if possible
				// NOTE: we cannot call this here since it will create an infinite loop between this effect and the callback since getLatestState will update state. Instead we should submitapiconfig when the menu is explicitly closed, rather than as an effect of showModelSelector changing.
				// handleApiConfigSubmit()
				// Reset any active styling by blurring the button
				var button = (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("a")
				if (button) {
					button.blur()
				}
			}
		},
		[showModelSelector],
	)
	/**
	 * Handles the drag over event to allow dropping.
	 * Prevents the default behavior to enable drop.
	 *
	 * @param {React.DragEvent} e - The drag event.
	 */
	var onDragOver = function (e) {
		e.preventDefault()
	}
	/**
	 * Handles the drop event for files and text.
	 * Processes dropped images and text, updating the state accordingly.
	 *
	 * @param {React.DragEvent} e - The drop event.
	 */
	var onDrop = function (e) {
		return __awaiter(void 0, void 0, void 0, function () {
			var files, text, acceptedTypes, imageFiles, imageDataArray, dataUrls
			return __generator(this, function (_a) {
				switch (_a.label) {
					case 0:
						e.preventDefault()
						files = Array.from(e.dataTransfer.files)
						text = e.dataTransfer.getData("text")
						if (text) {
							handleTextDrop(text)
							return [2 /*return*/]
						}
						acceptedTypes = ["png", "jpeg", "webp"]
						imageFiles = files.filter(function (file) {
							var _a = file.type.split("/"),
								type = _a[0],
								subtype = _a[1]
							return type === "image" && acceptedTypes.includes(subtype)
						})
						if (shouldDisableImages || imageFiles.length === 0) return [2 /*return*/]
						return [4 /*yield*/, readImageFiles(imageFiles)]
					case 1:
						imageDataArray = _a.sent()
						dataUrls = imageDataArray.filter(function (dataUrl) {
							return dataUrl !== null
						})
						if (dataUrls.length > 0) {
							setSelectedImages(function (prevImages) {
								return __spreadArray(__spreadArray([], prevImages, true), dataUrls, true).slice(
									0,
									ChatView_1.MAX_IMAGES_PER_MESSAGE,
								)
							})
						} else {
							console.warn("No valid images were processed")
						}
						return [2 /*return*/]
				}
			})
		})
	}
	/**
	 * Handles the drop event for text.
	 * Inserts the dropped text at the current cursor position.
	 *
	 * @param {string} text - The dropped text.
	 */
	var handleTextDrop = function (text) {
		var newValue = inputValue.slice(0, cursorPosition) + text + inputValue.slice(cursorPosition)
		setInputValue(newValue)
		var newCursorPosition = cursorPosition + text.length
		setCursorPosition(newCursorPosition)
		setIntendedCursorPosition(newCursorPosition)
	}
	/**
	 * Reads image files and returns their data URLs.
	 * Uses FileReader to read the files as data URLs.
	 *
	 * @param {File[]} imageFiles - The image files to read.
	 * @returns {Promise<(string | null)[]>} - A promise that resolves to an array of data URLs or null values.
	 */
	var readImageFiles = function (imageFiles) {
		return Promise.all(
			imageFiles.map(function (file) {
				return new Promise(function (resolve) {
					var reader = new FileReader()
					reader.onloadend = function () {
						if (reader.error) {
							console.error("Error reading file:", reader.error)
							resolve(null)
						} else {
							var result = reader.result
							resolve(typeof result === "string" ? result : null)
						}
					}
					reader.readAsDataURL(file)
				})
			}),
		)
	}
	return (
		<div>
			<div
				style={{
					padding: "10px 15px",
					opacity: textAreaDisabled ? 0.5 : 1,
					position: "relative",
					display: "flex",
				}}
				onDrop={onDrop}
				onDragOver={onDragOver}>
				{showContextMenu && (
					<div ref={contextMenuContainerRef}>
						<ContextMenu_1.default
							onSelect={handleMentionSelect}
							searchQuery={searchQuery}
							onMouseDown={handleMenuMouseDown}
							selectedIndex={selectedMenuIndex}
							setSelectedIndex={setSelectedMenuIndex}
							selectedType={selectedType}
							queryItems={queryItems}
							dynamicSearchResults={fileSearchResults}
							isLoading={searchLoading}
						/>
					</div>
				)}
				{!isTextAreaFocused && (
					<div
						style={{
							position: "absolute",
							inset: "10px 15px",
							border: "1px solid var(--vscode-input-border)",
							borderRadius: 2,
							pointerEvents: "none",
							zIndex: 5,
						}}
					/>
				)}
				<div
					ref={highlightLayerRef}
					style={{
						position: "absolute",
						top: 10,
						left: 15,
						right: 15,
						bottom: 10,
						pointerEvents: "none",
						whiteSpace: "pre-wrap",
						wordWrap: "break-word",
						color: "transparent",
						overflow: "hidden",
						backgroundColor: "var(--vscode-input-background)",
						fontFamily: "var(--vscode-font-family)",
						fontSize: "var(--vscode-editor-font-size)",
						lineHeight: "var(--vscode-editor-line-height)",
						borderRadius: 2,
						borderLeft: 0,
						borderRight: 0,
						borderTop: 0,
						borderColor: "transparent",
						borderBottom: "".concat(thumbnailsHeight + 6, "px solid transparent"),
						padding: "9px 28px 3px 9px",
					}}
				/>
				<react_textarea_autosize_1.default
					data-testid="chat-input"
					ref={function (el) {
						if (typeof ref === "function") {
							ref(el)
						} else if (ref) {
							ref.current = el
						}
						textAreaRef.current = el
					}}
					value={inputValue}
					disabled={textAreaDisabled}
					onChange={function (e) {
						handleInputChange(e)
						updateHighlights()
					}}
					onKeyDown={handleKeyDown}
					onKeyUp={handleKeyUp}
					onFocus={function () {
						return setIsTextAreaFocused(true)
					}}
					onBlur={handleBlur}
					onPaste={handlePaste}
					onSelect={updateCursorPosition}
					onMouseUp={updateCursorPosition}
					onHeightChange={function (height) {
						if (textAreaBaseHeight === undefined || height < textAreaBaseHeight) {
							setTextAreaBaseHeight(height)
						}
						onHeightChange === null || onHeightChange === void 0 ? void 0 : onHeightChange(height)
					}}
					placeholder={placeholderText}
					maxRows={10}
					autoFocus={true}
					style={{
						width: "100%",
						boxSizing: "border-box",
						backgroundColor: "transparent",
						color: "var(--vscode-input-foreground)",
						//border: "1px solid var(--vscode-input-border)",
						borderRadius: 2,
						fontFamily: "var(--vscode-font-family)",
						fontSize: "var(--vscode-editor-font-size)",
						lineHeight: "var(--vscode-editor-line-height)",
						resize: "none",
						overflowX: "hidden",
						overflowY: "scroll",
						scrollbarWidth: "none",
						// Since we have maxRows, when text is long enough it starts to overflow the bottom padding, appearing behind the thumbnails. To fix this, we use a transparent border to push the text up instead. (https://stackoverflow.com/questions/42631947/maintaining-a-padding-inside-of-text-area/52538410#52538410)
						// borderTop: "9px solid transparent",
						borderLeft: 0,
						borderRight: 0,
						borderTop: 0,
						borderBottom: "".concat(thumbnailsHeight + 6, "px solid transparent"),
						borderColor: "transparent",
						// borderRight: "54px solid transparent",
						// borderLeft: "9px solid transparent", // NOTE: react-textarea-autosize doesn't calculate correct height when using borderLeft/borderRight so we need to use horizontal padding instead
						// Instead of using boxShadow, we use a div with a border to better replicate the behavior when the textarea is focused
						// boxShadow: "0px 0px 0px 1px var(--vscode-input-border)",
						padding: "9px 28px 3px 9px",
						cursor: textAreaDisabled ? "not-allowed" : undefined,
						flex: 1,
						zIndex: 1,
						outline: isTextAreaFocused
							? "1px solid ".concat(chatSettings.mode === "plan" ? PLAN_MODE_COLOR : "var(--vscode-focusBorder)")
							: "none",
					}}
					onScroll={function () {
						return updateHighlights()
					}}
				/>
				{selectedImages.length > 0 && (
					<Thumbnails_1.default
						images={selectedImages}
						setImages={setSelectedImages}
						onHeightChange={handleThumbnailsHeightChange}
						style={{
							position: "absolute",
							paddingTop: 4,
							bottom: 14,
							left: 22,
							right: 47, // (54 + 9) + 4 extra padding
							zIndex: 2,
						}}
					/>
				)}
				<div
					style={{
						position: "absolute",
						right: 23,
						display: "flex",
						alignItems: "flex-center",
						height: textAreaBaseHeight || 31,
						bottom: 9.5, // should be 10 but doesnt look good on mac
						zIndex: 2,
					}}>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}>
						{/* <div
            className={`input-icon-button ${shouldDisableImages ? "disabled" : ""} codicon codicon-device-camera`}
            onClick={() => {
                if (!shouldDisableImages) {
                    onSelectImages()
                }
            }}
            style={{
                marginRight: 5.5,
                fontSize: 16.5,
            }}
        /> */}
						<div
							data-testid="send-button"
							className={"input-icon-button ".concat(textAreaDisabled ? "disabled" : "", " codicon codicon-send")}
							onClick={function () {
								if (!textAreaDisabled) {
									setIsTextAreaFocused(false)
									onSend()
								}
							}}
							style={{ fontSize: 15 }}></div>
					</div>
				</div>
			</div>

			<ControlsContainer>
				<ButtonGroup>
					<react_1.VSCodeButton
						data-testid="context-button"
						appearance="icon"
						aria-label="Add Context"
						disabled={textAreaDisabled}
						onClick={handleContextButtonClick}
						style={{ padding: "0px 0px", height: "20px" }}>
						<ButtonContainer>
							<span style={{ fontSize: "13px", marginBottom: 1 }}>@</span>
							{/* {showButtonText && <span style={{ fontSize: "10px" }}>Context</span>} */}
						</ButtonContainer>
					</react_1.VSCodeButton>

					<react_1.VSCodeButton
						data-testid="images-button"
						appearance="icon"
						aria-label="Add Images"
						disabled={shouldDisableImages}
						onClick={function () {
							if (!shouldDisableImages) {
								onSelectImages()
							}
						}}
						style={{ padding: "0px 0px", height: "20px" }}>
						<ButtonContainer>
							<span className="codicon codicon-device-camera" style={{ fontSize: "14px", marginBottom: -3 }} />
							{/* {showButtonText && <span style={{ fontSize: "10px" }}>Images</span>} */}
						</ButtonContainer>
					</react_1.VSCodeButton>

					<ModelContainer ref={modelSelectorRef}>
						<ModelButtonWrapper ref={buttonRef}>
							<ModelDisplayButton
								role="button"
								isActive={showModelSelector}
								disabled={false}
								onClick={handleModelButtonClick}
								// onKeyDown={(e) => {
								// 	if (e.key === "Enter" || e.key === " ") {
								// 		e.preventDefault()
								// 		handleModelButtonClick()
								// 	}
								// }}
								tabIndex={0}>
								<ModelButtonContent>{modelDisplayName}</ModelButtonContent>
							</ModelDisplayButton>
						</ModelButtonWrapper>
						{showModelSelector && (
							<ModelSelectorTooltip
								arrowPosition={arrowPosition}
								menuPosition={menuPosition}
								style={{
									bottom: "calc(100vh - ".concat(menuPosition, "px + 6px)"),
								}}>
								<ApiOptions_1.default
									showModelOptions={true}
									apiErrorMessage={undefined}
									modelIdErrorMessage={undefined}
									isPopup={true}
								/>
							</ModelSelectorTooltip>
						)}
					</ModelContainer>
				</ButtonGroup>
				<Tooltip_1.default
					style={{ zIndex: 1000 }}
					visible={shownTooltipMode !== null}
					tipText={"In "
						.concat(shownTooltipMode === "act" ? "Act" : "Plan", "  mode, Cline will ")
						.concat(
							shownTooltipMode === "act"
								? "complete the task immediately"
								: "gather information to architect a plan",
						)}
					hintText={"Toggle w/ ".concat(metaKeyChar, "+Shift+A")}>
					<SwitchContainer data-testid="mode-switch" disabled={false} onClick={onModeToggle}>
						<Slider isAct={chatSettings.mode === "act"} isPlan={chatSettings.mode === "plan"} />
						<SwitchOption
							isActive={chatSettings.mode === "plan"}
							onMouseOver={function () {
								return setShownTooltipMode("plan")
							}}
							onMouseLeave={function () {
								return setShownTooltipMode(null)
							}}>
							Plan
						</SwitchOption>
						<SwitchOption
							isActive={chatSettings.mode === "act"}
							onMouseOver={function () {
								return setShownTooltipMode("act")
							}}
							onMouseLeave={function () {
								return setShownTooltipMode(null)
							}}>
							Act
						</SwitchOption>
					</SwitchContainer>
				</Tooltip_1.default>
			</ControlsContainer>
		</div>
	)
})
exports.default = ChatTextArea
var templateObject_1,
	templateObject_2,
	templateObject_3,
	templateObject_4,
	templateObject_5,
	templateObject_6,
	templateObject_7,
	templateObject_8,
	templateObject_9,
	templateObject_10,
	templateObject_11
