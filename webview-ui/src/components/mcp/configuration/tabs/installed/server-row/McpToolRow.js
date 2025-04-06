"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@vscode/webview-ui-toolkit/react");
var vscode_1 = require("@/utils/vscode");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var McpToolRow = function (_a) {
    var tool = _a.tool, serverName = _a.serverName;
    var autoApprovalSettings = (0, ExtensionStateContext_1.useExtensionState)().autoApprovalSettings;
    // Accept the event object
    var handleAutoApproveChange = function (event) {
        // Only proceed if the event was triggered by a direct user interaction
        if (!serverName || !event.isTrusted)
            return;
        vscode_1.vscode.postMessage({
            type: "toggleToolAutoApprove",
            serverName: serverName,
            toolNames: [tool.name],
            autoApprove: !tool.autoApprove,
        });
    };
    return (<div key={tool.name} style={{
            padding: "3px 0",
        }}>
			<div data-testid="tool-row-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} onClick={function (e) { return e.stopPropagation(); }}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<span className="codicon codicon-symbol-method" style={{ marginRight: "6px" }}></span>
					<span style={{ fontWeight: 500 }}>{tool.name}</span>
				</div>
				{serverName && autoApprovalSettings.enabled && autoApprovalSettings.actions.useMcp && (<react_1.VSCodeCheckbox checked={tool.autoApprove} onChange={handleAutoApproveChange} data-tool={tool.name}>
						Auto-approve
					</react_1.VSCodeCheckbox>)}
			</div>
			{tool.description && (<div style={{
                marginLeft: "0px",
                marginTop: "4px",
                opacity: 0.8,
                fontSize: "12px",
            }}>
					{tool.description}
				</div>)}
			{tool.inputSchema &&
            "properties" in tool.inputSchema &&
            Object.keys(tool.inputSchema.properties).length > 0 && (<div style={{
                marginTop: "8px",
                fontSize: "12px",
                border: "1px solid color-mix(in srgb, var(--vscode-descriptionForeground) 30%, transparent)",
                borderRadius: "3px",
                padding: "8px",
            }}>
						<div style={{
                marginBottom: "4px",
                opacity: 0.8,
                fontSize: "11px",
                textTransform: "uppercase",
            }}>
							Parameters
						</div>
						{Object.entries(tool.inputSchema.properties).map(function (_a) {
                var paramName = _a[0], schema = _a[1];
                var isRequired = tool.inputSchema &&
                    "required" in tool.inputSchema &&
                    Array.isArray(tool.inputSchema.required) &&
                    tool.inputSchema.required.includes(paramName);
                return (<div key={paramName} style={{
                        display: "flex",
                        alignItems: "baseline",
                        marginTop: "4px",
                    }}>
									<code style={{
                        color: "var(--vscode-textPreformat-foreground)",
                        marginRight: "8px",
                    }}>
										{paramName}
										{isRequired && (<span style={{
                            color: "var(--vscode-errorForeground)",
                        }}>
												*
											</span>)}
									</code>
									<span style={{
                        opacity: 0.8,
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                    }}>
										{schema.description || "No description"}
									</span>
								</div>);
            })}
					</div>)}
		</div>);
};
exports.default = McpToolRow;
