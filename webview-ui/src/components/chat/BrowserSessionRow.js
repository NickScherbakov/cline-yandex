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
var fast_deep_equal_1 = require("fast-deep-equal")
var react_2 = require("react")
var react_use_1 = require("react-use")
var styled_components_1 = require("styled-components")
var BrowserSettings_1 = require("@shared/BrowserSettings")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var vscode_1 = require("@/utils/vscode")
var BrowserSettingsMenu_1 = require("@/components/browser/BrowserSettingsMenu")
var CheckpointControls_1 = require("@/components/common/CheckpointControls")
var CodeBlock_1 = require("@/components/common/CodeBlock")
var ChatRow_1 = require("@/components/chat/ChatRow")
var browserSessionRowContainerInnerStyle = {
	display: "flex",
	alignItems: "center",
	gap: "10px",
	marginBottom: "10px",
}
var browserIconStyle = {
	color: "var(--vscode-foreground)",
	marginBottom: "-1.5px",
}
var approveTextStyle = { fontWeight: "bold" }
var urlBarContainerStyle = {
	margin: "5px auto",
	width: "calc(100% - 10px)",
	display: "flex",
	alignItems: "center",
	gap: "4px",
}
var urlTextStyle = {
	textOverflow: "ellipsis",
	overflow: "hidden",
	whiteSpace: "nowrap",
	width: "100%",
	textAlign: "center",
}
var imgScreenshotStyle = {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	objectFit: "contain",
	cursor: "pointer",
}
var noScreenshotContainerStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
}
var noScreenshotIconStyle = {
	fontSize: "80px",
	color: "var(--vscode-descriptionForeground)",
}
var consoleLogsContainerStyle = { width: "100%" }
var consoleLogsTextStyle = { fontSize: "0.8em" }
var paginationContainerStyle = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "8px 0px",
	marginTop: "15px",
	borderTop: "1px solid var(--vscode-editorGroup-border)",
}
var paginationButtonGroupStyle = { display: "flex", gap: "4px" }
var browserSessionStartedTextStyle = { fontWeight: "bold" }
var codeBlockContainerStyle = {
	borderRadius: 3,
	border: "1px solid var(--vscode-editorGroup-border)",
	overflow: "hidden",
	backgroundColor: CodeBlock_1.CODE_BLOCK_BG_COLOR,
}
var browserActionBoxContainerStyle = { padding: "10px 0 0 0" }
var browserActionBoxContainerInnerStyle = {
	borderRadius: 3,
	backgroundColor: CodeBlock_1.CODE_BLOCK_BG_COLOR,
	overflow: "hidden",
	border: "1px solid var(--vscode-editorGroup-border)",
}
var browseActionRowContainerStyle = {
	display: "flex",
	alignItems: "center",
	padding: "9px 10px",
}
var browseActionRowStyle = {
	whiteSpace: "normal",
	wordBreak: "break-word",
}
var browseActionTextStyle = { fontWeight: 500 }
var chatRowContentContainerStyle = { padding: "10px 0 10px 0" }
var headerStyle = {
	display: "flex",
	alignItems: "center",
	gap: "10px",
	marginBottom: "10px",
}
var BrowserSessionRow = (0, react_2.memo)(function (props) {
	var _a, _b
	var messages = props.messages,
		isLast = props.isLast,
		onHeightChange = props.onHeightChange,
		lastModifiedMessage = props.lastModifiedMessage
	var browserSettings = (0, ExtensionStateContext_1.useExtensionState)().browserSettings
	var prevHeightRef = (0, react_2.useRef)(0)
	var _c = (0, react_2.useState)(0),
		maxActionHeight = _c[0],
		setMaxActionHeight = _c[1]
	var _d = (0, react_2.useState)(false),
		consoleLogsExpanded = _d[0],
		setConsoleLogsExpanded = _d[1]
	var isLastApiReqInterrupted = (0, react_2.useMemo)(
		function () {
			// Check if last api_req_started is cancelled
			var lastApiReqStarted = __spreadArray([], messages, true)
				.reverse()
				.find(function (m) {
					return m.say === "api_req_started"
				})
			if ((lastApiReqStarted === null || lastApiReqStarted === void 0 ? void 0 : lastApiReqStarted.text) != null) {
				var info = JSON.parse(lastApiReqStarted.text)
				if (info.cancelReason != null) {
					return true
				}
			}
			var lastApiReqFailed =
				isLast &&
				(lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) ===
					"api_req_failed"
			if (lastApiReqFailed) {
				return true
			}
			return false
		},
		[messages, lastModifiedMessage, isLast],
	)
	var isBrowsing = (0, react_2.useMemo)(
		function () {
			return (
				isLast &&
				messages.some(function (m) {
					return m.say === "browser_action_result"
				}) &&
				!isLastApiReqInterrupted
			) // after user approves, browser_action_result with "" is sent to indicate that the session has started
		},
		[isLast, messages, isLastApiReqInterrupted],
	)
	// Organize messages into pages with current state and next action
	var pages = (0, react_2.useMemo)(
		function () {
			var result = []
			var currentStateMessages = []
			var nextActionMessages = []
			messages.forEach(function (message) {
				if (message.ask === "browser_action_launch" || message.say === "browser_action_launch") {
					// Start first page
					currentStateMessages = [message]
				} else if (message.say === "browser_action_result") {
					if (message.text === "") {
						// first browser_action_result is an empty string that signals that session has started
						return
					}
					// Complete current state
					currentStateMessages.push(message)
					var resultData = JSON.parse(message.text || "{}")
					// Add page with current state and previous next actions
					result.push({
						currentState: {
							url: resultData.currentUrl,
							screenshot: resultData.screenshot,
							mousePosition: resultData.currentMousePosition,
							consoleLogs: resultData.logs,
							messages: __spreadArray([], currentStateMessages, true),
						},
						nextAction:
							nextActionMessages.length > 0
								? {
										messages: __spreadArray([], nextActionMessages, true),
									}
								: undefined,
					})
					// Reset for next page
					currentStateMessages = []
					nextActionMessages = []
				} else if (message.say === "api_req_started" || message.say === "text" || message.say === "browser_action") {
					// These messages lead to the next result, so they should always go in nextActionMessages
					nextActionMessages.push(message)
				} else {
					// Any other message types
					currentStateMessages.push(message)
				}
			})
			// Add incomplete page if exists
			if (currentStateMessages.length > 0 || nextActionMessages.length > 0) {
				result.push({
					currentState: {
						messages: __spreadArray([], currentStateMessages, true),
					},
					nextAction:
						nextActionMessages.length > 0
							? {
									messages: __spreadArray([], nextActionMessages, true),
								}
							: undefined,
				})
			}
			return result
		},
		[messages],
	)
	// Auto-advance to latest page
	var _e = (0, react_2.useState)(0),
		currentPageIndex = _e[0],
		setCurrentPageIndex = _e[1]
	;(0, react_2.useEffect)(
		function () {
			setCurrentPageIndex(pages.length - 1)
		},
		[pages.length],
	)
	// Get initial URL from launch message
	var initialUrl = (0, react_2.useMemo)(
		function () {
			var launchMessage = messages.find(function (m) {
				return m.ask === "browser_action_launch" || m.say === "browser_action_launch"
			})
			return (launchMessage === null || launchMessage === void 0 ? void 0 : launchMessage.text) || ""
		},
		[messages],
	)
	var isAutoApproved = (0, react_2.useMemo)(
		function () {
			var launchMessage = messages.find(function (m) {
				return m.ask === "browser_action_launch" || m.say === "browser_action_launch"
			})
			return (launchMessage === null || launchMessage === void 0 ? void 0 : launchMessage.say) === "browser_action_launch"
		},
		[messages],
	)
	// const lastCheckpointMessageTs = useMemo(() => {
	// 	const lastCheckpointMessage = findLast(messages, (m) => m.lastCheckpointHash !== undefined)
	// 	return lastCheckpointMessage?.ts
	// }, [messages])
	// Find the latest available URL and screenshot
	var latestState = (0, react_2.useMemo)(
		function () {
			for (var i = pages.length - 1; i >= 0; i--) {
				var page = pages[i]
				if (page.currentState.url || page.currentState.screenshot) {
					return {
						url: page.currentState.url,
						mousePosition: page.currentState.mousePosition,
						consoleLogs: page.currentState.consoleLogs,
						screenshot: page.currentState.screenshot,
					}
				}
			}
			return {
				url: undefined,
				mousePosition: undefined,
				consoleLogs: undefined,
				screenshot: undefined,
			}
		},
		[pages],
	)
	var currentPage = pages[currentPageIndex]
	var isLastPage = currentPageIndex === pages.length - 1
	var defaultMousePosition = "".concat(browserSettings.viewport.width * 0.7, ",").concat(browserSettings.viewport.height * 0.5)
	// Use latest state if we're on the last page and don't have a state yet
	var displayState = isLastPage
		? {
				url:
					(currentPage === null || currentPage === void 0 ? void 0 : currentPage.currentState.url) ||
					latestState.url ||
					initialUrl,
				mousePosition:
					(currentPage === null || currentPage === void 0 ? void 0 : currentPage.currentState.mousePosition) ||
					latestState.mousePosition ||
					defaultMousePosition,
				consoleLogs: currentPage === null || currentPage === void 0 ? void 0 : currentPage.currentState.consoleLogs,
				screenshot:
					(currentPage === null || currentPage === void 0 ? void 0 : currentPage.currentState.screenshot) ||
					latestState.screenshot,
			}
		: {
				url: (currentPage === null || currentPage === void 0 ? void 0 : currentPage.currentState.url) || initialUrl,
				mousePosition:
					(currentPage === null || currentPage === void 0 ? void 0 : currentPage.currentState.mousePosition) ||
					defaultMousePosition,
				consoleLogs: currentPage === null || currentPage === void 0 ? void 0 : currentPage.currentState.consoleLogs,
				screenshot: currentPage === null || currentPage === void 0 ? void 0 : currentPage.currentState.screenshot,
			}
	var _f = (0, react_use_1.useSize)(
			<div>
				{(_a = currentPage === null || currentPage === void 0 ? void 0 : currentPage.nextAction) === null || _a === void 0
					? void 0
					: _a.messages.map(function (message) {
							return (
								<BrowserSessionRowContent
									key={message.ts}
									{...props}
									message={message}
									setMaxActionHeight={setMaxActionHeight}
								/>
							)
						})}
				{!isBrowsing &&
					messages.some(function (m) {
						return m.say === "browser_action_result"
					}) &&
					currentPageIndex === 0 && <BrowserActionBox action={"launch"} text={initialUrl} />}
			</div>,
		),
		actionContent = _f[0],
		actionHeight = _f[1].height
	;(0, react_2.useEffect)(
		function () {
			if (actionHeight === 0 || actionHeight === Infinity) {
				return
			}
			if (actionHeight > maxActionHeight) {
				setMaxActionHeight(actionHeight)
			}
		},
		[actionHeight, maxActionHeight],
	)
	// Track latest click coordinate
	var latestClickPosition = (0, react_2.useMemo)(
		function () {
			var _a
			if (!isBrowsing) return undefined
			// Look through current page's next actions for the latest browser_action
			var actions =
				((_a = currentPage === null || currentPage === void 0 ? void 0 : currentPage.nextAction) === null || _a === void 0
					? void 0
					: _a.messages) || []
			for (var i = actions.length - 1; i >= 0; i--) {
				var message = actions[i]
				if (message.say === "browser_action") {
					var browserAction = JSON.parse(message.text || "{}")
					if (browserAction.action === "click" && browserAction.coordinate) {
						return browserAction.coordinate
					}
				}
			}
			return undefined
		},
		[
			isBrowsing,
			(_b = currentPage === null || currentPage === void 0 ? void 0 : currentPage.nextAction) === null || _b === void 0
				? void 0
				: _b.messages,
		],
	)
	// Use latest click position while browsing, otherwise use display state
	var mousePosition = isBrowsing ? latestClickPosition || displayState.mousePosition : displayState.mousePosition
	// let shouldShowCheckpoints = true
	// if (isLast) {
	// 	shouldShowCheckpoints = lastModifiedMessage?.ask === "resume_completed_task" || lastModifiedMessage?.ask === "resume_task"
	// }
	var shouldShowSettings = (0, react_2.useMemo)(
		function () {
			var lastMessage = messages[messages.length - 1]
			return (
				(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.ask) === "browser_action_launch" ||
				(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.say) === "browser_action_launch"
			)
		},
		[messages],
	)
	// Calculate maxWidth
	var maxWidth =
		browserSettings.viewport.width < BrowserSettings_1.BROWSER_VIEWPORT_PRESETS["Small Desktop (900x600)"].width
			? 200
			: undefined
	var _g = (0, react_use_1.useSize)(
			// We don't declare a constant for the inline style here because `useSize` will try to modify the style object
			// Which will cause `Uncaught TypeError: Cannot assign to read only property 'position' of object '#<Object>'`
			<BrowserSessionRowContainer style={{ marginBottom: -10 }}>
				<div style={browserSessionRowContainerInnerStyle}>
					{isBrowsing ? (
						<ChatRow_1.ProgressIndicator />
					) : (
						<span className="codicon codicon-inspect" style={browserIconStyle}></span>
					)}
					<span style={approveTextStyle}>
						<>{isAutoApproved ? "Cline is using the browser:" : "Cline wants to use the browser:"}</>
					</span>
				</div>
				<div
					style={{
						borderRadius: 3,
						border: "1px solid var(--vscode-editorGroup-border)",
						// overflow: "hidden",
						backgroundColor: CodeBlock_1.CODE_BLOCK_BG_COLOR,
						// marginBottom: 10,
						maxWidth: maxWidth,
						margin: "0 auto 10px auto", // Center the container
					}}>
					{/* URL Bar */}
					<div style={urlBarContainerStyle}>
						<div
							style={{
								flex: 1,
								backgroundColor: "var(--vscode-input-background)",
								border: "1px solid var(--vscode-input-border)",
								borderRadius: "4px",
								padding: "3px 5px",
								minWidth: 0,
								color: displayState.url
									? "var(--vscode-input-foreground)"
									: "var(--vscode-descriptionForeground)",
								fontSize: "12px",
							}}>
							<div style={urlTextStyle}>{displayState.url || "http"}</div>
						</div>
						<BrowserSettingsMenu_1.BrowserSettingsMenu disabled={!shouldShowSettings} maxWidth={maxWidth} />
					</div>

					{/* Screenshot Area */}
					<div
						style={{
							width: "100%",
							paddingBottom: "".concat(
								(browserSettings.viewport.height / browserSettings.viewport.width) * 100,
								"%",
							),
							position: "relative",
							backgroundColor: "var(--vscode-input-background)",
						}}>
						{displayState.screenshot ? (
							<img
								src={displayState.screenshot}
								alt="Browser screenshot"
								style={imgScreenshotStyle}
								onClick={function () {
									return vscode_1.vscode.postMessage({
										type: "openImage",
										text: displayState.screenshot,
									})
								}}
							/>
						) : (
							<div style={noScreenshotContainerStyle}>
								<span className="codicon codicon-globe" style={noScreenshotIconStyle} />
							</div>
						)}
						{displayState.mousePosition && (
							<BrowserCursor
								style={{
									position: "absolute",
									top: "".concat(
										(parseInt(mousePosition.split(",")[1]) / browserSettings.viewport.height) * 100,
										"%",
									),
									left: "".concat(
										(parseInt(mousePosition.split(",")[0]) / browserSettings.viewport.width) * 100,
										"%",
									),
									transition: "top 0.3s ease-out, left 0.3s ease-out",
								}}
							/>
						)}
					</div>

					<div style={consoleLogsContainerStyle}>
						<div
							onClick={function () {
								setConsoleLogsExpanded(!consoleLogsExpanded)
							}}
							style={{
								display: "flex",
								alignItems: "center",
								gap: "4px",
								// width: "100%",
								justifyContent: "flex-start",
								cursor: "pointer",
								padding: "9px 8px ".concat(consoleLogsExpanded ? 0 : 8, "px 8px"),
							}}>
							<span className={"codicon codicon-chevron-".concat(consoleLogsExpanded ? "down" : "right")}></span>
							<span style={consoleLogsTextStyle}>Console Logs</span>
						</div>
						{consoleLogsExpanded && (
							<CodeBlock_1.default
								source={""
									.concat("```", "shell\n")
									.concat(displayState.consoleLogs || "(No new logs)", "\n")
									.concat("```")}
							/>
						)}
					</div>
				</div>

				{/* Action content with min height */}
				<div style={{ minHeight: maxActionHeight }}>{actionContent}</div>

				{/* Pagination moved to bottom */}
				{pages.length > 1 && (
					<div style={paginationContainerStyle}>
						<div>
							Step {currentPageIndex + 1} of {pages.length}
						</div>
						<div style={paginationButtonGroupStyle}>
							<react_1.VSCodeButton
								disabled={currentPageIndex === 0 || isBrowsing}
								onClick={function () {
									return setCurrentPageIndex(function (i) {
										return i - 1
									})
								}}>
								Previous
							</react_1.VSCodeButton>
							<react_1.VSCodeButton
								disabled={currentPageIndex === pages.length - 1 || isBrowsing}
								onClick={function () {
									return setCurrentPageIndex(function (i) {
										return i + 1
									})
								}}>
								Next
							</react_1.VSCodeButton>
						</div>
					</div>
				)}

				{/* {shouldShowCheckpoints && <CheckpointOverlay messageTs={lastCheckpointMessageTs} />} */}
			</BrowserSessionRowContainer>,
		),
		browserSessionRow = _g[0],
		height = _g[1].height
	// Height change effect
	;(0, react_2.useEffect)(
		function () {
			var isInitialRender = prevHeightRef.current === 0
			if (isLast && height !== 0 && height !== Infinity && height !== prevHeightRef.current) {
				if (!isInitialRender) {
					onHeightChange(height > prevHeightRef.current)
				}
				prevHeightRef.current = height
			}
		},
		[height, isLast, onHeightChange],
	)
	return browserSessionRow
}, fast_deep_equal_1.default)
var BrowserSessionRowContent = function (_a) {
	var message = _a.message,
		isExpanded = _a.isExpanded,
		onToggleExpand = _a.onToggleExpand,
		lastModifiedMessage = _a.lastModifiedMessage,
		isLast = _a.isLast,
		setMaxActionHeight = _a.setMaxActionHeight
	if (message.ask === "browser_action_launch" || message.say === "browser_action_launch") {
		return (
			<>
				<div style={headerStyle}>
					<span style={browserSessionStartedTextStyle}>Browser Session Started</span>
				</div>
				<div style={codeBlockContainerStyle}>
					<CodeBlock_1.default
						source={"".concat("```", "shell\n").concat(message.text, "\n").concat("```")}
						forceWrap={true}
					/>
				</div>
			</>
		)
	}
	switch (message.type) {
		case "say":
			switch (message.say) {
				case "api_req_started":
				case "text":
					return (
						<div style={chatRowContentContainerStyle}>
							<ChatRow_1.ChatRowContent
								message={message}
								isExpanded={isExpanded(message.ts)}
								onToggleExpand={function () {
									if (message.say === "api_req_started") {
										setMaxActionHeight(0)
									}
									onToggleExpand(message.ts)
								}}
								lastModifiedMessage={lastModifiedMessage}
								isLast={isLast}
							/>
						</div>
					)
				case "browser_action":
					var browserAction = JSON.parse(message.text || "{}")
					return (
						<BrowserActionBox
							action={browserAction.action}
							coordinate={browserAction.coordinate}
							text={browserAction.text}
						/>
					)
				default:
					return null
			}
		case "ask":
			switch (message.ask) {
				default:
					return null
			}
	}
}
var BrowserActionBox = function (_a) {
	var action = _a.action,
		coordinate = _a.coordinate,
		text = _a.text
	var getBrowserActionText = function (action, coordinate, text) {
		switch (action) {
			case "launch":
				return "Launch browser at ".concat(text)
			case "click":
				return "Click (".concat(
					coordinate === null || coordinate === void 0 ? void 0 : coordinate.replace(",", ", "),
					")",
				)
			case "type":
				return 'Type "'.concat(text, '"')
			case "scroll_down":
				return "Scroll down"
			case "scroll_up":
				return "Scroll up"
			case "close":
				return "Close browser"
			default:
				return action
		}
	}
	return (
		<div style={browserActionBoxContainerStyle}>
			<div style={browserActionBoxContainerInnerStyle}>
				<div style={browseActionRowContainerStyle}>
					<span style={browseActionRowStyle}>
						<span style={browseActionTextStyle}>Browse Action: </span>
						{getBrowserActionText(action, coordinate, text)}
					</span>
				</div>
			</div>
		</div>
	)
}
var BrowserCursor = function (_a) {
	var style = _a.style
	// (can't use svgs in vsc extensions)
	var cursorBase64 =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFaADAAQAAAABAAAAGAAAAADwi9a/AAADGElEQVQ4EZ2VbUiTURTH772be/PxZdsz3cZwC4RVaB8SAjMpxQwSWZbQG/TFkN7oW1Df+h6IRV9C+hCpKUSIZUXOfGM5tAKViijFFEyfZ7Ol29S1Pbdzl8Uw9+aBu91zzv3/nt17zt2DEZjBYOAkKrtFMXIghAWM8U2vMN/FctsxGRMpM7NbEEYNMM2CYUSInlJx3OpawO9i+XSNQYkmk2uFb9njzkcfVSr1p/GJiQKMULVaw2WuBv296UKRxWJR6wxGCmM1EAhSNppv33GBH9qI32cPTAtss9lUm6EM3N7R+RbigT+5/CeosFCZKpjEW+iorS1pb30wDUXzQfHqtD/9L3ieZ2ee1OJCmbL8QHnRs+4uj0wmW4QzrpCwvJ8zGg3JqAmhTLynuLiwv8/5KyND8Q3cEkUEDWu15oJE4KRQJt5hs1rcriGNRqP+DK4dyyWXXm/aFQ+cEpSJ8/LyDGPuEZNOmzsOroUSOqzXG/dtBU4ZysTZYKNut91sNo2Cq6cE9enz86s2g9OCMrFSqVC5hgb32u072W3jKMU90Hb1seC0oUwsB+t92bO/rKx0EFGkgFCnjjc1/gVvC8rE0L+4o63t4InjxwbAJQjTe3qD8QrLkXA4DC24fWtuajp06cLFYSBIFKGmXKPRRmAnME9sPt+yLwIWb9WN69fKoTneQz4Dh2mpPNkvfeV0jjecb9wNAkwIEVQq5VJOds4Kb+DXoAsiVquVwI1Dougpij6UyGYx+5cKroeDEFibm5lWRRMbH1+npmYrq6qhwlQHIbajZEf1fElcqGGFpGg9HMuKzpfBjhytCTMgkJ56RX09zy/ysENTBElmjIgJnmNChJqohDVQqpEfwkILE8v/o0GAnV9F1eEvofVQCbiTBEXOIPQh5PGgefDZeAcjrpGZjULBr/m3tZOnz7oEQWRAQZLjWlEU/XEJWySiILgRc5Cz1DkcAyuBFcnpfF0JiXWKpcolQXizhS5hKAqFpr0MVbgbuxJ6+5xX+P4wNpbqPPrugZfbmIbLmgQR3Aw8QSi66hUXulOFbF73GxqjE5BNXWNeAAAAAElFTkSuQmCC"
	return <img src={cursorBase64} style={__assign({ width: "17px", height: "22px" }, style)} alt="cursor" />
}
var BrowserSessionRowContainer = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			["\n\tpadding: 10px 6px 10px 15px;\n\tposition: relative;\n\n\t&:hover ", " {\n\t\topacity: 1;\n\t}\n"],
			["\n\tpadding: 10px 6px 10px 15px;\n\tposition: relative;\n\n\t&:hover ", " {\n\t\topacity: 1;\n\t}\n"],
		)),
	CheckpointControls_1.CheckpointControls,
)
exports.default = BrowserSessionRow
var templateObject_1
