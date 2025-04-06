"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_use_1 = require("react-use");
var ChatView_1 = require("./components/chat/ChatView");
var HistoryView_1 = require("./components/history/HistoryView");
var SettingsView_1 = require("./components/settings/SettingsView");
var WelcomeView_1 = require("./components/welcome/WelcomeView");
var AccountView_1 = require("./components/account/AccountView");
var ExtensionStateContext_1 = require("./context/ExtensionStateContext");
var FirebaseAuthContext_1 = require("./context/FirebaseAuthContext");
var vscode_1 = require("./utils/vscode");
var McpConfigurationView_1 = require("./components/mcp/configuration/McpConfigurationView");
var AppContent = function () {
    var _a = (0, ExtensionStateContext_1.useExtensionState)(), didHydrateState = _a.didHydrateState, showWelcome = _a.showWelcome, shouldShowAnnouncement = _a.shouldShowAnnouncement, telemetrySetting = _a.telemetrySetting, vscMachineId = _a.vscMachineId;
    var _b = (0, react_1.useState)(false), showSettings = _b[0], setShowSettings = _b[1];
    var _c = (0, react_1.useState)(false), showHistory = _c[0], setShowHistory = _c[1];
    var _d = (0, react_1.useState)(false), showMcp = _d[0], setShowMcp = _d[1];
    var _e = (0, react_1.useState)(false), showAccount = _e[0], setShowAccount = _e[1];
    var _f = (0, react_1.useState)(false), showAnnouncement = _f[0], setShowAnnouncement = _f[1];
    var handleMessage = (0, react_1.useCallback)(function (e) {
        var message = e.data;
        switch (message.type) {
            case "action":
                switch (message.action) {
                    case "settingsButtonClicked":
                        setShowSettings(true);
                        setShowHistory(false);
                        setShowMcp(false);
                        setShowAccount(false);
                        break;
                    case "historyButtonClicked":
                        setShowSettings(false);
                        setShowHistory(true);
                        setShowMcp(false);
                        setShowAccount(false);
                        break;
                    case "mcpButtonClicked":
                        setShowSettings(false);
                        setShowHistory(false);
                        setShowMcp(true);
                        setShowAccount(false);
                        break;
                    case "accountButtonClicked":
                        setShowSettings(false);
                        setShowHistory(false);
                        setShowMcp(false);
                        setShowAccount(true);
                        break;
                    case "chatButtonClicked":
                        setShowSettings(false);
                        setShowHistory(false);
                        setShowMcp(false);
                        setShowAccount(false);
                        break;
                }
                break;
        }
    }, []);
    (0, react_use_1.useEvent)("message", handleMessage);
    // useEffect(() => {
    // 	if (telemetrySetting === "enabled") {
    // 		posthog.identify(vscMachineId)
    // 		posthog.opt_in_capturing()
    // 	} else {
    // 		posthog.opt_out_capturing()
    // 	}
    // }, [telemetrySetting, vscMachineId])
    (0, react_1.useEffect)(function () {
        if (shouldShowAnnouncement) {
            setShowAnnouncement(true);
            vscode_1.vscode.postMessage({ type: "didShowAnnouncement" });
        }
    }, [shouldShowAnnouncement]);
    if (!didHydrateState) {
        return null;
    }
    return (<>
			{showWelcome ? (<WelcomeView_1.default />) : (<>
					{showSettings && <SettingsView_1.default onDone={function () { return setShowSettings(false); }}/>}
					{showHistory && <HistoryView_1.default onDone={function () { return setShowHistory(false); }}/>}
					{showMcp && <McpConfigurationView_1.default onDone={function () { return setShowMcp(false); }}/>}
					{showAccount && <AccountView_1.default onDone={function () { return setShowAccount(false); }}/>}
					{/* Do not conditionally load ChatView, it's expensive and there's state we don't want to lose (user input, disableInput, askResponse promise, etc.) */}
					<ChatView_1.default showHistoryView={function () {
                setShowSettings(false);
                setShowMcp(false);
                setShowAccount(false);
                setShowHistory(true);
            }} isHidden={showSettings || showHistory || showMcp || showAccount} showAnnouncement={showAnnouncement} hideAnnouncement={function () {
                setShowAnnouncement(false);
            }}/>
				</>)}
		</>);
};
var App = function () {
    return (<ExtensionStateContext_1.ExtensionStateContextProvider>
			<FirebaseAuthContext_1.FirebaseAuthProvider>
				<AppContent />
			</FirebaseAuthContext_1.FirebaseAuthProvider>
		</ExtensionStateContext_1.ExtensionStateContextProvider>);
};
exports.default = App;
