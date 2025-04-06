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
exports.CheckpointControls = exports.CheckpointOverlay = void 0
var react_1 = require("@vscode/webview-ui-toolkit/react")
var react_2 = require("react")
var react_use_1 = require("react-use")
var styled_components_1 = require("styled-components")
var vscode_1 = require("@/utils/vscode")
var CodeBlock_1 = require("@/components/common/CodeBlock")
var CheckpointOverlay = function (_a) {
	var messageTs = _a.messageTs
	var _b = (0, react_2.useState)(false),
		compareDisabled = _b[0],
		setCompareDisabled = _b[1]
	var _c = (0, react_2.useState)(false),
		restoreTaskDisabled = _c[0],
		setRestoreTaskDisabled = _c[1]
	var _d = (0, react_2.useState)(false),
		restoreWorkspaceDisabled = _d[0],
		setRestoreWorkspaceDisabled = _d[1]
	var _e = (0, react_2.useState)(false),
		restoreBothDisabled = _e[0],
		setRestoreBothDisabled = _e[1]
	var _f = (0, react_2.useState)(false),
		showRestoreConfirm = _f[0],
		setShowRestoreConfirm = _f[1]
	var _g = (0, react_2.useState)(false),
		hasMouseEntered = _g[0],
		setHasMouseEntered = _g[1]
	var containerRef = (0, react_2.useRef)(null)
	var tooltipRef = (0, react_2.useRef)(null)
	;(0, react_use_1.useClickAway)(containerRef, function () {
		if (showRestoreConfirm) {
			setShowRestoreConfirm(false)
			setHasMouseEntered(false)
		}
	})
	var handleMessage = (0, react_2.useCallback)(function (event) {
		var message = event.data
		switch (message.type) {
			case "relinquishControl": {
				setCompareDisabled(false)
				setRestoreTaskDisabled(false)
				setRestoreWorkspaceDisabled(false)
				setRestoreBothDisabled(false)
				setShowRestoreConfirm(false)
				break
			}
		}
	}, [])
	;(0, react_use_1.useEvent)("message", handleMessage)
	var handleRestoreTask = function () {
		setRestoreTaskDisabled(true)
		vscode_1.vscode.postMessage({
			type: "checkpointRestore",
			number: messageTs,
			text: "task",
		})
	}
	var handleRestoreWorkspace = function () {
		setRestoreWorkspaceDisabled(true)
		vscode_1.vscode.postMessage({
			type: "checkpointRestore",
			number: messageTs,
			text: "workspace",
		})
	}
	var handleRestoreBoth = function () {
		setRestoreBothDisabled(true)
		vscode_1.vscode.postMessage({
			type: "checkpointRestore",
			number: messageTs,
			text: "taskAndWorkspace",
		})
	}
	var handleMouseEnter = function () {
		setHasMouseEntered(true)
	}
	var handleMouseLeave = function () {
		if (hasMouseEntered) {
			setShowRestoreConfirm(false)
			setHasMouseEntered(false)
		}
	}
	var handleControlsMouseLeave = function (e) {
		var tooltipElement = tooltipRef.current
		if (tooltipElement && showRestoreConfirm) {
			var tooltipRect = tooltipElement.getBoundingClientRect()
			// If mouse is moving towards the tooltip, don't close it
			if (
				e.clientY >= tooltipRect.top &&
				e.clientY <= tooltipRect.bottom &&
				e.clientX >= tooltipRect.left &&
				e.clientX <= tooltipRect.right
			) {
				return
			}
		}
		setShowRestoreConfirm(false)
		setHasMouseEntered(false)
	}
	return (
		<exports.CheckpointControls onMouseLeave={handleControlsMouseLeave}>
			<react_1.VSCodeButton
				title="Compare"
				appearance="secondary"
				disabled={compareDisabled}
				style={{ cursor: compareDisabled ? "wait" : "pointer" }}
				onClick={function () {
					setCompareDisabled(true)
					vscode_1.vscode.postMessage({
						type: "checkpointDiff",
						number: messageTs,
					})
				}}>
				<i className="codicon codicon-diff-multiple" style={{ position: "absolute" }} />
			</react_1.VSCodeButton>
			<div style={{ position: "relative" }} ref={containerRef}>
				<react_1.VSCodeButton
					title="Restore"
					appearance="secondary"
					style={{ cursor: "pointer" }}
					onClick={function () {
						return setShowRestoreConfirm(true)
					}}>
					<i className="codicon codicon-discard" style={{ position: "absolute" }} />
				</react_1.VSCodeButton>
				{showRestoreConfirm && (
					<RestoreConfirmTooltip ref={tooltipRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
						<RestoreOption>
							<react_1.VSCodeButton
								onClick={handleRestoreBoth}
								disabled={restoreBothDisabled}
								style={{
									cursor: restoreBothDisabled ? "wait" : "pointer",
								}}>
								Restore Task and Workspace
							</react_1.VSCodeButton>
							<p>Restores the task and your project's files back to a snapshot taken at this point</p>
						</RestoreOption>
						<RestoreOption>
							<react_1.VSCodeButton
								onClick={handleRestoreTask}
								disabled={restoreTaskDisabled}
								style={{
									cursor: restoreTaskDisabled ? "wait" : "pointer",
								}}>
								Restore Task Only
							</react_1.VSCodeButton>
							<p>Deletes messages after this point (does not affect workspace)</p>
						</RestoreOption>
						<RestoreOption>
							<react_1.VSCodeButton
								onClick={handleRestoreWorkspace}
								disabled={restoreWorkspaceDisabled}
								style={{
									cursor: restoreWorkspaceDisabled ? "wait" : "pointer",
								}}>
								Restore Workspace Only
							</react_1.VSCodeButton>
							<p>Restores your project's files to a snapshot taken at this point (task may become out of sync)</p>
						</RestoreOption>
					</RestoreConfirmTooltip>
				)}
			</div>
		</exports.CheckpointControls>
	)
}
exports.CheckpointOverlay = CheckpointOverlay
exports.CheckpointControls = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tposition: absolute;\n\ttop: 3px;\n\tright: 6px;\n\tdisplay: flex;\n\tgap: 6px;\n\topacity: 0;\n\tbackground-color: var(--vscode-sideBar-background);\n\tpadding: 3px 0 3px 3px;\n\n\t& > vscode-button,\n\t& > div > vscode-button {\n\t\twidth: 24px;\n\t\theight: 24px;\n\t\tposition: relative;\n\t}\n\n\t& > vscode-button i,\n\t& > div > vscode-button i {\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttop: 50%;\n\t\ttransform: translate(-50%, -50%);\n\t}\n",
			],
			[
				"\n\tposition: absolute;\n\ttop: 3px;\n\tright: 6px;\n\tdisplay: flex;\n\tgap: 6px;\n\topacity: 0;\n\tbackground-color: var(--vscode-sideBar-background);\n\tpadding: 3px 0 3px 3px;\n\n\t& > vscode-button,\n\t& > div > vscode-button {\n\t\twidth: 24px;\n\t\theight: 24px;\n\t\tposition: relative;\n\t}\n\n\t& > vscode-button i,\n\t& > div > vscode-button i {\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttop: 50%;\n\t\ttransform: translate(-50%, -50%);\n\t}\n",
			],
		)),
)
var RestoreOption = styled_components_1.default.div(
	templateObject_2 ||
		(templateObject_2 = __makeTemplateObject(
			[
				"\n\t&:not(:last-child) {\n\t\tmargin-bottom: 10px;\n\t\tpadding-bottom: 4px;\n\t\tborder-bottom: 1px solid var(--vscode-editorGroup-border);\n\t}\n\n\tp {\n\t\tmargin: 0 0 2px 0;\n\t\tcolor: var(--vscode-descriptionForeground);\n\t\tfont-size: 11px;\n\t\tline-height: 14px;\n\t}\n\n\t&:last-child p {\n\t\tmargin: 0 0 -2px 0;\n\t}\n\n\tvscode-button {\n\t\twidth: 100%;\n\t\tmargin-bottom: 10px;\n\t}\n",
			],
			[
				"\n\t&:not(:last-child) {\n\t\tmargin-bottom: 10px;\n\t\tpadding-bottom: 4px;\n\t\tborder-bottom: 1px solid var(--vscode-editorGroup-border);\n\t}\n\n\tp {\n\t\tmargin: 0 0 2px 0;\n\t\tcolor: var(--vscode-descriptionForeground);\n\t\tfont-size: 11px;\n\t\tline-height: 14px;\n\t}\n\n\t&:last-child p {\n\t\tmargin: 0 0 -2px 0;\n\t}\n\n\tvscode-button {\n\t\twidth: 100%;\n\t\tmargin-bottom: 10px;\n\t}\n",
			],
		)),
)
var RestoreConfirmTooltip = styled_components_1.default.div(
	templateObject_3 ||
		(templateObject_3 = __makeTemplateObject(
			[
				"\n\tposition: absolute;\n\ttop: calc(100% - 0.5px);\n\tright: 0;\n\tbackground: ",
				';\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tpadding: 12px;\n\tborder-radius: 3px;\n\tmargin-top: 8px;\n\twidth: calc(100vw - 57px);\n\tmin-width: 0px;\n\tmax-width: 100vw;\n\tz-index: 1000;\n\n\t// Add invisible padding to create a safe hover zone\n\t&::before {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\ttop: -8px; // Same as margin-top\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 8px;\n\t}\n\n\t// Adjust arrow to be above the padding\n\t&::after {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\ttop: -6px;\n\t\tright: 6px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tbackground: ',
				";\n\t\tborder-left: 1px solid var(--vscode-editorGroup-border);\n\t\tborder-top: 1px solid var(--vscode-editorGroup-border);\n\t\ttransform: rotate(45deg);\n\t\tz-index: 1; // Ensure arrow stays above the padding\n\t}\n\n\tp {\n\t\tmargin: 0 0 6px 0;\n\t\tcolor: var(--vscode-descriptionForeground);\n\t\tfont-size: 12px;\n\t\twhite-space: normal;\n\t\tword-wrap: break-word;\n\t}\n",
			],
			[
				"\n\tposition: absolute;\n\ttop: calc(100% - 0.5px);\n\tright: 0;\n\tbackground: ",
				';\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tpadding: 12px;\n\tborder-radius: 3px;\n\tmargin-top: 8px;\n\twidth: calc(100vw - 57px);\n\tmin-width: 0px;\n\tmax-width: 100vw;\n\tz-index: 1000;\n\n\t// Add invisible padding to create a safe hover zone\n\t&::before {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\ttop: -8px; // Same as margin-top\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 8px;\n\t}\n\n\t// Adjust arrow to be above the padding\n\t&::after {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\ttop: -6px;\n\t\tright: 6px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tbackground: ',
				";\n\t\tborder-left: 1px solid var(--vscode-editorGroup-border);\n\t\tborder-top: 1px solid var(--vscode-editorGroup-border);\n\t\ttransform: rotate(45deg);\n\t\tz-index: 1; // Ensure arrow stays above the padding\n\t}\n\n\tp {\n\t\tmargin: 0 0 6px 0;\n\t\tcolor: var(--vscode-descriptionForeground);\n\t\tfont-size: 12px;\n\t\twhite-space: normal;\n\t\tword-wrap: break-word;\n\t}\n",
			],
		)),
	CodeBlock_1.CODE_BLOCK_BG_COLOR,
	CodeBlock_1.CODE_BLOCK_BG_COLOR,
)
var templateObject_1, templateObject_2, templateObject_3
