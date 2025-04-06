"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabButton = void 0;
var react_1 = require("@vscode/webview-ui-toolkit/react");
var react_2 = require("react");
var styled_components_1 = require("styled-components");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var vscode_1 = require("@/utils/vscode");
var AddRemoteServerForm_1 = require("./tabs/add-server/AddRemoteServerForm");
var McpMarketplaceView_1 = require("./tabs/marketplace/McpMarketplaceView");
var InstalledServersView_1 = require("./tabs/installed/InstalledServersView");
var McpConfigurationView = function (_a) {
    var onDone = _a.onDone;
    var mcpMarketplaceEnabled = (0, ExtensionStateContext_1.useExtensionState)().mcpMarketplaceEnabled;
    var _b = (0, react_2.useState)(mcpMarketplaceEnabled ? "marketplace" : "installed"), activeTab = _b[0], setActiveTab = _b[1];
    var handleTabChange = function (tab) {
        setActiveTab(tab);
    };
    (0, react_2.useEffect)(function () {
        if (!mcpMarketplaceEnabled && activeTab === "marketplace") {
            // If marketplace is disabled and we're on marketplace tab, switch to installed
            setActiveTab("installed");
        }
    }, [mcpMarketplaceEnabled, activeTab]);
    (0, react_2.useEffect)(function () {
        if (mcpMarketplaceEnabled) {
            vscode_1.vscode.postMessage({ type: "silentlyRefreshMcpMarketplace" });
            vscode_1.vscode.postMessage({ type: "fetchLatestMcpServersFromHub" });
        }
    }, [mcpMarketplaceEnabled]);
    return (<div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
        }}>
			<div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 17px 5px 20px",
        }}>
				<h3 style={{ color: "var(--vscode-foreground)", margin: 0 }}>MCP Servers</h3>
				<react_1.VSCodeButton onClick={onDone}>Done</react_1.VSCodeButton>
			</div>

			<div style={{ flex: 1, overflow: "auto" }}>
				{/* Tabs container */}
				<div style={{
            display: "flex",
            gap: "1px",
            padding: "0 20px 0 20px",
            borderBottom: "1px solid var(--vscode-panel-border)",
        }}>
					{mcpMarketplaceEnabled && (<exports.TabButton isActive={activeTab === "marketplace"} onClick={function () { return handleTabChange("marketplace"); }}>
							Marketplace
						</exports.TabButton>)}
					<exports.TabButton isActive={activeTab === "addRemote"} onClick={function () { return handleTabChange("addRemote"); }}>
						Remote Servers
					</exports.TabButton>
					<exports.TabButton isActive={activeTab === "installed"} onClick={function () { return handleTabChange("installed"); }}>
						Installed
					</exports.TabButton>
				</div>

				{/* Content container */}
				<div style={{ width: "100%" }}>
					{mcpMarketplaceEnabled && activeTab === "marketplace" && <McpMarketplaceView_1.default />}
					{activeTab === "addRemote" && <AddRemoteServerForm_1.default onServerAdded={function () { return handleTabChange("installed"); }}/>}
					{activeTab === "installed" && <InstalledServersView_1.default />}
				</div>
			</div>
		</div>);
};
var StyledTabButton = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tbackground: none;\n\tborder: none;\n\tborder-bottom: 2px solid ", ";\n\tcolor: ", ";\n\tpadding: 8px 16px;\n\tcursor: pointer;\n\tfont-size: 13px;\n\tmargin-bottom: -1px;\n\tfont-family: inherit;\n\n\t&:hover {\n\t\tcolor: var(--vscode-foreground);\n\t}\n"], ["\n\tbackground: none;\n\tborder: none;\n\tborder-bottom: 2px solid ", ";\n\tcolor: ", ";\n\tpadding: 8px 16px;\n\tcursor: pointer;\n\tfont-size: 13px;\n\tmargin-bottom: -1px;\n\tfont-family: inherit;\n\n\t&:hover {\n\t\tcolor: var(--vscode-foreground);\n\t}\n"])), function (props) { return (props.isActive ? "var(--vscode-foreground)" : "transparent"); }, function (props) { return (props.isActive ? "var(--vscode-foreground)" : "var(--vscode-descriptionForeground)"); });
var TabButton = function (_a) {
    var children = _a.children, isActive = _a.isActive, onClick = _a.onClick;
    return (<StyledTabButton isActive={isActive} onClick={onClick}>
		{children}
	</StyledTabButton>);
};
exports.TabButton = TabButton;
exports.default = McpConfigurationView;
var templateObject_1;
