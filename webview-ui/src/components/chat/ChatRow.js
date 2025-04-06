"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRowContent = exports.ProgressIndicator = void 0;
var react_1 = require("@vscode/webview-ui-toolkit/react");
var fast_deep_equal_1 = require("fast-deep-equal");
var react_2 = require("react");
var react_use_1 = require("react-use");
var styled_components_1 = require("styled-components");
var ExtensionMessage_1 = require("@shared/ExtensionMessage");
var combineCommandSequences_1 = require("@shared/combineCommandSequences");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var mcp_1 = require("@/utils/mcp");
var vscode_1 = require("@/utils/vscode");
var CheckmarkControl_1 = require("@/components/common/CheckmarkControl");
var CheckpointControls_1 = require("../common/CheckpointControls");
var CodeAccordian_1 = require("../common/CodeAccordian");
var CodeBlock_1 = require("@/components/common/CodeBlock");
var MarkdownBlock_1 = require("@/components/common/MarkdownBlock");
var Thumbnails_1 = require("@/components/common/Thumbnails");
var McpToolRow_1 = require("@/components/mcp/configuration/tabs/installed/server-row/McpToolRow");
var McpResponseDisplay_1 = require("@/components/mcp/chat-display/McpResponseDisplay");
var CreditLimitError_1 = require("@/components/chat/CreditLimitError");
var OptionsButtons_1 = require("@/components/chat/OptionsButtons");
var TaskHeader_1 = require("./TaskHeader");
var SuccessButton_1 = require("@/components/common/SuccessButton");
var TaskFeedbackButtons_1 = require("@/components/chat/TaskFeedbackButtons");
var McpResourceRow_1 = require("@/components/mcp/configuration/tabs/installed/server-row/McpResourceRow");
var ChatRowContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tpadding: 10px 6px 10px 15px;\n\tposition: relative;\n\n\t&:hover ", " {\n\t\topacity: 1;\n\t}\n"], ["\n\tpadding: 10px 6px 10px 15px;\n\tposition: relative;\n\n\t&:hover ", " {\n\t\topacity: 1;\n\t}\n"])), CheckpointControls_1.CheckpointControls);
var ProgressIndicator = function () { return (<div style={{
        width: "16px",
        height: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
		<div style={{ transform: "scale(0.55)", transformOrigin: "center" }}>
			<react_1.VSCodeProgressRing />
		</div>
	</div>); };
exports.ProgressIndicator = ProgressIndicator;
var Markdown = (0, react_2.memo)(function (_a) {
    var markdown = _a.markdown;
    return (<div style={{
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            marginBottom: -15,
            marginTop: -15,
        }}>
			<MarkdownBlock_1.default markdown={markdown}/>
		</div>);
});
var ChatRow = (0, react_2.memo)(function (props) {
    var isLast = props.isLast, onHeightChange = props.onHeightChange, message = props.message, lastModifiedMessage = props.lastModifiedMessage;
    // Store the previous height to compare with the current height
    // This allows us to detect changes without causing re-renders
    var prevHeightRef = (0, react_2.useRef)(0);
    // NOTE: for tools that are interrupted and not responded to (approved or rejected) there won't be a checkpoint hash
    var shouldShowCheckpoints = message.lastCheckpointHash != null &&
        (message.say === "tool" ||
            message.ask === "tool" ||
            message.say === "command" ||
            message.ask === "command" ||
            // message.say === "completion_result" ||
            // message.ask === "completion_result" ||
            message.say === "use_mcp_server" ||
            message.ask === "use_mcp_server");
    if (shouldShowCheckpoints && isLast) {
        shouldShowCheckpoints =
            (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "resume_completed_task" || (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "resume_task";
    }
    var _a = (0, react_use_1.useSize)(<ChatRowContainer>
				<exports.ChatRowContent {...props}/>
				{shouldShowCheckpoints && <CheckpointControls_1.CheckpointOverlay messageTs={message.ts}/>}
			</ChatRowContainer>), chatrow = _a[0], height = _a[1].height;
    (0, react_2.useEffect)(function () {
        // used for partials command output etc.
        // NOTE: it's important we don't distinguish between partial or complete here since our scroll effects in chatview need to handle height change during partial -> complete
        var isInitialRender = prevHeightRef.current === 0; // prevents scrolling when new element is added since we already scroll for that
        // height starts off at Infinity
        if (isLast && height !== 0 && height !== Infinity && height !== prevHeightRef.current) {
            if (!isInitialRender) {
                onHeightChange(height > prevHeightRef.current);
            }
            prevHeightRef.current = height;
        }
    }, [height, isLast, onHeightChange, message]);
    // we cannot return null as virtuoso does not support it so we use a separate visibleMessages array to filter out messages that should not be rendered
    return chatrow;
}, 
// memo does shallow comparison of props, so we need to do deep comparison of arrays/objects whose properties might change
fast_deep_equal_1.default);
exports.default = ChatRow;
var ChatRowContent = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var message = _a.message, isExpanded = _a.isExpanded, onToggleExpand = _a.onToggleExpand, lastModifiedMessage = _a.lastModifiedMessage, isLast = _a.isLast;
    var _p = (0, ExtensionStateContext_1.useExtensionState)(), mcpServers = _p.mcpServers, mcpMarketplaceCatalog = _p.mcpMarketplaceCatalog;
    var _q = (0, react_2.useState)(false), seeNewChangesDisabled = _q[0], setSeeNewChangesDisabled = _q[1];
    var _r = (0, react_2.useMemo)(function () {
        if (message.text != null && message.say === "api_req_started") {
            var info = JSON.parse(message.text);
            return [info.cost, info.cancelReason, info.streamingFailedMessage];
        }
        return [undefined, undefined, undefined];
    }, [message.text, message.say]), cost = _r[0], apiReqCancelReason = _r[1], apiReqStreamingFailedMessage = _r[2];
    // when resuming task last won't be api_req_failed but a resume_task message so api_req_started will show loading spinner. that's why we just remove the last api_req_started that failed without streaming anything
    var apiRequestFailedMessage = isLast && (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "api_req_failed" // if request is retried then the latest message is a api_req_retried
        ? lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.text
        : undefined;
    var isCommandExecuting = isLast &&
        ((lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "command" || (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.say) === "command") &&
        ((_b = lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.text) === null || _b === void 0 ? void 0 : _b.includes(combineCommandSequences_1.COMMAND_OUTPUT_STRING));
    var isMcpServerResponding = isLast && (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.say) === "mcp_server_request_started";
    var type = message.type === "ask" ? message.ask : message.say;
    var normalColor = "var(--vscode-foreground)";
    var errorColor = "var(--vscode-errorForeground)";
    var successColor = "var(--vscode-charts-green)";
    var cancelledColor = "var(--vscode-descriptionForeground)";
    var handleMessage = (0, react_2.useCallback)(function (event) {
        var message = event.data;
        switch (message.type) {
            case "relinquishControl": {
                setSeeNewChangesDisabled(false);
                break;
            }
        }
    }, []);
    (0, react_use_1.useEvent)("message", handleMessage);
    var _s = (0, react_2.useMemo)(function () {
        switch (type) {
            case "error":
                return [
                    <span className="codicon codicon-error" style={{
                            color: errorColor,
                            marginBottom: "-1.5px",
                        }}></span>,
                    <span style={{ color: errorColor, fontWeight: "bold" }}>Error</span>,
                ];
            case "mistake_limit_reached":
                return [
                    <span className="codicon codicon-error" style={{
                            color: errorColor,
                            marginBottom: "-1.5px",
                        }}></span>,
                    <span style={{ color: errorColor, fontWeight: "bold" }}>Cline is having trouble...</span>,
                ];
            case "auto_approval_max_req_reached":
                return [
                    <span className="codicon codicon-warning" style={{
                            color: errorColor,
                            marginBottom: "-1.5px",
                        }}></span>,
                    <span style={{ color: errorColor, fontWeight: "bold" }}>Maximum Requests Reached</span>,
                ];
            case "command":
                return [
                    isCommandExecuting ? (<exports.ProgressIndicator />) : (<span className="codicon codicon-terminal" style={{
                            color: normalColor,
                            marginBottom: "-1.5px",
                        }}></span>),
                    <span style={{ color: normalColor, fontWeight: "bold" }}>Cline wants to execute this command:</span>,
                ];
            case "use_mcp_server":
                var mcpServerUse = JSON.parse(message.text || "{}");
                return [
                    isMcpServerResponding ? (<exports.ProgressIndicator />) : (<span className="codicon codicon-server" style={{
                            color: normalColor,
                            marginBottom: "-1.5px",
                        }}></span>),
                    <span style={{ color: normalColor, fontWeight: "bold", wordBreak: "break-word" }}>
						Cline wants to {mcpServerUse.type === "use_mcp_tool" ? "use a tool" : "access a resource"} on the{" "}
						<code style={{ wordBreak: "break-all" }}>
							{(0, mcp_1.getMcpServerDisplayName)(mcpServerUse.serverName, mcpMarketplaceCatalog)}
						</code>{" "}
						MCP server:
					</span>,
                ];
            case "completion_result":
                return [
                    <span className="codicon codicon-check" style={{
                            color: successColor,
                            marginBottom: "-1.5px",
                        }}></span>,
                    <span style={{ color: successColor, fontWeight: "bold" }}>Task Completed</span>,
                ];
            case "api_req_started":
                var getIconSpan = function (iconName, color) { return (<div style={{
                        width: 16,
                        height: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
						<span className={"codicon codicon-".concat(iconName)} style={{
                        color: color,
                        fontSize: 16,
                        marginBottom: "-1.5px",
                    }}></span>
					</div>); };
                return [
                    apiReqCancelReason != null ? (apiReqCancelReason === "user_cancelled" ? (getIconSpan("error", cancelledColor)) : (getIconSpan("error", errorColor))) : cost != null ? (getIconSpan("check", successColor)) : apiRequestFailedMessage ? (getIconSpan("error", errorColor)) : (<exports.ProgressIndicator />),
                    (function () {
                        if (apiReqCancelReason != null) {
                            return apiReqCancelReason === "user_cancelled" ? (<span style={{ color: normalColor, fontWeight: "bold" }}>API Request Cancelled</span>) : (<span style={{ color: errorColor, fontWeight: "bold" }}>API Streaming Failed</span>);
                        }
                        if (cost != null) {
                            return <span style={{ color: normalColor, fontWeight: "bold" }}>API Request</span>;
                        }
                        if (apiRequestFailedMessage) {
                            return <span style={{ color: errorColor, fontWeight: "bold" }}>API Request Failed</span>;
                        }
                        return <span style={{ color: normalColor, fontWeight: "bold" }}>API Request...</span>;
                    })(),
                ];
            case "followup":
                return [
                    <span className="codicon codicon-question" style={{
                            color: normalColor,
                            marginBottom: "-1.5px",
                        }}></span>,
                    <span style={{ color: normalColor, fontWeight: "bold" }}>Cline has a question:</span>,
                ];
            default:
                return [null, null];
        }
    }, [type, cost, apiRequestFailedMessage, isCommandExecuting, apiReqCancelReason, isMcpServerResponding, message.text]), icon = _s[0], title = _s[1];
    var headerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "12px",
    };
    var pStyle = {
        margin: 0,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
    };
    var tool = (0, react_2.useMemo)(function () {
        if (message.ask === "tool" || message.say === "tool") {
            return JSON.parse(message.text || "{}");
        }
        return null;
    }, [message.ask, message.say, message.text]);
    if (tool) {
        var toolIcon = function (name) { return (<span className={"codicon codicon-".concat(name)} style={{
                color: "var(--vscode-foreground)",
                marginBottom: "-1.5px",
            }}></span>); };
        switch (tool.tool) {
            case "editedExistingFile":
                return (<>
						<div style={headerStyle}>
							{toolIcon("edit")}
							<span style={{ fontWeight: "bold" }}>Cline wants to edit this file:</span>
						</div>
						<CodeAccordian_1.default 
                // isLoading={message.partial}
                code={tool.content} path={tool.path} isExpanded={isExpanded} onToggleExpand={onToggleExpand}/>
					</>);
            case "newFileCreated":
                return (<>
						<div style={headerStyle}>
							{toolIcon("new-file")}
							<span style={{ fontWeight: "bold" }}>Cline wants to create a new file:</span>
						</div>
						<CodeAccordian_1.default isLoading={message.partial} code={tool.content} path={tool.path} isExpanded={isExpanded} onToggleExpand={onToggleExpand}/>
					</>);
            case "readFile":
                return (<>
						<div style={headerStyle}>
							{toolIcon("file-code")}
							<span style={{ fontWeight: "bold" }}>
								{/* {message.type === "ask" ? "" : "Cline read this file:"} */}
								Cline wants to read this file:
							</span>
						</div>
						<div style={{
                        borderRadius: 3,
                        backgroundColor: CodeBlock_1.CODE_BLOCK_BG_COLOR,
                        overflow: "hidden",
                        border: "1px solid var(--vscode-editorGroup-border)",
                    }}>
							<div style={{
                        color: "var(--vscode-descriptionForeground)",
                        display: "flex",
                        alignItems: "center",
                        padding: "9px 10px",
                        cursor: "pointer",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                    }} onClick={function () {
                        vscode_1.vscode.postMessage({
                            type: "openFile",
                            text: tool.content,
                        });
                    }}>
								{((_c = tool.path) === null || _c === void 0 ? void 0 : _c.startsWith(".")) && <span>.</span>}
								<span style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginRight: "8px",
                        direction: "rtl",
                        textAlign: "left",
                    }}>
									{(0, CodeAccordian_1.cleanPathPrefix)((_d = tool.path) !== null && _d !== void 0 ? _d : "") + "\u200E"}
								</span>
								<div style={{ flexGrow: 1 }}></div>
								<span className={"codicon codicon-link-external"} style={{
                        fontSize: 13.5,
                        margin: "1px 0",
                    }}></span>
							</div>
						</div>
					</>);
            case "listFilesTopLevel":
                return (<>
						<div style={headerStyle}>
							{toolIcon("folder-opened")}
							<span style={{ fontWeight: "bold" }}>
								{message.type === "ask"
                        ? "Cline wants to view the top level files in this directory:"
                        : "Cline viewed the top level files in this directory:"}
							</span>
						</div>
						<CodeAccordian_1.default code={tool.content} path={tool.path} language="shell-session" isExpanded={isExpanded} onToggleExpand={onToggleExpand}/>
					</>);
            case "listFilesRecursive":
                return (<>
						<div style={headerStyle}>
							{toolIcon("folder-opened")}
							<span style={{ fontWeight: "bold" }}>
								{message.type === "ask"
                        ? "Cline wants to recursively view all files in this directory:"
                        : "Cline recursively viewed all files in this directory:"}
							</span>
						</div>
						<CodeAccordian_1.default code={tool.content} path={tool.path} language="shell-session" isExpanded={isExpanded} onToggleExpand={onToggleExpand}/>
					</>);
            case "listCodeDefinitionNames":
                return (<>
						<div style={headerStyle}>
							{toolIcon("file-code")}
							<span style={{ fontWeight: "bold" }}>
								{message.type === "ask"
                        ? "Cline wants to view source code definition names used in this directory:"
                        : "Cline viewed source code definition names used in this directory:"}
							</span>
						</div>
						<CodeAccordian_1.default code={tool.content} path={tool.path} isExpanded={isExpanded} onToggleExpand={onToggleExpand}/>
					</>);
            case "searchFiles":
                return (<>
						<div style={headerStyle}>
							{toolIcon("search")}
							<span style={{ fontWeight: "bold" }}>
								Cline wants to search this directory for <code>{tool.regex}</code>:
							</span>
						</div>
						<CodeAccordian_1.default code={tool.content} path={tool.path + (tool.filePattern ? "/(".concat(tool.filePattern, ")") : "")} language="plaintext" isExpanded={isExpanded} onToggleExpand={onToggleExpand}/>
					</>);
            default:
                return null;
        }
    }
    if (message.ask === "command" || message.say === "command") {
        var splitMessage = function (text) {
            var outputIndex = text.indexOf(combineCommandSequences_1.COMMAND_OUTPUT_STRING);
            if (outputIndex === -1) {
                return { command: text, output: "" };
            }
            return {
                command: text.slice(0, outputIndex).trim(),
                output: text
                    .slice(outputIndex + combineCommandSequences_1.COMMAND_OUTPUT_STRING.length)
                    .trim()
                    .split("")
                    .map(function (char) {
                    switch (char) {
                        case "\t":
                            return "→   ";
                        case "\b":
                            return "⌫";
                        case "\f":
                            return "⏏";
                        case "\v":
                            return "⇳";
                        default:
                            return char;
                    }
                })
                    .join(""),
            };
        };
        var _t = splitMessage(message.text || ""), rawCommand = _t.command, output = _t.output;
        var requestsApproval = rawCommand.endsWith(combineCommandSequences_1.COMMAND_REQ_APP_STRING);
        var command = requestsApproval ? rawCommand.slice(0, -combineCommandSequences_1.COMMAND_REQ_APP_STRING.length) : rawCommand;
        return (<>
				<div style={headerStyle}>
					{icon}
					{title}
				</div>
				<div style={{
                borderRadius: 3,
                border: "1px solid var(--vscode-editorGroup-border)",
                overflow: "hidden",
                backgroundColor: CodeBlock_1.CODE_BLOCK_BG_COLOR,
            }}>
					<CodeBlock_1.default source={"".concat("```", "shell\n").concat(command, "\n").concat("```")} forceWrap={true}/>
					{output.length > 0 && (<div style={{ width: "100%" }}>
							<div onClick={onToggleExpand} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    width: "100%",
                    justifyContent: "flex-start",
                    cursor: "pointer",
                    padding: "2px 8px ".concat(isExpanded ? 0 : 8, "px 8px"),
                }}>
								<span className={"codicon codicon-chevron-".concat(isExpanded ? "down" : "right")}></span>
								<span style={{ fontSize: "0.8em" }}>Command Output</span>
							</div>
							{isExpanded && <CodeBlock_1.default source={"".concat("```", "shell\n").concat(output, "\n").concat("```")}/>}
						</div>)}
				</div>
				{requestsApproval && (<div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: 8,
                    fontSize: "12px",
                    color: "var(--vscode-editorWarning-foreground)",
                }}>
						<i className="codicon codicon-warning"></i>
						<span>The model has determined this command requires explicit approval.</span>
					</div>)}
			</>);
    }
    if (message.ask === "use_mcp_server" || message.say === "use_mcp_server") {
        var useMcpServer_1 = JSON.parse(message.text || "{}");
        var server = mcpServers.find(function (server) { return server.name === useMcpServer_1.serverName; });
        return (<>
				<div style={headerStyle}>
					{icon}
					{title}
				</div>

				<div style={{
                background: "var(--vscode-textCodeBlock-background)",
                borderRadius: "3px",
                padding: "8px 10px",
                marginTop: "8px",
            }}>
					{useMcpServer_1.type === "access_mcp_resource" && (<McpResourceRow_1.default item={__assign(__assign({}, ((0, mcp_1.findMatchingResourceOrTemplate)(useMcpServer_1.uri || "", server === null || server === void 0 ? void 0 : server.resources, server === null || server === void 0 ? void 0 : server.resourceTemplates) || {
                    name: "",
                    mimeType: "",
                    description: "",
                })), { uri: useMcpServer_1.uri || "" })}/>)}

					{useMcpServer_1.type === "use_mcp_tool" && (<>
							<div onClick={function (e) { return e.stopPropagation(); }}>
								<McpToolRow_1.default tool={{
                    name: useMcpServer_1.toolName || "",
                    description: ((_f = (_e = server === null || server === void 0 ? void 0 : server.tools) === null || _e === void 0 ? void 0 : _e.find(function (tool) { return tool.name === useMcpServer_1.toolName; })) === null || _f === void 0 ? void 0 : _f.description) || "",
                    autoApprove: ((_h = (_g = server === null || server === void 0 ? void 0 : server.tools) === null || _g === void 0 ? void 0 : _g.find(function (tool) { return tool.name === useMcpServer_1.toolName; })) === null || _h === void 0 ? void 0 : _h.autoApprove) ||
                        false,
                }} serverName={useMcpServer_1.serverName}/>
							</div>
							{useMcpServer_1.arguments && useMcpServer_1.arguments !== "{}" && (<div style={{ marginTop: "8px" }}>
									<div style={{
                        marginBottom: "4px",
                        opacity: 0.8,
                        fontSize: "12px",
                        textTransform: "uppercase",
                    }}>
										Arguments
									</div>
									<CodeAccordian_1.default code={useMcpServer_1.arguments} language="json" isExpanded={true} onToggleExpand={onToggleExpand}/>
								</div>)}
						</>)}
				</div>
			</>);
    }
    switch (message.type) {
        case "say":
            switch (message.say) {
                case "api_req_started":
                    return (<>
							<div style={__assign(__assign({}, headerStyle), { marginBottom: (cost == null && apiRequestFailedMessage) || apiReqStreamingFailedMessage ? 10 : 0, justifyContent: "space-between", cursor: "pointer", userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none" })} onClick={onToggleExpand}>
								<div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}>
									{icon}
									{title}
									{/* Need to render this every time since it affects height of row by 2px */}
									<react_1.VSCodeBadge style={{
                            opacity: cost != null && cost > 0 ? 1 : 0,
                        }}>
										${(_j = Number(cost || 0)) === null || _j === void 0 ? void 0 : _j.toFixed(4)}
									</react_1.VSCodeBadge>
								</div>
								<span className={"codicon codicon-chevron-".concat(isExpanded ? "up" : "down")}></span>
							</div>
							{((cost == null && apiRequestFailedMessage) || apiReqStreamingFailedMessage) && (<>
									{(function () {
                                // Try to parse the error message as JSON for credit limit error
                                var errorData = parseErrorText(apiRequestFailedMessage);
                                if (errorData) {
                                    if (errorData.code === "insufficient_credits" &&
                                        typeof errorData.current_balance === "number" &&
                                        typeof errorData.total_spent === "number" &&
                                        typeof errorData.total_promotions === "number" &&
                                        typeof errorData.message === "string") {
                                        return (<CreditLimitError_1.default currentBalance={errorData.current_balance} totalSpent={errorData.total_spent} totalPromotions={errorData.total_promotions} message={errorData.message}/>);
                                    }
                                }
                                // Default error display
                                return (<p style={__assign(__assign({}, pStyle), { color: "var(--vscode-errorForeground)" })}>
												{apiRequestFailedMessage || apiReqStreamingFailedMessage}
												{(apiRequestFailedMessage === null || apiRequestFailedMessage === void 0 ? void 0 : apiRequestFailedMessage.toLowerCase().includes("powershell")) && (<>
														<br />
														<br />
														It seems like you're having Windows PowerShell issues, please see this{" "}
														<a href="https://github.com/cline/cline/wiki/TroubleShooting-%E2%80%90-%22PowerShell-is-not-recognized-as-an-internal-or-external-command%22" style={{
                                            color: "inherit",
                                            textDecoration: "underline",
                                        }}>
															troubleshooting guide
														</a>
														.
													</>)}
											</p>);
                            })()}
								</>)}

							{isExpanded && (<div style={{ marginTop: "10px" }}>
									<CodeAccordian_1.default code={JSON.parse(message.text || "{}").request} language="markdown" isExpanded={true} onToggleExpand={onToggleExpand}/>
								</div>)}
						</>);
                case "api_req_finished":
                    return null; // we should never see this message type
                case "mcp_server_response":
                    return <McpResponseDisplay_1.default responseText={message.text || ""}/>;
                case "text":
                    return (<div>
							<Markdown markdown={message.text}/>
						</div>);
                case "reasoning":
                    return (<>
							{message.text && (<div onClick={onToggleExpand} style={{
                                // marginBottom: 15,
                                cursor: "pointer",
                                color: "var(--vscode-descriptionForeground)",
                                fontStyle: "italic",
                                overflow: "hidden",
                            }}>
									{isExpanded ? (<div style={{ marginTop: -3 }}>
											<span style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>
												Thinking
												<span className="codicon codicon-chevron-down" style={{
                                    display: "inline-block",
                                    transform: "translateY(3px)",
                                    marginLeft: "1.5px",
                                }}/>
											</span>
											{message.text}
										</div>) : (<div style={{ display: "flex", alignItems: "center" }}>
											<span style={{ fontWeight: "bold", marginRight: "4px" }}>Thinking:</span>
											<span style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    direction: "rtl",
                                    textAlign: "left",
                                    flex: 1,
                                }}>
												{message.text + "\u200E"}
											</span>
											<span className="codicon codicon-chevron-right" style={{
                                    marginLeft: "4px",
                                    flexShrink: 0,
                                }}/>
										</div>)}
								</div>)}
						</>);
                case "user_feedback":
                    return (<div style={{
                            backgroundColor: "var(--vscode-badge-background)",
                            color: "var(--vscode-badge-foreground)",
                            borderRadius: "3px",
                            padding: "9px",
                            whiteSpace: "pre-line",
                            wordWrap: "break-word",
                        }}>
							<span style={{ display: "block" }}>{(0, TaskHeader_1.highlightMentions)(message.text)}</span>
							{message.images && message.images.length > 0 && (<Thumbnails_1.default images={message.images} style={{ marginTop: "8px" }}/>)}
						</div>);
                case "user_feedback_diff":
                    var tool_1 = JSON.parse(message.text || "{}");
                    return (<div style={{
                            marginTop: -10,
                            width: "100%",
                        }}>
							<CodeAccordian_1.default diff={tool_1.diff} isFeedback={true} isExpanded={isExpanded} onToggleExpand={onToggleExpand}/>
						</div>);
                case "error":
                    return (<>
							{title && (<div style={headerStyle}>
									{icon}
									{title}
								</div>)}
							<p style={__assign(__assign({}, pStyle), { color: "var(--vscode-errorForeground)" })}>
								{message.text}
							</p>
						</>);
                case "diff_error":
                    return (<>
							<div style={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "var(--vscode-textBlockQuote-background)",
                            padding: 8,
                            borderRadius: 3,
                            fontSize: 12,
                            color: "var(--vscode-foreground)",
                            opacity: 0.8,
                        }}>
								<div style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 4,
                        }}>
									<i className="codicon codicon-warning" style={{
                            marginRight: 8,
                            fontSize: 14,
                            color: "var(--vscode-descriptionForeground)",
                        }}></i>
									<span style={{ fontWeight: 500 }}>Diff Edit Mismatch</span>
								</div>
								<div>The model used search patterns that don't match anything in the file. Retrying...</div>
							</div>
						</>);
                case "clineignore_error":
                    return (<>
							<div style={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "rgba(255, 191, 0, 0.1)",
                            padding: 8,
                            borderRadius: 3,
                            fontSize: 12,
                        }}>
								<div style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 4,
                        }}>
									<i className="codicon codicon-error" style={{
                            marginRight: 8,
                            fontSize: 18,
                            color: "#FFA500",
                        }}></i>
									<span style={{
                            fontWeight: 500,
                            color: "#FFA500",
                        }}>
										Access Denied
									</span>
								</div>
								<div>
									Cline tried to access <code>{message.text}</code> which is blocked by the{" "}
									<code>.clineignore</code>
									file.
								</div>
							</div>
						</>);
                case "checkpoint_created":
                    return (<>
							<CheckmarkControl_1.CheckmarkControl messageTs={message.ts} isCheckpointCheckedOut={message.isCheckpointCheckedOut}/>
						</>);
                case "completion_result":
                    var hasChanges = (_l = (_k = message.text) === null || _k === void 0 ? void 0 : _k.endsWith(ExtensionMessage_1.COMPLETION_RESULT_CHANGES_FLAG)) !== null && _l !== void 0 ? _l : false;
                    var text = hasChanges ? (_m = message.text) === null || _m === void 0 ? void 0 : _m.slice(0, -ExtensionMessage_1.COMPLETION_RESULT_CHANGES_FLAG.length) : message.text;
                    return (<>
							<div style={__assign(__assign({}, headerStyle), { marginBottom: "10px" })}>
								{icon}
								{title}
								<TaskFeedbackButtons_1.default messageTs={message.ts} isFromHistory={!isLast ||
                            (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "resume_completed_task" ||
                            (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "resume_task"} style={{
                            marginLeft: "auto",
                        }}/>
							</div>
							<div style={{
                            color: "var(--vscode-charts-green)",
                            paddingTop: 10,
                        }}>
								<Markdown markdown={text}/>
							</div>
							{message.partial !== true && hasChanges && (<div style={{ paddingTop: 17 }}>
									<SuccessButton_1.default disabled={seeNewChangesDisabled} onClick={function () {
                                setSeeNewChangesDisabled(true);
                                vscode_1.vscode.postMessage({
                                    type: "taskCompletionViewChanges",
                                    number: message.ts,
                                });
                            }} style={{
                                cursor: seeNewChangesDisabled ? "wait" : "pointer",
                                width: "100%",
                            }}>
										<i className="codicon codicon-new-file" style={{ marginRight: 6 }}/>
										See new changes
									</SuccessButton_1.default>
								</div>)}
						</>);
                case "shell_integration_warning":
                    return (<>
							<div style={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "rgba(255, 191, 0, 0.1)",
                            padding: 8,
                            borderRadius: 3,
                            fontSize: 12,
                        }}>
								<div style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 4,
                        }}>
									<i className="codicon codicon-warning" style={{
                            marginRight: 8,
                            fontSize: 18,
                            color: "#FFA500",
                        }}></i>
									<span style={{
                            fontWeight: 500,
                            color: "#FFA500",
                        }}>
										Shell Integration Unavailable
									</span>
								</div>
								<div>
									Cline won't be able to view the command's output. Please update VSCode (
									<code>CMD/CTRL + Shift + P</code> → "Update") and make sure you're using a supported shell:
									zsh, bash, fish, or PowerShell (<code>CMD/CTRL + Shift + P</code> → "Terminal: Select Default
									Profile").{" "}
									<a href="https://github.com/cline/cline/wiki/Troubleshooting-%E2%80%90-Shell-Integration-Unavailable" style={{
                            color: "inherit",
                            textDecoration: "underline",
                        }}>
										Still having trouble?
									</a>
								</div>
							</div>
						</>);
                default:
                    return (<>
							{title && (<div style={headerStyle}>
									{icon}
									{title}
								</div>)}
							<div style={{ paddingTop: 10 }}>
								<Markdown markdown={message.text}/>
							</div>
						</>);
            }
        case "ask":
            switch (message.ask) {
                case "mistake_limit_reached":
                    return (<>
							<div style={headerStyle}>
								{icon}
								{title}
							</div>
							<p style={__assign(__assign({}, pStyle), { color: "var(--vscode-errorForeground)" })}>
								{message.text}
							</p>
						</>);
                case "auto_approval_max_req_reached":
                    return (<>
							<div style={headerStyle}>
								{icon}
								{title}
							</div>
							<p style={__assign(__assign({}, pStyle), { color: "var(--vscode-errorForeground)" })}>
								{message.text}
							</p>
						</>);
                case "completion_result":
                    if (message.text) {
                        var hasChanges = (_o = message.text.endsWith(ExtensionMessage_1.COMPLETION_RESULT_CHANGES_FLAG)) !== null && _o !== void 0 ? _o : false;
                        var text = hasChanges ? message.text.slice(0, -ExtensionMessage_1.COMPLETION_RESULT_CHANGES_FLAG.length) : message.text;
                        return (<div>
								<div style={__assign(__assign({}, headerStyle), { marginBottom: "10px" })}>
									{icon}
									{title}
									<TaskFeedbackButtons_1.default messageTs={message.ts} isFromHistory={!isLast ||
                                (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "resume_completed_task" ||
                                (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "resume_task"} style={{
                                marginLeft: "auto",
                            }}/>
								</div>
								<div style={{
                                color: "var(--vscode-charts-green)",
                                paddingTop: 10,
                            }}>
									<Markdown markdown={text}/>
									{message.partial !== true && hasChanges && (<div style={{ marginTop: 15 }}>
											<SuccessButton_1.default appearance="secondary" disabled={seeNewChangesDisabled} onClick={function () {
                                    setSeeNewChangesDisabled(true);
                                    vscode_1.vscode.postMessage({
                                        type: "taskCompletionViewChanges",
                                        number: message.ts,
                                    });
                                }}>
												<i className="codicon codicon-new-file" style={{
                                    marginRight: 6,
                                    cursor: seeNewChangesDisabled ? "wait" : "pointer",
                                }}/>
												See new changes
											</SuccessButton_1.default>
										</div>)}
								</div>
							</div>);
                    }
                    else {
                        return null; // Don't render anything when we get a completion_result ask without text
                    }
                case "followup":
                    var question = void 0;
                    var options = void 0;
                    var selected = void 0;
                    try {
                        var parsedMessage = JSON.parse(message.text || "{}");
                        question = parsedMessage.question;
                        options = parsedMessage.options;
                        selected = parsedMessage.selected;
                    }
                    catch (e) {
                        // legacy messages would pass question directly
                        question = message.text;
                    }
                    return (<>
							{title && (<div style={headerStyle}>
									{icon}
									{title}
								</div>)}
							<div style={{ paddingTop: 10 }}>
								<Markdown markdown={question}/>
								<OptionsButtons_1.OptionsButtons options={options} selected={selected} isActive={isLast && (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "followup"}/>
							</div>
						</>);
                case "plan_mode_respond": {
                    var response = void 0;
                    var options_1;
                    var selected_1;
                    try {
                        var parsedMessage = JSON.parse(message.text || "{}");
                        response = parsedMessage.response;
                        options_1 = parsedMessage.options;
                        selected_1 = parsedMessage.selected;
                    }
                    catch (e) {
                        // legacy messages would pass response directly
                        response = message.text;
                    }
                    return (<div style={{}}>
							<Markdown markdown={response}/>
							<OptionsButtons_1.OptionsButtons options={options_1} selected={selected_1} isActive={isLast && (lastModifiedMessage === null || lastModifiedMessage === void 0 ? void 0 : lastModifiedMessage.ask) === "plan_mode_respond"}/>
						</div>);
                }
                default:
                    return null;
            }
    }
};
exports.ChatRowContent = ChatRowContent;
function parseErrorText(text) {
    if (!text) {
        return undefined;
    }
    try {
        var startIndex = text.indexOf("{");
        var endIndex = text.lastIndexOf("}");
        if (startIndex !== -1 && endIndex !== -1) {
            var jsonStr = text.substring(startIndex, endIndex + 1);
            var errorObject = JSON.parse(jsonStr);
            return errorObject;
        }
    }
    catch (e) {
        // Not JSON or missing required fields
    }
}
var templateObject_1;
