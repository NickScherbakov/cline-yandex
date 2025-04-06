"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("@vscode/webview-ui-toolkit/react")
var vscode_1 = require("@/utils/vscode")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var ServersToggleList_1 = require("./ServersToggleList")
var InstalledServersView = function () {
	var servers = (0, ExtensionStateContext_1.useExtensionState)().mcpServers
	return (
		<div style={{ padding: "16px 20px" }}>
			<div
				style={{
					color: "var(--vscode-foreground)",
					fontSize: "13px",
					marginBottom: "16px",
					marginTop: "5px",
				}}>
				The{" "}
				<react_1.VSCodeLink href="https://github.com/modelcontextprotocol" style={{ display: "inline" }}>
					Model Context Protocol
				</react_1.VSCodeLink>{" "}
				enables communication with locally running MCP servers that provide additional tools and resources to extend
				Cline's capabilities. You can use{" "}
				<react_1.VSCodeLink href="https://github.com/modelcontextprotocol/servers" style={{ display: "inline" }}>
					community-made servers
				</react_1.VSCodeLink>{" "}
				or ask Cline to create new tools specific to your workflow (e.g., "add a tool that gets the latest npm docs").{" "}
				<react_1.VSCodeLink href="https://x.com/sdrzn/status/1867271665086074969" style={{ display: "inline" }}>
					See a demo here.
				</react_1.VSCodeLink>
			</div>

			<ServersToggleList_1.default servers={servers} />

			{/* Settings Section */}
			<div style={{ marginBottom: "20px", marginTop: 10 }}>
				<react_1.VSCodeButton
					appearance="secondary"
					style={{ width: "100%", marginBottom: "5px" }}
					onClick={function () {
						vscode_1.vscode.postMessage({ type: "openMcpSettings" })
					}}>
					<span className="codicon codicon-server" style={{ marginRight: "6px" }}></span>
					Configure MCP Servers
				</react_1.VSCodeButton>

				<div style={{ textAlign: "center" }}>
					<react_1.VSCodeLink
						onClick={function () {
							vscode_1.vscode.postMessage({
								type: "openExtensionSettings",
								text: "cline.mcp",
							})
						}}
						style={{ fontSize: "12px" }}>
						Advanced MCP Settings
					</react_1.VSCodeLink>
				</div>
			</div>
		</div>
	)
}
exports.default = InstalledServersView
