"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("react")
var vscode_1 = require("@/utils/vscode")
var react_2 = require("@vscode/webview-ui-toolkit/react")
var react_use_1 = require("react-use")
var constants_1 = require("@/constants")
var AddRemoteServerForm = function (_a) {
	var onServerAdded = _a.onServerAdded
	var _b = (0, react_1.useState)(""),
		serverName = _b[0],
		setServerName = _b[1]
	var _c = (0, react_1.useState)(""),
		serverUrl = _c[0],
		setServerUrl = _c[1]
	var _d = (0, react_1.useState)(false),
		isSubmitting = _d[0],
		setIsSubmitting = _d[1]
	var _e = (0, react_1.useState)(""),
		error = _e[0],
		setError = _e[1]
	var _f = (0, react_1.useState)(false),
		showConnectingMessage = _f[0],
		setShowConnectingMessage = _f[1]
	// Store submitted values to check if the server was added
	var submittedValues = (0, react_1.useRef)(null)
	var handleMessage = (0, react_1.useCallback)(
		function (event) {
			var _a
			var message = event.data
			if (
				message.type === "addRemoteServerResult" &&
				isSubmitting &&
				submittedValues.current &&
				((_a = message.addRemoteServerResult) === null || _a === void 0 ? void 0 : _a.serverName) ===
					submittedValues.current.name
			) {
				if (message.addRemoteServerResult.success) {
					// Handle success
					setIsSubmitting(false)
					setServerName("")
					setServerUrl("")
					submittedValues.current = null
					onServerAdded()
					setShowConnectingMessage(false)
				} else {
					// Handle error
					setIsSubmitting(false)
					setError(message.addRemoteServerResult.error || "Failed to add server")
					setShowConnectingMessage(false)
				}
			}
		},
		[isSubmitting, onServerAdded],
	)
	;(0, react_use_1.useEvent)("message", handleMessage)
	var handleSubmit = function (e) {
		e.preventDefault()
		if (!serverName.trim()) {
			setError("Server name is required")
			return
		}
		if (!serverUrl.trim()) {
			setError("Server URL is required")
			return
		}
		try {
			new URL(serverUrl)
		} catch (err) {
			setError("Invalid URL format")
			return
		}
		setError("")
		submittedValues.current = { name: serverName.trim() }
		setIsSubmitting(true)
		setShowConnectingMessage(true)
		vscode_1.vscode.postMessage({
			type: "addRemoteServer",
			serverName: serverName.trim(),
			serverUrl: serverUrl.trim(),
		})
	}
	return (
		<div className="p-4 px-5">
			<div className="text-[var(--vscode-foreground)] mb-2">
				Add a remote MCP server by providing a name and its URL endpoint. Learn more{" "}
				<react_2.VSCodeLink href={constants_1.LINKS.DOCUMENTATION.REMOTE_MCP_SERVER_DOCS} style={{ display: "inline" }}>
					here.
				</react_2.VSCodeLink>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="mb-2">
					<react_2.VSCodeTextField
						value={serverName}
						onChange={function (e) {
							setServerName(e.target.value)
							setError("")
						}}
						disabled={isSubmitting}
						className="w-full"
						placeholder="mcp-server">
						Server Name
					</react_2.VSCodeTextField>
				</div>

				<div className="mb-2">
					<react_2.VSCodeTextField
						value={serverUrl}
						onChange={function (e) {
							setServerUrl(e.target.value)
							setError("")
						}}
						disabled={isSubmitting}
						placeholder="https://example.com/mcp-server"
						className="w-full mr-4">
						Server URL
					</react_2.VSCodeTextField>
				</div>

				{error && <div className="mb-3 text-[var(--vscode-errorForeground)]">{error}</div>}

				<div className="flex items-center mt-3 w-full">
					<react_2.VSCodeButton type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting ? "Adding..." : "Add Server"}
					</react_2.VSCodeButton>

					{showConnectingMessage && (
						<div className="ml-3 text-[var(--vscode-notificationsInfoIcon-foreground)] text-sm">
							Connecting to server... This may take a few seconds.
						</div>
					)}
				</div>

				<react_2.VSCodeButton
					appearance="secondary"
					style={{ width: "100%", marginBottom: "5px", marginTop: 15 }}
					onClick={function () {
						vscode_1.vscode.postMessage({ type: "openMcpSettings" })
					}}>
					Edit Configuration
				</react_2.VSCodeButton>
			</form>
		</div>
	)
}
exports.default = AddRemoteServerForm
