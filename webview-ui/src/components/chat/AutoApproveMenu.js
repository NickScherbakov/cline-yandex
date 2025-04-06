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
var react_1 = require("@vscode/webview-ui-toolkit/react")
var react_2 = require("react")
var styled_components_1 = require("styled-components")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var vscode_1 = require("@/utils/vscode")
var vscStyles_1 = require("@/utils/vscStyles")
var ACTION_METADATA = [
	{
		id: "readFiles",
		label: "Read files and directories",
		shortName: "Read",
		description: "Allows access to read any file on your computer.",
	},
	{
		id: "editFiles",
		label: "Edit files",
		shortName: "Edit",
		description: "Allows modification of any files on your computer.",
	},
	{
		id: "executeCommands",
		label: "Execute safe commands",
		shortName: "Commands",
		description:
			"Allows execution of safe terminal commands. If the model determines a command is potentially destructive, it will still require approval.",
	},
	{
		id: "useBrowser",
		label: "Use the browser",
		shortName: "Browser",
		description: "Allows ability to launch and interact with any website in a headless browser.",
	},
	{
		id: "useMcp",
		label: "Use MCP servers",
		shortName: "MCP",
		description: "Allows use of configured MCP servers which may modify filesystem or interact with APIs.",
	},
]
var AutoApproveMenu = function (_a) {
	var style = _a.style
	var autoApprovalSettings = (0, ExtensionStateContext_1.useExtensionState)().autoApprovalSettings
	var _b = (0, react_2.useState)(false),
		isExpanded = _b[0],
		setIsExpanded = _b[1]
	var _c = (0, react_2.useState)(false),
		isHoveringCollapsibleSection = _c[0],
		setIsHoveringCollapsibleSection = _c[1]
	// Careful not to use partials to mutate since spread operator only does shallow copy
	var enabledActions = ACTION_METADATA.filter(function (action) {
		return autoApprovalSettings.actions[action.id]
	})
	var enabledActionsList = enabledActions
		.map(function (action) {
			return action.shortName
		})
		.join(", ")
	var hasEnabledActions = enabledActions.length > 0
	var updateEnabled = (0, react_2.useCallback)(
		function (enabled) {
			vscode_1.vscode.postMessage({
				type: "autoApprovalSettings",
				autoApprovalSettings: __assign(__assign({}, autoApprovalSettings), { enabled: enabled }),
			})
		},
		[autoApprovalSettings],
	)
	var updateAction = (0, react_2.useCallback)(
		function (actionId, value) {
			var _a
			// Calculate what the new actions state will be
			var newActions = __assign(__assign({}, autoApprovalSettings.actions), ((_a = {}), (_a[actionId] = value), _a))
			// Check if this will result in any enabled actions
			var willHaveEnabledActions = Object.values(newActions).some(Boolean)
			vscode_1.vscode.postMessage({
				type: "autoApprovalSettings",
				autoApprovalSettings: __assign(__assign({}, autoApprovalSettings), {
					actions: newActions,
					// If no actions will be enabled, ensure the main toggle is off
					enabled: willHaveEnabledActions ? autoApprovalSettings.enabled : false,
				}),
			})
		},
		[autoApprovalSettings],
	)
	var updateMaxRequests = (0, react_2.useCallback)(
		function (maxRequests) {
			vscode_1.vscode.postMessage({
				type: "autoApprovalSettings",
				autoApprovalSettings: __assign(__assign({}, autoApprovalSettings), { maxRequests: maxRequests }),
			})
		},
		[autoApprovalSettings],
	)
	var updateNotifications = (0, react_2.useCallback)(
		function (enableNotifications) {
			vscode_1.vscode.postMessage({
				type: "autoApprovalSettings",
				autoApprovalSettings: __assign(__assign({}, autoApprovalSettings), { enableNotifications: enableNotifications }),
			})
		},
		[autoApprovalSettings],
	)
	return (
		<div
			style={__assign(
				{
					padding: "0 15px",
					userSelect: "none",
					borderTop: isExpanded
						? "0.5px solid color-mix(in srgb, ".concat(
								(0, vscStyles_1.getAsVar)(vscStyles_1.VSC_TITLEBAR_INACTIVE_FOREGROUND),
								" 20%, transparent)",
							)
						: "none",
					overflowY: "auto",
				},
				style,
			)}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "8px",
					padding: isExpanded ? "8px 0" : "8px 0 0 0",
					cursor: !hasEnabledActions ? "pointer" : "default",
				}}
				onMouseEnter={function () {
					if (!hasEnabledActions) {
						setIsHoveringCollapsibleSection(true)
					}
				}}
				onMouseLeave={function () {
					if (!hasEnabledActions) {
						setIsHoveringCollapsibleSection(false)
					}
				}}
				onClick={function () {
					if (!hasEnabledActions) {
						setIsExpanded(function (prev) {
							return !prev
						})
					}
				}}>
				<react_1.VSCodeCheckbox
					style={{
						pointerEvents: hasEnabledActions ? "auto" : "none",
					}}
					checked={hasEnabledActions && autoApprovalSettings.enabled}
					disabled={!hasEnabledActions}
					// onChange={(e) => {
					// 	const checked = (e.target as HTMLInputElement).checked
					// 	updateEnabled(checked)
					// }}
					onClick={function (e) {
						/*
            vscode web toolkit bug: when changing the value of a vscodecheckbox programmatically, it will call its onChange with stale state. This led to updateEnabled being called with an old version of autoApprovalSettings, effectively undoing the state change that was triggered by the last action being unchecked. A simple workaround is to just not use onChange and instead use onClick. We are lucky this is a checkbox and the newvalue is simply opposite of current state.
            */
						if (!hasEnabledActions) return
						e.stopPropagation() // stops click from bubbling up to the parent, in this case stopping the expanding/collapsing
						updateEnabled(!autoApprovalSettings.enabled)
					}}
				/>
				<CollapsibleSection
					isHovered={isHoveringCollapsibleSection}
					style={{ cursor: "pointer" }}
					onClick={function () {
						// to prevent this from counteracting parent
						if (hasEnabledActions) {
							setIsExpanded(function (prev) {
								return !prev
							})
						}
					}}>
					<span
						style={{
							color: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_FOREGROUND),
							whiteSpace: "nowrap",
						}}>
						Auto-approve:
					</span>
					<span
						style={{
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}>
						{enabledActions.length === 0 ? "None" : enabledActionsList}
					</span>
					<span
						className={"codicon codicon-chevron-".concat(isExpanded ? "down" : "right")}
						style={{
							flexShrink: 0,
							marginLeft: isExpanded ? "2px" : "-2px",
						}}
					/>
				</CollapsibleSection>
			</div>
			{isExpanded && (
				<div style={{ padding: "0" }}>
					<div
						style={{
							marginBottom: "10px",
							color: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_DESCRIPTION_FOREGROUND),
							fontSize: "12px",
						}}>
						Auto-approve allows Cline to perform the following actions without asking for permission. Please use with
						caution and only enable if you understand the risks.
					</div>
					{ACTION_METADATA.map(function (action) {
						return (
							<div key={action.id} style={{ margin: "6px 0" }}>
								<react_1.VSCodeCheckbox
									checked={autoApprovalSettings.actions[action.id]}
									onChange={function (e) {
										var checked = e.target.checked
										updateAction(action.id, checked)
									}}>
									{action.label}
								</react_1.VSCodeCheckbox>
								<div
									style={{
										marginLeft: "28px",
										color: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_DESCRIPTION_FOREGROUND),
										fontSize: "12px",
									}}>
									{action.description}
								</div>
							</div>
						)
					})}
					<div
						style={{
							height: "0.5px",
							background: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_TITLEBAR_INACTIVE_FOREGROUND),
							margin: "15px 0",
							opacity: 0.2,
						}}
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
							marginTop: "10px",
							marginBottom: "8px",
							color: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_FOREGROUND),
						}}>
						<span style={{ flexShrink: 1, minWidth: 0 }}>Max Requests:</span>
						<react_1.VSCodeTextField
							// placeholder={DEFAULT_AUTO_APPROVAL_SETTINGS.maxRequests.toString()}
							value={autoApprovalSettings.maxRequests.toString()}
							onInput={function (e) {
								var input = e.target
								// Remove any non-numeric characters
								input.value = input.value.replace(/[^0-9]/g, "")
								var value = parseInt(input.value)
								if (!isNaN(value) && value > 0) {
									updateMaxRequests(value)
								}
							}}
							onKeyDown={function (e) {
								// Prevent non-numeric keys (except for backspace, delete, arrows)
								if (!/^\d$/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)) {
									e.preventDefault()
								}
							}}
							style={{ flex: 1 }}
						/>
					</div>
					<div
						style={{
							color: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_DESCRIPTION_FOREGROUND),
							fontSize: "12px",
							marginBottom: "10px",
						}}>
						Cline will automatically make this many API requests before asking for approval to proceed with the task.
					</div>
					<div style={{ margin: "6px 0" }}>
						<react_1.VSCodeCheckbox
							checked={autoApprovalSettings.enableNotifications}
							onChange={function (e) {
								var checked = e.target.checked
								updateNotifications(checked)
							}}>
							Enable Notifications
						</react_1.VSCodeCheckbox>
						<div
							style={{
								marginLeft: "28px",
								color: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_DESCRIPTION_FOREGROUND),
								fontSize: "12px",
							}}>
							Receive system notifications when Cline requires approval to proceed or when a task is completed.
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
var CollapsibleSection = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 4px;\n\tcolor: ",
				";\n\tflex: 1;\n\tmin-width: 0;\n\n\t&:hover {\n\t\tcolor: ",
				";\n\t}\n",
			],
			[
				"\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 4px;\n\tcolor: ",
				";\n\tflex: 1;\n\tmin-width: 0;\n\n\t&:hover {\n\t\tcolor: ",
				";\n\t}\n",
			],
		)),
	function (props) {
		return props.isHovered
			? (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_FOREGROUND)
			: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_DESCRIPTION_FOREGROUND)
	},
	(0, vscStyles_1.getAsVar)(vscStyles_1.VSC_FOREGROUND),
)
exports.default = AutoApproveMenu
var templateObject_1
