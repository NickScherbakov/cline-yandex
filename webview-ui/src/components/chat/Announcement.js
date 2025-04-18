"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("@vscode/webview-ui-toolkit/react")
var react_2 = require("react")
var vscStyles_1 = require("@/utils/vscStyles")
var containerStyle = {
	backgroundColor: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_INACTIVE_SELECTION_BACKGROUND),
	borderRadius: "3px",
	padding: "12px 16px",
	margin: "5px 15px 5px 15px",
	position: "relative",
	flexShrink: 0,
}
var closeIconStyle = { position: "absolute", top: "8px", right: "8px" }
var h3TitleStyle = { margin: "0 0 8px" }
var ulStyle = { margin: "0 0 8px", paddingLeft: "12px" }
var accountIconStyle = { fontSize: 11 }
var hrStyle = {
	height: "1px",
	background: (0, vscStyles_1.getAsVar)(vscStyles_1.VSC_DESCRIPTION_FOREGROUND),
	opacity: 0.1,
	margin: "8px 0",
}
var linkContainerStyle = { margin: "0" }
var linkStyle = { display: "inline" }
/*
You must update the latestAnnouncementId in ClineProvider for new announcements to show to users. This new id will be compared with whats in state for the 'last announcement shown', and if it's different then the announcement will render. As soon as an announcement is shown, the id will be updated in state. This ensures that announcements are not shown more than once, even if the user doesn't close it themselves.
*/
var Announcement = function (_a) {
	var version = _a.version,
		hideAnnouncement = _a.hideAnnouncement
	var minorVersion = version.split(".").slice(0, 2).join(".") // 2.0.0 -> 2.0
	return (
		<div style={containerStyle}>
			<react_1.VSCodeButton appearance="icon" onClick={hideAnnouncement} style={closeIconStyle}>
				<span className="codicon codicon-close"></span>
			</react_1.VSCodeButton>
			<h3 style={h3TitleStyle}>
				🎉{"  "}New in v{minorVersion}
			</h3>
			<ul style={ulStyle}>
				<li>
					<b>Add to Cline:</b> Right-click selected text in any file or terminal to quickly add context to your current
					task! Plus, when you see a lightbulb icon, select 'Fix with Cline' to have Cline fix errors in your code.
				</li>
				<li>
					<b>Billing Dashboard:</b> Track your remaining credits and transaction history right in the extension with a{" "}
					<span className="codicon codicon-account" style={accountIconStyle}></span> Cline account!
				</li>
				<li>
					<b>Faster Inference:</b> Cline/OpenRouter users can sort underlying providers used by throughput, price, and
					latency. Sorting by throughput will output faster generations (at a higher cost).
				</li>
				<li>
					<b>Enhanced MCP Support:</b> Dynamic image loading with GIF support, and a new delete button to clean up
					failed servers.
				</li>
			</ul>
			{/*<ul style={{ margin: "0 0 8px", paddingLeft: "12px" }}>
             <li>
                OpenRouter now supports prompt caching! They also have much higher rate limits than other providers,
                so I recommend trying them out.
                <br />
                {!apiConfiguration?.openRouterApiKey && (
                    <VSCodeButtonLink
                        href={getOpenRouterAuthUrl(vscodeUriScheme)}
                        style={{
                            transform: "scale(0.85)",
                            transformOrigin: "left center",
                            margin: "4px -30px 2px 0",
                        }}>
                        Get OpenRouter API Key
                    </VSCodeButtonLink>
                )}
                {apiConfiguration?.openRouterApiKey && apiConfiguration?.apiProvider !== "openrouter" && (
                    <VSCodeButton
                        onClick={() => {
                            vscode.postMessage({
                                type: "apiConfiguration",
                                apiConfiguration: { ...apiConfiguration, apiProvider: "openrouter" },
                            })
                        }}
                        style={{
                            transform: "scale(0.85)",
                            transformOrigin: "left center",
                            margin: "4px -30px 2px 0",
                        }}>
                        Switch to OpenRouter
                    </VSCodeButton>
                )}
            </li>
            <li>
                <b>Edit Cline's changes before accepting!</b> When he creates or edits a file, you can modify his
                changes directly in the right side of the diff view (+ hover over the 'Revert Block' arrow button in
                the center to undo "<code>{"// rest of code here"}</code>" shenanigans)
            </li>
            <li>
                New <code>search_files</code> tool that lets Cline perform regex searches in your project, letting
                him refactor code, address TODOs and FIXMEs, remove dead code, and more!
            </li>
            <li>
                When Cline runs commands, you can now type directly in the terminal (+ support for Python
                environments)
            </li>
        </ul>*/}
			<div style={hrStyle} />
			<p style={linkContainerStyle}>
				Join us on{" "}
				<react_1.VSCodeLink style={linkStyle} href="https://x.com/cline">
					X,
				</react_1.VSCodeLink>{" "}
				<react_1.VSCodeLink style={linkStyle} href="https://discord.gg/cline">
					discord,
				</react_1.VSCodeLink>{" "}
				or{" "}
				<react_1.VSCodeLink style={linkStyle} href="https://www.reddit.com/r/cline/">
					r/cline
				</react_1.VSCodeLink>
				for more updates!
			</p>
		</div>
	)
}
exports.default = (0, react_2.memo)(Announcement)
