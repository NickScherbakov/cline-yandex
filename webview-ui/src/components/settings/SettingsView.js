"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@vscode/webview-ui-toolkit/react");
var react_2 = require("react");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var validate_1 = require("@/utils/validate");
var vscode_1 = require("@/utils/vscode");
var SettingsButton_1 = require("@/components/common/SettingsButton");
var ApiOptions_1 = require("./ApiOptions");
var McpConfigurationView_1 = require("../mcp/configuration/McpConfigurationView");
var react_use_1 = require("react-use");
var IS_DEV = process.env.IS_DEV;
var SettingsView = function (_a) {
    var onDone = _a.onDone;
    var _b = (0, ExtensionStateContext_1.useExtensionState)(), apiConfiguration = _b.apiConfiguration, version = _b.version, customInstructions = _b.customInstructions, setCustomInstructions = _b.setCustomInstructions, openRouterModels = _b.openRouterModels, telemetrySetting = _b.telemetrySetting, setTelemetrySetting = _b.setTelemetrySetting, chatSettings = _b.chatSettings, planActSeparateModelsSetting = _b.planActSeparateModelsSetting, setPlanActSeparateModelsSetting = _b.setPlanActSeparateModelsSetting;
    var _c = (0, react_2.useState)(undefined), apiErrorMessage = _c[0], setApiErrorMessage = _c[1];
    var _d = (0, react_2.useState)(undefined), modelIdErrorMessage = _d[0], setModelIdErrorMessage = _d[1];
    var _e = (0, react_2.useState)(null), pendingTabChange = _e[0], setPendingTabChange = _e[1];
    var handleSubmit = function (withoutDone) {
        if (withoutDone === void 0) { withoutDone = false; }
        var apiValidationResult = (0, validate_1.validateApiConfiguration)(apiConfiguration);
        var modelIdValidationResult = (0, validate_1.validateModelId)(apiConfiguration, openRouterModels);
        // setApiErrorMessage(apiValidationResult)
        // setModelIdErrorMessage(modelIdValidationResult)
        var apiConfigurationToSubmit = apiConfiguration;
        if (!apiValidationResult && !modelIdValidationResult) {
            // vscode.postMessage({ type: "apiConfiguration", apiConfiguration })
            // vscode.postMessage({
            // 	type: "customInstructions",
            // 	text: customInstructions,
            // })
            // vscode.postMessage({
            // 	type: "telemetrySetting",
            // 	text: telemetrySetting,
            // })
            // console.log("handleSubmit", withoutDone)
            // vscode.postMessage({
            // 	type: "separateModeSetting",
            // 	text: separateModeSetting,
            // })
        }
        else {
            // if the api configuration is invalid, we don't save it
            apiConfigurationToSubmit = undefined;
        }
        vscode_1.vscode.postMessage({
            type: "updateSettings",
            planActSeparateModelsSetting: planActSeparateModelsSetting,
            customInstructionsSetting: customInstructions,
            telemetrySetting: telemetrySetting,
            apiConfiguration: apiConfigurationToSubmit,
        });
        if (!withoutDone) {
            onDone();
        }
    };
    (0, react_2.useEffect)(function () {
        setApiErrorMessage(undefined);
        setModelIdErrorMessage(undefined);
    }, [apiConfiguration]);
    // validate as soon as the component is mounted
    /*
    useEffect will use stale values of variables if they are not included in the dependency array.
    so trying to use useEffect with a dependency array of only one value for example will use any
    other variables' old values. In most cases you don't want this, and should opt to use react-use
    hooks.
    
        // uses someVar and anotherVar
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [someVar])
    If we only want to run code once on mount we can use react-use's useEffectOnce or useMount
    */
    var handleMessage = (0, react_2.useCallback)(function (event) {
        var message = event.data;
        switch (message.type) {
            case "didUpdateSettings":
                if (pendingTabChange) {
                    vscode_1.vscode.postMessage({
                        type: "togglePlanActMode",
                        chatSettings: {
                            mode: pendingTabChange,
                        },
                    });
                    setPendingTabChange(null);
                }
                break;
        }
    }, [pendingTabChange]);
    (0, react_use_1.useEvent)("message", handleMessage);
    var handleResetState = function () {
        vscode_1.vscode.postMessage({ type: "resetState" });
    };
    var handleTabChange = function (tab) {
        if (tab === chatSettings.mode) {
            return;
        }
        setPendingTabChange(tab);
        handleSubmit(true);
    };
    return (<div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: "10px 0px 0px 20px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }}>
			<div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "13px",
            paddingRight: 17,
        }}>
				<h3 style={{ color: "var(--vscode-foreground)", margin: 0 }}>Settings</h3>
				<react_1.VSCodeButton onClick={function () { return handleSubmit(false); }}>Done</react_1.VSCodeButton>
			</div>
			<div style={{
            flexGrow: 1,
            overflowY: "scroll",
            paddingRight: 8,
            display: "flex",
            flexDirection: "column",
        }}>
				{/* Tabs container */}
				{planActSeparateModelsSetting ? (<div style={{
                border: "1px solid var(--vscode-panel-border)",
                borderRadius: "4px",
                padding: "10px",
                marginBottom: "20px",
                background: "var(--vscode-panel-background)",
            }}>
						<div style={{
                display: "flex",
                gap: "1px",
                marginBottom: "10px",
                marginTop: -8,
                borderBottom: "1px solid var(--vscode-panel-border)",
            }}>
							<McpConfigurationView_1.TabButton isActive={chatSettings.mode === "plan"} onClick={function () { return handleTabChange("plan"); }}>
								Plan Mode
							</McpConfigurationView_1.TabButton>
							<McpConfigurationView_1.TabButton isActive={chatSettings.mode === "act"} onClick={function () { return handleTabChange("act"); }}>
								Act Mode
							</McpConfigurationView_1.TabButton>
						</div>

						{/* Content container */}
						<div style={{ marginBottom: -12 }}>
							<ApiOptions_1.default key={chatSettings.mode} showModelOptions={true} apiErrorMessage={apiErrorMessage} modelIdErrorMessage={modelIdErrorMessage}/>
						</div>
					</div>) : (<ApiOptions_1.default key={"single"} showModelOptions={true} apiErrorMessage={apiErrorMessage} modelIdErrorMessage={modelIdErrorMessage}/>)}

				<div style={{ marginBottom: 5 }}>
					<react_1.VSCodeTextArea value={customInstructions !== null && customInstructions !== void 0 ? customInstructions : ""} style={{ width: "100%" }} resize="vertical" rows={4} placeholder={'e.g. "Run unit tests at the end", "Use TypeScript with async/await", "Speak in Spanish"'} onInput={function (e) { var _a, _b; return setCustomInstructions((_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : ""); }}>
						<span style={{ fontWeight: "500" }}>Custom Instructions</span>
					</react_1.VSCodeTextArea>
					<p style={{
            fontSize: "12px",
            marginTop: "5px",
            color: "var(--vscode-descriptionForeground)",
        }}>
						These instructions are added to the end of the system prompt sent with every request.
					</p>
				</div>

				<div style={{ marginBottom: 5 }}>
					<react_1.VSCodeCheckbox style={{ marginBottom: "5px" }} checked={planActSeparateModelsSetting} onChange={function (e) {
            var checked = e.target.checked === true;
            setPlanActSeparateModelsSetting(checked);
        }}>
						Use different models for Plan and Act modes
					</react_1.VSCodeCheckbox>
					<p style={{
            fontSize: "12px",
            marginTop: "5px",
            color: "var(--vscode-descriptionForeground)",
        }}>
						Switching between Plan and Act mode will persist the API and model used in the previous mode. This may be
						helpful e.g. when using a strong reasoning model to architect a plan for a cheaper coding model to act on.
					</p>
				</div>

				<div style={{ marginBottom: 5 }}>
					<react_1.VSCodeCheckbox style={{ marginBottom: "5px" }} checked={telemetrySetting === "enabled"} onChange={function (e) {
            var checked = e.target.checked === true;
            setTelemetrySetting(checked ? "enabled" : "disabled");
        }}>
						Allow anonymous error and usage reporting
					</react_1.VSCodeCheckbox>
					<p style={{
            fontSize: "12px",
            marginTop: "5px",
            color: "var(--vscode-descriptionForeground)",
        }}>
						Help improve Cline by sending anonymous usage data and error reports. No code, prompts, or personal
						information are ever sent. See our{" "}
						<react_1.VSCodeLink href="https://docs.cline.bot/more-info/telemetry" style={{ fontSize: "inherit" }}>
							telemetry overview
						</react_1.VSCodeLink>{" "}
						and{" "}
						<react_1.VSCodeLink href="https://cline.bot/privacy" style={{ fontSize: "inherit" }}>
							privacy policy
						</react_1.VSCodeLink>{" "}
						for more details.
					</p>
				</div>

				{IS_DEV && (<>
						<div style={{ marginTop: "10px", marginBottom: "4px" }}>Debug</div>
						<react_1.VSCodeButton onClick={handleResetState} style={{ marginTop: "5px", width: "auto" }}>
							Reset State
						</react_1.VSCodeButton>
						<p style={{
                fontSize: "12px",
                marginTop: "5px",
                color: "var(--vscode-descriptionForeground)",
            }}>
							This will reset all global state and secret storage in the extension.
						</p>
					</>)}

				<div style={{
            marginTop: "auto",
            paddingRight: 8,
            display: "flex",
            justifyContent: "center",
        }}>
					<SettingsButton_1.default onClick={function () { return vscode_1.vscode.postMessage({ type: "openExtensionSettings" }); }} style={{
            margin: "0 0 16px 0",
        }}>
						<i className="codicon codicon-settings-gear"/>
						Advanced Settings
					</SettingsButton_1.default>
				</div>
				<div style={{
            textAlign: "center",
            color: "var(--vscode-descriptionForeground)",
            fontSize: "12px",
            lineHeight: "1.2",
            padding: "0 8px 15px 0",
        }}>
					<p style={{
            wordWrap: "break-word",
            margin: 0,
            padding: 0,
        }}>
						If you have any questions or feedback, feel free to open an issue at{" "}
						<react_1.VSCodeLink href="https://github.com/cline/cline" style={{ display: "inline" }}>
							https://github.com/cline/cline
						</react_1.VSCodeLink>
					</p>
					<p style={{
            fontStyle: "italic",
            margin: "10px 0 0 0",
            padding: 0,
        }}>
						v{version}
					</p>
				</div>
			</div>
		</div>);
};
exports.default = (0, react_2.memo)(SettingsView);
