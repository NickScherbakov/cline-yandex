"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var mcp_1 = require("@shared/mcp");
var react_1 = require("react");
var vscode_1 = require("@/utils/vscode");
var react_2 = require("@vscode/webview-ui-toolkit/react");
var mcp_2 = require("@/utils/mcp");
var DangerButton_1 = require("@/components/common/DangerButton");
var McpToolRow_1 = require("./McpToolRow");
var McpResourceRow_1 = require("./McpResourceRow");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var ServerRow = function (_a) {
    var _b;
    var server = _a.server, _c = _a.isExpandable, isExpandable = _c === void 0 ? true : _c;
    var _d = (0, ExtensionStateContext_1.useExtensionState)(), mcpMarketplaceCatalog = _d.mcpMarketplaceCatalog, autoApprovalSettings = _d.autoApprovalSettings;
    var _e = (0, react_1.useState)(false), isExpanded = _e[0], setIsExpanded = _e[1];
    var _f = (0, react_1.useState)(false), isDeleting = _f[0], setIsDeleting = _f[1];
    var getStatusColor = function () {
        switch (server.status) {
            case "connected":
                return "var(--vscode-testing-iconPassed)";
            case "connecting":
                return "var(--vscode-charts-yellow)";
            case "disconnected":
                return "var(--vscode-testing-iconFailed)";
        }
    };
    var handleRowClick = function () {
        if (!server.error && isExpandable) {
            setIsExpanded(!isExpanded);
        }
    };
    var _g = (0, react_1.useState)(function () {
        var _a;
        try {
            var config = JSON.parse(server.config);
            return ((_a = config.timeout) === null || _a === void 0 ? void 0 : _a.toString()) || mcp_1.DEFAULT_MCP_TIMEOUT_SECONDS.toString();
        }
        catch (_b) {
            return mcp_1.DEFAULT_MCP_TIMEOUT_SECONDS.toString();
        }
    }), timeoutValue = _g[0], setTimeoutValue = _g[1];
    var timeoutOptions = [
        { value: "30", label: "30 seconds" },
        { value: "60", label: "1 minute" },
        { value: "300", label: "5 minutes" },
        { value: "600", label: "10 minutes" },
        { value: "1800", label: "30 minutes" },
        { value: "3600", label: "1 hour" },
    ];
    var handleTimeoutChange = function (e) {
        var select = e.target;
        var value = select.value;
        var num = parseInt(value);
        setTimeoutValue(value);
        vscode_1.vscode.postMessage({
            type: "updateMcpTimeout",
            serverName: server.name,
            timeout: num,
        });
    };
    var handleRestart = function () {
        vscode_1.vscode.postMessage({
            type: "restartMcpServer",
            text: server.name,
        });
    };
    var handleDelete = function () {
        setIsDeleting(true);
        vscode_1.vscode.postMessage({
            type: "deleteMcpServer",
            serverName: server.name,
        });
    };
    var handleAutoApproveChange = function () {
        var _a, _b;
        if (!server.name)
            return;
        vscode_1.vscode.postMessage({
            type: "toggleToolAutoApprove",
            serverName: server.name,
            toolNames: ((_a = server.tools) === null || _a === void 0 ? void 0 : _a.map(function (tool) { return tool.name; })) || [],
            autoApprove: !((_b = server.tools) === null || _b === void 0 ? void 0 : _b.every(function (tool) { return tool.autoApprove; })),
        });
    };
    return (<div style={{ marginBottom: "10px" }}>
			<div style={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            background: "var(--vscode-textCodeBlock-background)",
            cursor: server.error ? "default" : isExpandable ? "pointer" : "default",
            borderRadius: isExpanded || server.error ? "4px 4px 0 0" : "4px",
            opacity: server.disabled ? 0.6 : 1,
        }} onClick={handleRowClick}>
				{!server.error && isExpandable && (<span className={"codicon codicon-chevron-".concat(isExpanded ? "down" : "right")} style={{ marginRight: "8px" }}/>)}
				<span style={{
            flex: 1,
            overflow: "hidden",
            wordBreak: "break-all",
            whiteSpace: "normal",
            display: "flex",
            alignItems: "center",
            marginRight: "4px",
        }}>
					{(0, mcp_2.getMcpServerDisplayName)(server.name, mcpMarketplaceCatalog)}
				</span>
				{/* Collapsed view controls */}
				{!server.error && (<div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "8px" }}>
						<react_2.VSCodeButton appearance="icon" title="Restart Server" onClick={function (e) {
                e.stopPropagation();
                handleRestart();
            }} disabled={server.status === "connecting"}>
							<span className="codicon codicon-sync"></span>
						</react_2.VSCodeButton>
						<react_2.VSCodeButton appearance="icon" title="Delete Server" onClick={function (e) {
                e.stopPropagation();
                handleDelete();
            }} disabled={isDeleting}>
							<span className="codicon codicon-trash"></span>
						</react_2.VSCodeButton>
					</div>)}
				{/* Toggle Switch */}
				<div style={{ display: "flex", alignItems: "center", marginLeft: "8px" }} onClick={function (e) { return e.stopPropagation(); }}>
					<div role="switch" aria-checked={!server.disabled} tabIndex={0} style={{
            width: "20px",
            height: "10px",
            backgroundColor: server.disabled
                ? "var(--vscode-titleBar-inactiveForeground)"
                : "var(--vscode-testing-iconPassed)",
            borderRadius: "5px",
            position: "relative",
            cursor: "pointer",
            transition: "background-color 0.2s",
            opacity: server.disabled ? 0.5 : 0.9,
        }} onClick={function () {
            vscode_1.vscode.postMessage({
                type: "toggleMcpServer",
                serverName: server.name,
                disabled: !server.disabled,
            });
        }} onKeyDown={function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                vscode_1.vscode.postMessage({
                    type: "toggleMcpServer",
                    serverName: server.name,
                    disabled: !server.disabled,
                });
            }
        }}>
						<div style={{
            width: "6px",
            height: "6px",
            backgroundColor: "white",
            border: "1px solid color-mix(in srgb, #666666 65%, transparent)",
            borderRadius: "50%",
            position: "absolute",
            top: "1px",
            left: server.disabled ? "2px" : "12px",
            transition: "left 0.2s",
        }}/>
					</div>
				</div>
				<div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: getStatusColor(),
            marginLeft: "8px",
        }}/>
			</div>

			{server.error ? (<div style={{
                fontSize: "13px",
                background: "var(--vscode-textCodeBlock-background)",
                borderRadius: "0 0 4px 4px",
                width: "100%",
            }}>
					<div style={{
                color: "var(--vscode-testing-iconFailed)",
                marginBottom: "8px",
                padding: "0 10px",
                overflowWrap: "break-word",
                wordBreak: "break-word",
            }}>
						{server.error}
					</div>
					<react_2.VSCodeButton appearance="secondary" onClick={handleRestart} disabled={server.status === "connecting"} style={{
                width: "calc(100% - 20px)",
                margin: "0 10px 10px 10px",
            }}>
						{server.status === "connecting" ? "Retrying..." : "Retry Connection"}
					</react_2.VSCodeButton>

					<DangerButton_1.default style={{ width: "calc(100% - 20px)", margin: "0 10px 10px 10px" }} disabled={isDeleting} onClick={handleDelete}>
						{isDeleting ? "Deleting..." : "Delete Server"}
					</DangerButton_1.default>
				</div>) : (isExpanded && (<div style={{
                background: "var(--vscode-textCodeBlock-background)",
                padding: "0 10px 10px 10px",
                fontSize: "13px",
                borderRadius: "0 0 4px 4px",
            }}>
						<react_2.VSCodePanels>
							<react_2.VSCodePanelTab id="tools">Tools ({((_b = server.tools) === null || _b === void 0 ? void 0 : _b.length) || 0})</react_2.VSCodePanelTab>
							<react_2.VSCodePanelTab id="resources">
								Resources ({__spreadArray(__spreadArray([], (server.resourceTemplates || []), true), (server.resources || []), true).length || 0})
							</react_2.VSCodePanelTab>

							<react_2.VSCodePanelView id="tools-view">
								{server.tools && server.tools.length > 0 ? (<div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                }}>
										{server.tools.map(function (tool) { return (<McpToolRow_1.default key={tool.name} tool={tool} serverName={server.name}/>); })}
										{server.name && autoApprovalSettings.enabled && autoApprovalSettings.actions.useMcp && (<react_2.VSCodeCheckbox style={{ marginBottom: -10 }} checked={server.tools.every(function (tool) { return tool.autoApprove; })} onChange={handleAutoApproveChange} data-tool="all-tools">
												Auto-approve all tools
											</react_2.VSCodeCheckbox>)}
									</div>) : (<div style={{
                    padding: "10px 0",
                    color: "var(--vscode-descriptionForeground)",
                }}>
										No tools found
									</div>)}
							</react_2.VSCodePanelView>

							<react_2.VSCodePanelView id="resources-view">
								{(server.resources && server.resources.length > 0) ||
                (server.resourceTemplates && server.resourceTemplates.length > 0) ? (<div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                }}>
										{__spreadArray(__spreadArray([], (server.resourceTemplates || []), true), (server.resources || []), true).map(function (item) { return (<McpResourceRow_1.default key={"uriTemplate" in item ? item.uriTemplate : item.uri} item={item}/>); })}
									</div>) : (<div style={{
                    padding: "10px 0",
                    color: "var(--vscode-descriptionForeground)",
                }}>
										No resources found
									</div>)}
							</react_2.VSCodePanelView>
						</react_2.VSCodePanels>

						<div style={{ margin: "10px 7px" }}>
							<label style={{ display: "block", marginBottom: "4px", fontSize: "13px" }}>Request Timeout</label>
							<react_2.VSCodeDropdown style={{ width: "100%" }} value={timeoutValue} onChange={handleTimeoutChange}>
								{timeoutOptions.map(function (option) { return (<react_2.VSCodeOption key={option.value} value={option.value}>
										{option.label}
									</react_2.VSCodeOption>); })}
							</react_2.VSCodeDropdown>
						</div>
						<react_2.VSCodeButton appearance="secondary" onClick={handleRestart} disabled={server.status === "connecting"} style={{
                width: "calc(100% - 14px)",
                margin: "0 7px 3px 7px",
            }}>
							{server.status === "connecting" ? "Restarting..." : "Restart Server"}
						</react_2.VSCodeButton>

						<DangerButton_1.default style={{ width: "calc(100% - 14px)", margin: "5px 7px 3px 7px" }} disabled={isDeleting} onClick={handleDelete}>
							{isDeleting ? "Deleting..." : "Delete Server"}
						</DangerButton_1.default>
					</div>))}
		</div>);
};
exports.default = ServerRow;
