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
exports.MAX_URLS = void 0
var react_1 = require("react")
var LinkPreview_1 = require("./LinkPreview")
var ImagePreview_1 = require("./ImagePreview")
var styled_components_1 = require("styled-components")
var CodeBlock_1 = require("@/components/common/CodeBlock")
var ChatErrorBoundary_1 = require("@/components/chat/ChatErrorBoundary")
var mcpRichUtil_1 = require("./utils/mcpRichUtil")
// Maximum number of URLs to process in total, per response
exports.MAX_URLS = 50
var ResponseHeader = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tdisplay: flex;\n\tjustify-content: space-between;\n\talign-items: center;\n\tpadding: 9px 10px;\n\tcolor: var(--vscode-descriptionForeground);\n\tcursor: pointer;\n\tuser-select: none;\n\tborder-bottom: 1px dashed var(--vscode-editorGroup-border);\n\tmargin-bottom: 8px;\n\n\t.header-title {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmargin-right: 8px;\n\t}\n",
			],
			[
				"\n\tdisplay: flex;\n\tjustify-content: space-between;\n\talign-items: center;\n\tpadding: 9px 10px;\n\tcolor: var(--vscode-descriptionForeground);\n\tcursor: pointer;\n\tuser-select: none;\n\tborder-bottom: 1px dashed var(--vscode-editorGroup-border);\n\tmargin-bottom: 8px;\n\n\t.header-title {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmargin-right: 8px;\n\t}\n",
			],
		)),
)
var ToggleSwitch = styled_components_1.default.div(
	templateObject_2 ||
		(templateObject_2 = __makeTemplateObject(
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tfont-size: 12px;\n\tcolor: var(--vscode-descriptionForeground);\n\n\t.toggle-label {\n\t\tmargin-right: 8px;\n\t}\n\n\t.toggle-container {\n\t\tposition: relative;\n\t\twidth: 40px;\n\t\theight: 20px;\n\t\tbackground-color: var(--vscode-button-secondaryBackground);\n\t\tborder-radius: 10px;\n\t\tcursor: pointer;\n\t\ttransition: background-color 0.3s;\n\t}\n\n\t.toggle-container.active {\n\t\tbackground-color: var(--vscode-button-background);\n\t}\n\n\t.toggle-handle {\n\t\tposition: absolute;\n\t\ttop: 2px;\n\t\tleft: 2px;\n\t\twidth: 16px;\n\t\theight: 16px;\n\t\tbackground-color: var(--vscode-button-foreground);\n\t\tborder-radius: 50%;\n\t\ttransition: transform 0.3s;\n\t}\n\n\t.toggle-container.active .toggle-handle {\n\t\ttransform: translateX(20px);\n\t}\n",
			],
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tfont-size: 12px;\n\tcolor: var(--vscode-descriptionForeground);\n\n\t.toggle-label {\n\t\tmargin-right: 8px;\n\t}\n\n\t.toggle-container {\n\t\tposition: relative;\n\t\twidth: 40px;\n\t\theight: 20px;\n\t\tbackground-color: var(--vscode-button-secondaryBackground);\n\t\tborder-radius: 10px;\n\t\tcursor: pointer;\n\t\ttransition: background-color 0.3s;\n\t}\n\n\t.toggle-container.active {\n\t\tbackground-color: var(--vscode-button-background);\n\t}\n\n\t.toggle-handle {\n\t\tposition: absolute;\n\t\ttop: 2px;\n\t\tleft: 2px;\n\t\twidth: 16px;\n\t\theight: 16px;\n\t\tbackground-color: var(--vscode-button-foreground);\n\t\tborder-radius: 50%;\n\t\ttransition: transform 0.3s;\n\t}\n\n\t.toggle-container.active .toggle-handle {\n\t\ttransform: translateX(20px);\n\t}\n",
			],
		)),
)
var ResponseContainer = styled_components_1.default.div(
	templateObject_3 ||
		(templateObject_3 = __makeTemplateObject(
			[
				"\n\tposition: relative;\n\tfont-family: var(--vscode-editor-font-family, monospace);\n\tfont-size: var(--vscode-editor-font-size, 12px);\n\tbackground-color: ",
				";\n\tcolor: var(--vscode-editor-foreground, #d4d4d4);\n\tborder-radius: 3px;\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\toverflow: hidden;\n\n\t.response-content {\n\t\toverflow-x: auto;\n\t\toverflow-y: hidden;\n\t\tmax-width: 100%;\n\t\tpadding: 10px;\n\t}\n",
			],
			[
				"\n\tposition: relative;\n\tfont-family: var(--vscode-editor-font-family, monospace);\n\tfont-size: var(--vscode-editor-font-size, 12px);\n\tbackground-color: ",
				";\n\tcolor: var(--vscode-editor-foreground, #d4d4d4);\n\tborder-radius: 3px;\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\toverflow: hidden;\n\n\t.response-content {\n\t\toverflow-x: auto;\n\t\toverflow-y: hidden;\n\t\tmax-width: 100%;\n\t\tpadding: 10px;\n\t}\n",
				// Style for URL text to ensure proper wrapping
			],
		)),
	CodeBlock_1.CODE_BLOCK_BG_COLOR,
)
// Style for URL text to ensure proper wrapping
var UrlText = styled_components_1.default.div(
	templateObject_4 ||
		(templateObject_4 = __makeTemplateObject(
			[
				"\n\twhite-space: pre-wrap;\n\tword-break: break-all;\n\toverflow-wrap: break-word;\n\tfont-family: var(--vscode-editor-font-family, monospace);\n\tfont-size: var(--vscode-editor-font-size, 12px);\n",
			],
			[
				"\n\twhite-space: pre-wrap;\n\tword-break: break-all;\n\toverflow-wrap: break-word;\n\tfont-family: var(--vscode-editor-font-family, monospace);\n\tfont-size: var(--vscode-editor-font-size, 12px);\n",
			],
		)),
)
var McpResponseDisplay = function (_a) {
	var responseText = _a.responseText
	var _b = (0, react_1.useState)(true),
		isLoading = _b[0],
		setIsLoading = _b[1]
	var _c = (0, react_1.useState)(function () {
			// Get saved preference from localStorage, default to 'rich'
			var savedMode = localStorage.getItem("mcpDisplayMode")
			return savedMode === "plain" ? "plain" : "rich"
		}),
		displayMode = _c[0],
		setDisplayMode = _c[1]
	var _d = (0, react_1.useState)([]),
		urlMatches = _d[0],
		setUrlMatches = _d[1]
	var _e = (0, react_1.useState)(null),
		error = _e[0],
		setError = _e[1]
	// Add a counter state for forcing re-renders to make toggling run smoother
	var _f = (0, react_1.useState)(0),
		forceUpdateCounter = _f[0],
		setForceUpdateCounter = _f[1]
	var toggleDisplayMode = (0, react_1.useCallback)(
		function () {
			var newMode = displayMode === "rich" ? "plain" : "rich"
			// Force an immediate re-render
			setForceUpdateCounter(function (prev) {
				return prev + 1
			})
			// Update display mode and save preference
			setDisplayMode(newMode)
			localStorage.setItem("mcpDisplayMode", newMode)
			// If switching to plain mode, cancel any ongoing processing
			if (newMode === "plain") {
				console.log("Switching to plain mode - cancelling URL processing")
				setUrlMatches([]) // Clear any existing matches when switching to plain mode
			} else {
				// If switching to rich mode, the useEffect will re-run and fetch data
				console.log("Switching to rich mode - will start URL processing")
			}
		},
		[displayMode],
	)
	// Find all URLs in the text and determine if they're images
	;(0, react_1.useEffect)(
		function () {
			// Skip all processing if in plain mode
			if (displayMode === "plain") {
				setIsLoading(false)
				setUrlMatches([]) // Clear any existing matches when in plain mode
				return
			}
			// Use a direct boolean for cancellation that's scoped to this effect run
			var processingCanceled = false
			var processResponse = function () {
				return __awaiter(void 0, void 0, void 0, function () {
					var text, matches_1, urlRegex, urlMatch, urlCount, url, processImageChecks
					return __generator(this, function (_a) {
						console.log("Processing MCP response for URL extraction")
						setIsLoading(true)
						setError(null)
						try {
							text = responseText || ""
							matches_1 = []
							urlRegex = /https?:\/\/[^\s<>"']+/g
							urlMatch = void 0
							urlCount = 0
							// First pass: Extract all URLs and immediately make them available for rendering
							while ((urlMatch = urlRegex.exec(text)) !== null && urlCount < exports.MAX_URLS) {
								url = urlMatch[0]
								// Skip invalid URLs
								if (!(0, mcpRichUtil_1.isUrl)(url)) {
									console.log("Skipping invalid URL:", url)
									continue
								}
								// Skip localhost URLs to prevent security issues
								if ((0, mcpRichUtil_1.isLocalhostUrl)(url)) {
									console.log("Skipping localhost URL:", url)
									continue
								}
								matches_1.push({
									url: url,
									fullMatch: url,
									index: urlMatch.index,
									isImage: false, // Will check later
									isProcessed: false,
								})
								urlCount++
							}
							console.log("Found ".concat(matches_1.length, " URLs in text, will check if they are images"))
							// Set matches immediately so UI can start rendering with loading states
							setUrlMatches(
								matches_1.sort(function (a, b) {
									return a.index - b.index
								}),
							)
							// Mark loading as complete to show content immediately
							setIsLoading(false)
							processImageChecks = function () {
								return __awaiter(void 0, void 0, void 0, function () {
									var i, match, isImage, err_1
									return __generator(this, function (_a) {
										switch (_a.label) {
											case 0:
												console.log(
													"Starting sequential URL processing for ".concat(matches_1.length, " URLs"),
												)
												i = 0
												_a.label = 1
											case 1:
												if (!(i < matches_1.length)) return [3 /*break*/, 8]
												// Skip already processed URLs (from extension check)
												if (matches_1[i].isProcessed) return [3 /*break*/, 7]
												// Check if processing has been canceled (switched to plain mode)
												if (processingCanceled) {
													console.log("URL processing canceled - display mode changed to plain")
													return [2 /*return*/]
												}
												match = matches_1[i]
												console.log(
													"Processing URL "
														.concat(i + 1, " of ")
														.concat(matches_1.length, ": ")
														.concat(match.url),
												)
												_a.label = 2
											case 2:
												_a.trys.push([2, 4, , 5])
												return [
													4 /*yield*/,
													(0, mcpRichUtil_1.checkIfImageUrl)(match.url),
													// Skip if processing has been canceled
												]
											case 3:
												isImage = _a.sent()
												// Skip if processing has been canceled
												if (processingCanceled) return [2 /*return*/]
												// Update the match in place
												match.isImage = isImage
												match.isProcessed = true
												// Update state after each URL to show progress
												// Create a new array to ensure React detects the state change
												setUrlMatches(__spreadArray([], matches_1, true))
												return [3 /*break*/, 5]
											case 4:
												err_1 = _a.sent()
												console.log("URL check error: ".concat(match.url), err_1)
												match.isProcessed = true
												// Update state even on error
												if (!processingCanceled) {
													setUrlMatches(__spreadArray([], matches_1, true))
												}
												return [3 /*break*/, 5]
											case 5:
												if (!(!processingCanceled && i < matches_1.length - 1)) return [3 /*break*/, 7]
												return [
													4 /*yield*/,
													new Promise(function (resolve) {
														return setTimeout(resolve, 100)
													}),
												]
											case 6:
												_a.sent()
												_a.label = 7
											case 7:
												i++
												return [3 /*break*/, 1]
											case 8:
												console.log(
													"URL processing complete. Found ".concat(
														matches_1.filter(function (m) {
															return m.isImage
														}).length,
														" image URLs",
													),
												)
												return [2 /*return*/]
										}
									})
								})
							}
							// Start the background processing
							processImageChecks()
						} catch (error) {
							setError("Failed to process response content. Switch to plain text mode to view safely.")
							setIsLoading(false)
						}
						return [2 /*return*/]
					})
				})
			}
			processResponse()
			// Cleanup function to cancel processing if component unmounts or dependencies change
			return function () {
				processingCanceled = true
				console.log("Cleaning up URL processing")
			}
		},
		[responseText, displayMode, forceUpdateCounter],
	)
	// Function to render content based on display mode
	var renderContent = function () {
		// For plain text mode, just show the text
		if (displayMode === "plain" || isLoading) {
			return <UrlText>{responseText}</UrlText>
		}
		// Show error message if there was an error
		if (error) {
			return (
				<>
					<div style={{ color: "var(--vscode-errorForeground)", marginBottom: "10px" }}>{error}</div>
					<UrlText>{responseText}</UrlText>
				</>
			)
		}
		// For rich display mode, show the text with embedded content
		if (!isLoading) {
			// We already know displayMode is "rich" if we get here
			// Create an array of text segments and embedded content
			var segments = []
			var lastIndex = 0
			var segmentIndex = 0
			// Track embed count for logging
			var embedCount = 0
			// Add the text before the first URL
			if (urlMatches.length === 0) {
				segments.push(<UrlText key={"segment-".concat(segmentIndex)}>{responseText}</UrlText>)
			} else {
				for (var i = 0; i < urlMatches.length; i++) {
					var match = urlMatches[i]
					var url = match.url,
						fullMatch = match.fullMatch,
						index = match.index
					// Add text segment before this URL
					if (index > lastIndex) {
						segments.push(
							<UrlText key={"segment-".concat(segmentIndex++)}>{responseText.substring(lastIndex, index)}</UrlText>,
						)
					}
					// Add the URL text itself
					segments.push(<UrlText key={"url-".concat(segmentIndex++)}>{fullMatch}</UrlText>)
					// Calculate the end position of this URL in the text
					var urlEndIndex = index + fullMatch.length
					// Add embedded content after the URL
					// For images, use the ImagePreview component
					if (match.isImage) {
						segments.push(
							<div key={"embed-image-".concat(url, "-").concat(segmentIndex++)}>
								{/* Use formatUrlForOpening for network calls but preserve original URL in display */}
								<ImagePreview_1.default url={(0, mcpRichUtil_1.formatUrlForOpening)(url)} />
							</div>,
						)
						embedCount++
						// console.log(`Added image embed for ${url}, embed count: ${embedCount}`);
					} else if (match.isProcessed) {
						// For non-image URLs or URLs we haven't processed yet, show link preview
						try {
							// Skip localhost URLs
							if (!(0, mcpRichUtil_1.isLocalhostUrl)(url)) {
								// Use a unique key that includes the URL to ensure each preview is isolated
								segments.push(
									<div key={"embed-".concat(url, "-").concat(segmentIndex++)} style={{ margin: "10px 0" }}>
										{/* Already using formatUrlForOpening for link previews */}
										<LinkPreview_1.default url={(0, mcpRichUtil_1.formatUrlForOpening)(url)} />
									</div>,
								)
								embedCount++
								// console.log(`Added link preview for ${url}, embed count: ${embedCount}`);
							}
						} catch (e) {
							console.log("Link preview could not be created")
							// Show error message for failed link preview
							segments.push(
								<div
									key={"embed-error-".concat(segmentIndex++)}
									style={{
										margin: "10px 0",
										padding: "8px",
										color: "var(--vscode-errorForeground)",
										border: "1px solid var(--vscode-editorError-foreground)",
										borderRadius: "4px",
										height: "128px", // Fixed height
										overflow: "auto", // Allow scrolling if content overflows
									}}>
									Failed to create preview for: {url}
								</div>,
							)
						}
					}
					// Update lastIndex for next segment
					lastIndex = urlEndIndex
				}
				// Add any remaining text after the last URL
				if (lastIndex < responseText.length) {
					segments.push(<UrlText key={"segment-".concat(segmentIndex++)}>{responseText.substring(lastIndex)}</UrlText>)
				}
			}
			return <>{segments}</>
		}
		return null
	}
	try {
		return (
			<ResponseContainer>
				<ResponseHeader>
					<span className="header-title">Response</span>
					<ToggleSwitch>
						<span className="toggle-label">{displayMode === "rich" ? "Rich Display" : "Plain Text"}</span>
						<div
							className={"toggle-container ".concat(displayMode === "rich" ? "active" : "")}
							onClick={toggleDisplayMode}>
							<div className="toggle-handle"></div>
						</div>
					</ToggleSwitch>
				</ResponseHeader>

				<div className="response-content">{renderContent()}</div>
			</ResponseContainer>
		)
	} catch (error) {
		console.log("Error rendering MCP response - falling back to plain text")
		return (
			<ResponseContainer>
				<ResponseHeader>
					<span className="header-title">Response</span>
				</ResponseHeader>
				<div className="response-content">
					<div>Error parsing response:</div>
					<UrlText>{responseText}</UrlText>
				</div>
			</ResponseContainer>
		)
	}
}
// Wrap the entire McpResponseDisplay component with an error boundary
var McpResponseDisplayWithErrorBoundary = function (props) {
	return (
		<ChatErrorBoundary_1.default>
			<McpResponseDisplay {...props} />
		</ChatErrorBoundary_1.default>
	)
}
exports.default = McpResponseDisplayWithErrorBoundary
var templateObject_1, templateObject_2, templateObject_3, templateObject_4
