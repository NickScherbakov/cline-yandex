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
exports.BrowserSettingsMenu = void 0
var react_1 = require("@vscode/webview-ui-toolkit/react")
var react_2 = require("react")
var react_use_1 = require("react-use")
var styled_components_1 = require("styled-components")
var BrowserSettings_1 = require("@shared/BrowserSettings")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var vscode_1 = require("@/utils/vscode")
var CodeBlock_1 = require("../common/CodeBlock")
var BrowserSettingsMenu = function (_a) {
	var _b
	var _c = _a.disabled,
		disabled = _c === void 0 ? false : _c,
		maxWidth = _a.maxWidth
	var browserSettings = (0, ExtensionStateContext_1.useExtensionState)().browserSettings
	var _d = (0, react_2.useState)(false),
		showMenu = _d[0],
		setShowMenu = _d[1]
	var _e = (0, react_2.useState)(false),
		hasMouseEntered = _e[0],
		setHasMouseEntered = _e[1]
	var containerRef = (0, react_2.useRef)(null)
	var menuRef = (0, react_2.useRef)(null)
	;(0, react_use_1.useClickAway)(containerRef, function () {
		if (showMenu) {
			setShowMenu(false)
			setHasMouseEntered(false)
		}
	})
	var handleMouseEnter = function () {
		setHasMouseEntered(true)
	}
	var handleMouseLeave = function () {
		if (hasMouseEntered) {
			setShowMenu(false)
			setHasMouseEntered(false)
		}
	}
	var handleControlsMouseLeave = function (e) {
		var menuElement = menuRef.current
		if (menuElement && showMenu) {
			var menuRect = menuElement.getBoundingClientRect()
			// If mouse is moving towards the menu, don't close it
			if (
				e.clientY >= menuRect.top &&
				e.clientY <= menuRect.bottom &&
				e.clientX >= menuRect.left &&
				e.clientX <= menuRect.right
			) {
				return
			}
		}
		setShowMenu(false)
		setHasMouseEntered(false)
	}
	var handleViewportChange = function (event) {
		var target = event.target
		var selectedSize = BrowserSettings_1.BROWSER_VIEWPORT_PRESETS[target.value]
		if (selectedSize) {
			vscode_1.vscode.postMessage({
				type: "browserSettings",
				browserSettings: __assign(__assign({}, browserSettings), { viewport: selectedSize }),
			})
		}
	}
	var updateHeadless = function (headless) {
		vscode_1.vscode.postMessage({
			type: "browserSettings",
			browserSettings: __assign(__assign({}, browserSettings), { headless: headless }),
		})
	}
	// const updateChromeType = (chromeType: BrowserSettings["chromeType"]) => {
	// 	vscode.postMessage({
	// 		type: "browserSettings",
	// 		browserSettings: {
	// 			...browserSettings,
	// 			chromeType,
	// 		},
	// 	})
	// }
	// const relaunchChromeDebugMode = () => {
	// 	vscode.postMessage({
	// 		type: "relaunchChromeDebugMode",
	// 	})
	// }
	return (
		<div ref={containerRef} style={{ position: "relative", marginTop: "-1px" }} onMouseLeave={handleControlsMouseLeave}>
			<react_1.VSCodeButton
				appearance="icon"
				onClick={function () {
					return setShowMenu(!showMenu)
				}}
				disabled={disabled}>
				<i className="codicon codicon-settings-gear" style={{ fontSize: "14.5px" }} />
			</react_1.VSCodeButton>
			{showMenu && (
				<SettingsMenu ref={menuRef} maxWidth={maxWidth} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<SettingsGroup>
						{/* <SettingsHeader>Headless Mode</SettingsHeader> */}
						<react_1.VSCodeCheckbox
							style={{ marginBottom: "8px", marginTop: -1 }}
							checked={browserSettings.headless}
							onChange={function (e) {
								return updateHeadless(e.target.checked)
							}}>
							Run in headless mode
						</react_1.VSCodeCheckbox>
						<SettingsDescription>When enabled, Chrome will run in the background.</SettingsDescription>
					</SettingsGroup>

					{/* <SettingsGroup>
                <SettingsHeader>Chrome Executable</SettingsHeader>
                <VSCodeDropdown
                    style={{ width: "100%", marginBottom: "8px" }}
                    value={browserSettings.chromeType}
                    onChange={(e) =>
                        updateChromeType((e.target as HTMLSelectElement).value as BrowserSettings["chromeType"])
                    }>
                    <VSCodeOption value="chromium">Chromium (Auto-downloaded)</VSCodeOption>
                    <VSCodeOption value="system">System Chrome</VSCodeOption>
                </VSCodeDropdown>
                <SettingsDescription>
                    {browserSettings.chromeType === "system" ? (
                        <>
                            Cline will use your personal browser. You must{" "}
                            <VSCodeLink
                                href="#"
                                style={{ fontSize: "inherit" }}
                                onClick={(e: React.MouseEvent) => {
                                    e.preventDefault()
                                    relaunchChromeDebugMode()
                                }}>
                                relaunch Chrome in debug mode
                            </VSCodeLink>{" "}
                            to use this setting.
                        </>
                    ) : (
                        "Cline will use a Chromium browser bundled with the extension."
                    )}
                </SettingsDescription>
            </SettingsGroup> */}

					<SettingsGroup>
						<SettingsHeader>Viewport Size</SettingsHeader>
						<react_1.VSCodeDropdown
							style={{ width: "100%" }}
							value={
								(_b = Object.entries(BrowserSettings_1.BROWSER_VIEWPORT_PRESETS).find(function (_a) {
									var _ = _a[0],
										size = _a[1]
									return (
										size.width === browserSettings.viewport.width &&
										size.height === browserSettings.viewport.height
									)
								})) === null || _b === void 0
									? void 0
									: _b[0]
							}
							onChange={function (event) {
								return handleViewportChange(event)
							}}>
							{Object.entries(BrowserSettings_1.BROWSER_VIEWPORT_PRESETS).map(function (_a) {
								var name = _a[0]
								return (
									<react_1.VSCodeOption key={name} value={name}>
										{name}
									</react_1.VSCodeOption>
								)
							})}
						</react_1.VSCodeDropdown>
					</SettingsGroup>
				</SettingsMenu>
			)}
		</div>
	)
}
exports.BrowserSettingsMenu = BrowserSettingsMenu
var SettingsMenu = styled_components_1.default.div(
	templateObject_1 ||
		(templateObject_1 = __makeTemplateObject(
			[
				"\n\tposition: absolute;\n\ttop: calc(100% + 8px);\n\tright: -2px;\n\tbackground: ",
				";\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tpadding: 8px;\n\tborder-radius: 3px;\n\tz-index: 1000;\n\twidth: calc(100vw - 57px);\n\tmin-width: 0px;\n\tmax-width: ",
				';\n\n\t// Add invisible padding to create a safe hover zone\n\t&::before {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\ttop: -14px; // Same as margin-top in the parent\'s top property\n\t\tleft: 0;\n\t\tright: -6px;\n\t\theight: 14px;\n\t}\n\n\t&::after {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\ttop: -6px;\n\t\tright: 6px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tbackground: ',
				";\n\t\tborder-left: 1px solid var(--vscode-editorGroup-border);\n\t\tborder-top: 1px solid var(--vscode-editorGroup-border);\n\t\ttransform: rotate(45deg);\n\t\tz-index: 1; // Ensure arrow stays above the padding\n\t}\n",
			],
			[
				"\n\tposition: absolute;\n\ttop: calc(100% + 8px);\n\tright: -2px;\n\tbackground: ",
				";\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tpadding: 8px;\n\tborder-radius: 3px;\n\tz-index: 1000;\n\twidth: calc(100vw - 57px);\n\tmin-width: 0px;\n\tmax-width: ",
				';\n\n\t// Add invisible padding to create a safe hover zone\n\t&::before {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\ttop: -14px; // Same as margin-top in the parent\'s top property\n\t\tleft: 0;\n\t\tright: -6px;\n\t\theight: 14px;\n\t}\n\n\t&::after {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t\ttop: -6px;\n\t\tright: 6px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tbackground: ',
				";\n\t\tborder-left: 1px solid var(--vscode-editorGroup-border);\n\t\tborder-top: 1px solid var(--vscode-editorGroup-border);\n\t\ttransform: rotate(45deg);\n\t\tz-index: 1; // Ensure arrow stays above the padding\n\t}\n",
			],
		)),
	CodeBlock_1.CODE_BLOCK_BG_COLOR,
	function (props) {
		return props.maxWidth ? "".concat(props.maxWidth - 23, "px") : "100vw"
	},
	CodeBlock_1.CODE_BLOCK_BG_COLOR,
)
var SettingsGroup = styled_components_1.default.div(
	templateObject_2 ||
		(templateObject_2 = __makeTemplateObject(
			[
				"\n\t&:not(:last-child) {\n\t\tmargin-bottom: 8px;\n\t\t// padding-bottom: 8px;\n\t\tborder-bottom: 1px solid var(--vscode-editorGroup-border);\n\t}\n",
			],
			[
				"\n\t&:not(:last-child) {\n\t\tmargin-bottom: 8px;\n\t\t// padding-bottom: 8px;\n\t\tborder-bottom: 1px solid var(--vscode-editorGroup-border);\n\t}\n",
			],
		)),
)
var SettingsHeader = styled_components_1.default.div(
	templateObject_3 ||
		(templateObject_3 = __makeTemplateObject(
			["\n\tfont-size: 11px;\n\tfont-weight: 600;\n\tmargin-bottom: 6px;\n\tcolor: var(--vscode-foreground);\n"],
			["\n\tfont-size: 11px;\n\tfont-weight: 600;\n\tmargin-bottom: 6px;\n\tcolor: var(--vscode-foreground);\n"],
		)),
)
var SettingsDescription = styled_components_1.default.div(
	templateObject_4 ||
		(templateObject_4 = __makeTemplateObject(
			["\n\tfont-size: 11px;\n\tcolor: var(--vscode-descriptionForeground);\n\tmargin-bottom: ", ";\n"],
			["\n\tfont-size: 11px;\n\tcolor: var(--vscode-descriptionForeground);\n\tmargin-bottom: ", ";\n"],
		)),
	function (props) {
		return props.isLast ? "0" : "8px"
	},
)
exports.default = exports.BrowserSettingsMenu
var templateObject_1, templateObject_2, templateObject_3, templateObject_4
