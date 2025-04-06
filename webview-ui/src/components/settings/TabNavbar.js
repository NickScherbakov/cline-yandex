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
Object.defineProperty(exports, "__esModule", { value: true })
exports.TAB_NAVBAR_HEIGHT = void 0
var react_1 = require("@vscode/webview-ui-toolkit/react")
var react_2 = require("react")
exports.TAB_NAVBAR_HEIGHT = 24
var BUTTON_MARGIN_RIGHT = "3px"
var LAST_BUTTON_MARGIN_RIGHT = "13px"
var Tooltip = function (_a) {
	var text = _a.text,
		isVisible = _a.isVisible,
		position = _a.position,
		_b = _a.align,
		align = _b === void 0 ? "center" : _b
	var leftPosition = position.x
	var triangleStyle = {
		left: "50%",
		marginLeft: "-5px",
	}
	if (align === "right") {
		leftPosition = position.x - 10 // Adjust this value as needed
		triangleStyle = {
			right: "10px", // Adjust this value to match the tooltip's right padding
			marginLeft: "0",
		}
	} else if (align === "left") {
		leftPosition = position.x + 10 // Adjust this value as needed
		triangleStyle = {
			left: "10px", // Adjust this value to match the tooltip's left padding
			marginLeft: "0",
		}
	}
	return (
		<div
			style={{
				position: "fixed",
				top: "".concat(position.y, "px"),
				left: align === "center" ? leftPosition + "px" : "auto",
				right: align === "right" ? "10px" : "auto", // Ensure 10px from screen edge
				transform: align === "center" ? "translateX(-50%)" : "none",
				opacity: isVisible ? 1 : 0,
				visibility: isVisible ? "visible" : "hidden",
				transition: "opacity 0.1s ease-out 0.1s, visibility 0.1s ease-out 0.1s",
				backgroundColor: "var(--vscode-editorHoverWidget-background)",
				color: "var(--vscode-editorHoverWidget-foreground)",
				padding: "4px 8px",
				borderRadius: "3px",
				fontSize: "12px",
				pointerEvents: "none",
				zIndex: 1000,
				boxShadow: "0 2px 8px var(--vscode-widget-shadow)",
				border: "1px solid var(--vscode-editorHoverWidget-border)",
				textAlign: "center",
				whiteSpace: "nowrap",
			}}>
			<div
				style={__assign(__assign({ position: "absolute", top: "-5px" }, triangleStyle), {
					borderLeft: "5px solid transparent",
					borderRight: "5px solid transparent",
					borderBottom: "5px solid var(--vscode-editorHoverWidget-border)",
				})}
			/>
			<div
				style={__assign(__assign({ position: "absolute", top: "-4px" }, triangleStyle), {
					borderLeft: "5px solid transparent",
					borderRight: "5px solid transparent",
					borderBottom: "5px solid var(--vscode-editorHoverWidget-background)",
				})}
			/>
			{text}
		</div>
	)
}
var TabNavbar = function (_a) {
	var onPlusClick = _a.onPlusClick,
		onHistoryClick = _a.onHistoryClick,
		onSettingsClick = _a.onSettingsClick
	var _b = (0, react_2.useState)({
			text: "",
			isVisible: false,
			position: { x: 0, y: 0 },
			align: "center",
		}),
		tooltip = _b[0],
		setTooltip = _b[1]
	var showTooltip = function (text, event, align) {
		if (align === void 0) {
			align = "center"
		}
		var rect = event.currentTarget.getBoundingClientRect()
		setTooltip({
			text: text,
			isVisible: true,
			position: { x: rect.left + rect.width / 2, y: rect.bottom + 7 },
			align: align,
		})
	}
	var hideTooltip = function () {
		setTooltip(function (prev) {
			return __assign(__assign({}, prev), { isVisible: false })
		})
	}
	var buttonStyle = {
		marginRight: BUTTON_MARGIN_RIGHT,
	}
	var lastButtonStyle = __assign(__assign({}, buttonStyle), { marginRight: LAST_BUTTON_MARGIN_RIGHT })
	return (
		<>
			<div
				style={{
					position: "absolute",
					top: 4,
					right: 0,
					left: 0,
					height: exports.TAB_NAVBAR_HEIGHT,
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
				}}>
				<react_1.VSCodeButton
					appearance="icon"
					onClick={onPlusClick}
					style={buttonStyle}
					onMouseEnter={function (e) {
						return showTooltip("New Chat", e, "center")
					}}
					onMouseLeave={hideTooltip}
					onMouseMove={function (e) {
						return showTooltip("New Chat", e, "center")
					}}>
					<span className="codicon codicon-add"></span>
				</react_1.VSCodeButton>
				<react_1.VSCodeButton
					appearance="icon"
					onClick={onHistoryClick}
					style={buttonStyle}
					onMouseEnter={function (e) {
						return showTooltip("History", e, "center")
					}}
					onMouseLeave={hideTooltip}
					onMouseMove={function (e) {
						return showTooltip("History", e, "center")
					}}>
					<span className="codicon codicon-history"></span>
				</react_1.VSCodeButton>
				<react_1.VSCodeButton
					appearance="icon"
					onClick={onSettingsClick}
					style={lastButtonStyle}
					onMouseEnter={function (e) {
						return showTooltip("Settings", e, "right")
					}}
					onMouseLeave={hideTooltip}
					onMouseMove={function (e) {
						return showTooltip("Settings", e, "right")
					}}>
					<span className="codicon codicon-settings-gear"></span>
				</react_1.VSCodeButton>
			</div>
			<Tooltip {...tooltip} />
		</>
	)
}
exports.default = TabNavbar
