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
exports.MAX_IMAGES_PER_MESSAGE = void 0;
var react_1 = require("@vscode/webview-ui-toolkit/react");
var debounce_1 = require("debounce");
var react_2 = require("react");
var react_use_1 = require("react-use");
var react_virtuoso_1 = require("react-virtuoso");
var styled_components_1 = require("styled-components");
var array_1 = require("@shared/array");
var combineApiRequests_1 = require("@shared/combineApiRequests");
var combineCommandSequences_1 = require("@shared/combineCommandSequences");
var getApiMetrics_1 = require("@shared/getApiMetrics");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var vscode_1 = require("@/utils/vscode");
var HistoryPreview_1 = require("@/components/history/HistoryPreview");
var ApiOptions_1 = require("@/components/settings/ApiOptions");
var Announcement_1 = require("@/components/chat/Announcement");
var AutoApproveMenu_1 = require("@/components/chat/AutoApproveMenu");
var BrowserSessionRow_1 = require("@/components/chat/BrowserSessionRow");
var ChatRow_1 = require("@/components/chat/ChatRow");
var ChatTextArea_1 = require("@/components/chat/ChatTextArea");
var TaskHeader_1 = require("@/components/chat/TaskHeader");
var TelemetryBanner_1 = require("@/components/common/TelemetryBanner");
exports.MAX_IMAGES_PER_MESSAGE = 20; // Anthropic limits to 20 images
var ChatView = function (_a) {
    var isHidden = _a.isHidden, showAnnouncement = _a.showAnnouncement, hideAnnouncement = _a.hideAnnouncement, showHistoryView = _a.showHistoryView;
    var _b = (0, ExtensionStateContext_1.useExtensionState)(), version = _b.version, messages = _b.clineMessages, taskHistory = _b.taskHistory, apiConfiguration = _b.apiConfiguration, telemetrySetting = _b.telemetrySetting;
    //const task = messages.length > 0 ? (messages[0].say === "task" ? messages[0] : undefined) : undefined) : undefined
    var task = (0, react_2.useMemo)(function () { return messages.at(0); }, [messages]); // leaving this less safe version here since if the first message is not a task, then the extension is in a bad state and needs to be debugged (see Cline.abort)
    var modifiedMessages = (0, react_2.useMemo)(function () { return (0, combineApiRequests_1.combineApiRequests)((0, combineCommandSequences_1.combineCommandSequences)(messages.slice(1))); }, [messages]);
    // has to be after api_req_finished are all reduced into api_req_started messages
    var apiMetrics = (0, react_2.useMemo)(function () { return (0, getApiMetrics_1.getApiMetrics)(modifiedMessages); }, [modifiedMessages]);
    var lastApiReqTotalTokens = (0, react_2.useMemo)(function () {
        var getTotalTokensFromApiReqMessage = function (msg) {
            if (!msg.text)
                return 0;
            var _a = JSON.parse(msg.text), tokensIn = _a.tokensIn, tokensOut = _a.tokensOut, cacheWrites = _a.cacheWrites, cacheReads = _a.cacheReads;
            return (tokensIn || 0) + (tokensOut || 0) + (cacheWrites || 0) + (cacheReads || 0);
        };
        var lastApiReqMessage = (0, array_1.findLast)(modifiedMessages, function (msg) {
            if (msg.say !== "api_req_started")
                return false;
            return getTotalTokensFromApiReqMessage(msg) > 0;
        });
        if (!lastApiReqMessage)
            return undefined;
        return getTotalTokensFromApiReqMessage(lastApiReqMessage);
    }, [modifiedMessages]);
    var _c = (0, react_2.useState)(""), inputValue = _c[0], setInputValue = _c[1];
    var textAreaRef = (0, react_2.useRef)(null);
    var _d = (0, react_2.useState)(false), textAreaDisabled = _d[0], setTextAreaDisabled = _d[1];
    var _e = (0, react_2.useState)([]), selectedImages = _e[0], setSelectedImages = _e[1];
    // we need to hold on to the ask because useEffect > lastMessage will always let us know when an ask comes in and handle it, but by the time handleMessage is called, the last message might not be the ask anymore (it could be a say that followed)
    var _f = (0, react_2.useState)(undefined), clineAsk = _f[0], setClineAsk = _f[1];
    var _g = (0, react_2.useState)(false), enableButtons = _g[0], setEnableButtons = _g[1];
    var _h = (0, react_2.useState)("Approve"), primaryButtonText = _h[0], setPrimaryButtonText = _h[1];
    var _j = (0, react_2.useState)("Reject"), secondaryButtonText = _j[0], setSecondaryButtonText = _j[1];
    var _k = (0, react_2.useState)(false), didClickCancel = _k[0], setDidClickCancel = _k[1];
    var virtuosoRef = (0, react_2.useRef)(null);
    var _l = (0, react_2.useState)({}), expandedRows = _l[0], setExpandedRows = _l[1];
    var scrollContainerRef = (0, react_2.useRef)(null);
    var disableAutoScrollRef = (0, react_2.useRef)(false);
    var _m = (0, react_2.useState)(false), showScrollToBottom = _m[0], setShowScrollToBottom = _m[1];
    var _o = (0, react_2.useState)(false), isAtBottom = _o[0], setIsAtBottom = _o[1];
    // UI layout depends on the last 2 messages
    // (since it relies on the content of these messages, we are deep comparing. i.e. the button state after hitting button sets enableButtons to false, and this effect otherwise would have to true again even if messages didn't change
    var lastMessage = (0, react_2.useMemo)(function () { return messages.at(-1); }, [messages]);
    var secondLastMessage = (0, react_2.useMemo)(function () { return messages.at(-2); }, [messages]);
    (0, react_use_1.useDeepCompareEffect)(function () {
        // if last message is an ask, show user ask UI
        // if user finished a task, then start a new task with a new conversation history since in this moment that the extension is waiting for user response, the user could close the extension and the conversation history would be lost.
        // basically as long as a task is active, the conversation history will be persisted
        if (lastMessage) {
            switch (lastMessage.type) {
                case "ask":
                    var isPartial = lastMessage.partial === true;
                    switch (lastMessage.ask) {
                        case "api_req_failed":
                            setTextAreaDisabled(true);
                            setClineAsk("api_req_failed");
                            setEnableButtons(true);
                            setPrimaryButtonText("Retry");
                            setSecondaryButtonText("Start New Task");
                            break;
                        case "mistake_limit_reached":
                            setTextAreaDisabled(false);
                            setClineAsk("mistake_limit_reached");
                            setEnableButtons(true);
                            setPrimaryButtonText("Proceed Anyways");
                            setSecondaryButtonText("Start New Task");
                            break;
                        case "auto_approval_max_req_reached":
                            setTextAreaDisabled(true);
                            setClineAsk("auto_approval_max_req_reached");
                            setEnableButtons(true);
                            setPrimaryButtonText("Proceed");
                            setSecondaryButtonText("Start New Task");
                            break;
                        case "followup":
                            setTextAreaDisabled(isPartial);
                            setClineAsk("followup");
                            setEnableButtons(false);
                            // setPrimaryButtonText(undefined)
                            // setSecondaryButtonText(undefined)
                            break;
                        case "plan_mode_respond":
                            setTextAreaDisabled(isPartial);
                            setClineAsk("plan_mode_respond");
                            setEnableButtons(false);
                            // setPrimaryButtonText(undefined)
                            // setSecondaryButtonText(undefined)
                            break;
                        case "tool":
                            setTextAreaDisabled(isPartial);
                            setClineAsk("tool");
                            setEnableButtons(!isPartial);
                            var tool = JSON.parse(lastMessage.text || "{}");
                            switch (tool.tool) {
                                case "editedExistingFile":
                                case "newFileCreated":
                                    setPrimaryButtonText("Save");
                                    setSecondaryButtonText("Reject");
                                    break;
                                default:
                                    setPrimaryButtonText("Approve");
                                    setSecondaryButtonText("Reject");
                                    break;
                            }
                            break;
                        case "browser_action_launch":
                            setTextAreaDisabled(isPartial);
                            setClineAsk("browser_action_launch");
                            setEnableButtons(!isPartial);
                            setPrimaryButtonText("Approve");
                            setSecondaryButtonText("Reject");
                            break;
                        case "command":
                            setTextAreaDisabled(isPartial);
                            setClineAsk("command");
                            setEnableButtons(!isPartial);
                            setPrimaryButtonText("Run Command");
                            setSecondaryButtonText("Reject");
                            break;
                        case "command_output":
                            setTextAreaDisabled(false);
                            setClineAsk("command_output");
                            setEnableButtons(true);
                            setPrimaryButtonText("Proceed While Running");
                            setSecondaryButtonText(undefined);
                            break;
                        case "use_mcp_server":
                            setTextAreaDisabled(isPartial);
                            setClineAsk("use_mcp_server");
                            setEnableButtons(!isPartial);
                            setPrimaryButtonText("Approve");
                            setSecondaryButtonText("Reject");
                            break;
                        case "completion_result":
                            // extension waiting for feedback. but we can just present a new task button
                            setTextAreaDisabled(isPartial);
                            setClineAsk("completion_result");
                            setEnableButtons(!isPartial);
                            setPrimaryButtonText("Start New Task");
                            setSecondaryButtonText(undefined);
                            break;
                        case "resume_task":
                            setTextAreaDisabled(false);
                            setClineAsk("resume_task");
                            setEnableButtons(true);
                            setPrimaryButtonText("Resume Task");
                            setSecondaryButtonText(undefined);
                            setDidClickCancel(false); // special case where we reset the cancel button state
                            break;
                        case "resume_completed_task":
                            setTextAreaDisabled(false);
                            setClineAsk("resume_completed_task");
                            setEnableButtons(true);
                            setPrimaryButtonText("Start New Task");
                            setSecondaryButtonText(undefined);
                            setDidClickCancel(false);
                            break;
                    }
                    break;
                case "say":
                    // don't want to reset since there could be a "say" after an "ask" while ask is waiting for response
                    switch (lastMessage.say) {
                        case "api_req_started":
                            if ((secondLastMessage === null || secondLastMessage === void 0 ? void 0 : secondLastMessage.ask) === "command_output") {
                                // if the last ask is a command_output, and we receive an api_req_started, then that means the command has finished and we don't need input from the user anymore (in every other case, the user has to interact with input field or buttons to continue, which does the following automatically)
                                setInputValue("");
                                setTextAreaDisabled(true);
                                setSelectedImages([]);
                                setClineAsk(undefined);
                                setEnableButtons(false);
                            }
                            break;
                        case "task":
                        case "error":
                        case "api_req_finished":
                        case "text":
                        case "browser_action":
                        case "browser_action_result":
                        case "browser_action_launch":
                        case "command":
                        case "use_mcp_server":
                        case "command_output":
                        case "mcp_server_request_started":
                        case "mcp_server_response":
                        case "completion_result":
                        case "tool":
                            break;
                    }
                    break;
            }
        }
        else {
            // this would get called after sending the first message, so we have to watch messages.length instead
            // No messages, so user has to submit a task
            // setTextAreaDisabled(false)
            // setClineAsk(undefined)
            // setPrimaryButtonText(undefined)
            // setSecondaryButtonText(undefined)
        }
    }, [lastMessage, secondLastMessage]);
    (0, react_2.useEffect)(function () {
        if (messages.length === 0) {
            setTextAreaDisabled(false);
            setClineAsk(undefined);
            setEnableButtons(false);
            setPrimaryButtonText("Approve");
            setSecondaryButtonText("Reject");
        }
    }, [messages.length]);
    (0, react_2.useEffect)(function () {
        setExpandedRows({});
    }, [task === null || task === void 0 ? void 0 : task.ts]);
    var isStreaming = (0, react_2.useMemo)(function () {
        var _a, _b;
        var isLastAsk = !!((_a = modifiedMessages.at(-1)) === null || _a === void 0 ? void 0 : _a.ask); // checking clineAsk isn't enough since messages effect may be called again for a tool for example, set clineAsk to its value, and if the next message is not an ask then it doesn't reset. This is likely due to how much more often we're updating messages as compared to before, and should be resolved with optimizations as it's likely a rendering bug. but as a final guard for now, the cancel button will show if the last message is not an ask
        var isToolCurrentlyAsking = isLastAsk && clineAsk !== undefined && enableButtons && primaryButtonText !== undefined;
        if (isToolCurrentlyAsking) {
            return false;
        }
        var isLastMessagePartial = ((_b = modifiedMessages.at(-1)) === null || _b === void 0 ? void 0 : _b.partial) === true;
        if (isLastMessagePartial) {
            return true;
        }
        else {
            var lastApiReqStarted = (0, array_1.findLast)(modifiedMessages, function (message) { return message.say === "api_req_started"; });
            if (lastApiReqStarted && lastApiReqStarted.text != null && lastApiReqStarted.say === "api_req_started") {
                var cost = JSON.parse(lastApiReqStarted.text).cost;
                if (cost === undefined) {
                    // api request has not finished yet
                    return true;
                }
            }
        }
        return false;
    }, [modifiedMessages, clineAsk, enableButtons, primaryButtonText]);
    var handleSendMessage = (0, react_2.useCallback)(function (text, images) {
        text = text.trim();
        if (text || images.length > 0) {
            if (messages.length === 0) {
                vscode_1.vscode.postMessage({ type: "newTask", text: text, images: images });
            }
            else if (clineAsk) {
                switch (clineAsk) {
                    case "followup":
                    case "plan_mode_respond":
                    case "tool":
                    case "browser_action_launch":
                    case "command": // user can provide feedback to a tool or command use
                    case "command_output": // user can send input to command stdin
                    case "use_mcp_server":
                    case "completion_result": // if this happens then the user has feedback for the completion result
                    case "resume_task":
                    case "resume_completed_task":
                    case "mistake_limit_reached":
                        vscode_1.vscode.postMessage({
                            type: "askResponse",
                            askResponse: "messageResponse",
                            text: text,
                            images: images,
                        });
                        break;
                    // there is no other case that a textfield should be enabled
                }
            }
            setInputValue("");
            setTextAreaDisabled(true);
            setSelectedImages([]);
            setClineAsk(undefined);
            setEnableButtons(false);
            // setPrimaryButtonText(undefined)
            // setSecondaryButtonText(undefined)
            disableAutoScrollRef.current = false;
        }
    }, [messages.length, clineAsk]);
    var startNewTask = (0, react_2.useCallback)(function () {
        vscode_1.vscode.postMessage({ type: "clearTask" });
    }, []);
    /*
    This logic depends on the useEffect[messages] above to set clineAsk, after which buttons are shown and we then send an askResponse to the extension.
    */
    var handlePrimaryButtonClick = (0, react_2.useCallback)(function (text, images) {
        var trimmedInput = text === null || text === void 0 ? void 0 : text.trim();
        switch (clineAsk) {
            case "api_req_failed":
            case "command":
            case "command_output":
            case "tool":
            case "browser_action_launch":
            case "use_mcp_server":
            case "resume_task":
            case "mistake_limit_reached":
            case "auto_approval_max_req_reached":
                if (trimmedInput || (images && images.length > 0)) {
                    vscode_1.vscode.postMessage({
                        type: "askResponse",
                        askResponse: "yesButtonClicked",
                        text: trimmedInput,
                        images: images,
                    });
                }
                else {
                    vscode_1.vscode.postMessage({
                        type: "askResponse",
                        askResponse: "yesButtonClicked",
                    });
                }
                // Clear input state after sending
                setInputValue("");
                setSelectedImages([]);
                break;
            case "completion_result":
            case "resume_completed_task":
                // extension waiting for feedback. but we can just present a new task button
                startNewTask();
                break;
        }
        setTextAreaDisabled(true);
        setClineAsk(undefined);
        setEnableButtons(false);
        // setPrimaryButtonText(undefined)
        // setSecondaryButtonText(undefined)
        disableAutoScrollRef.current = false;
    }, [clineAsk, startNewTask]);
    var handleSecondaryButtonClick = (0, react_2.useCallback)(function (text, images) {
        var trimmedInput = text === null || text === void 0 ? void 0 : text.trim();
        if (isStreaming) {
            vscode_1.vscode.postMessage({ type: "cancelTask" });
            setDidClickCancel(true);
            return;
        }
        switch (clineAsk) {
            case "api_req_failed":
            case "mistake_limit_reached":
            case "auto_approval_max_req_reached":
                startNewTask();
                break;
            case "command":
            case "tool":
            case "browser_action_launch":
            case "use_mcp_server":
                if (trimmedInput || (images && images.length > 0)) {
                    vscode_1.vscode.postMessage({
                        type: "askResponse",
                        askResponse: "noButtonClicked",
                        text: trimmedInput,
                        images: images,
                    });
                }
                else {
                    // responds to the API with a "This operation failed" and lets it try again
                    vscode_1.vscode.postMessage({
                        type: "askResponse",
                        askResponse: "noButtonClicked",
                    });
                }
                // Clear input state after sending
                setInputValue("");
                setSelectedImages([]);
                break;
        }
        setTextAreaDisabled(true);
        setClineAsk(undefined);
        setEnableButtons(false);
        // setPrimaryButtonText(undefined)
        // setSecondaryButtonText(undefined)
        disableAutoScrollRef.current = false;
    }, [clineAsk, startNewTask, isStreaming]);
    var handleTaskCloseButtonClick = (0, react_2.useCallback)(function () {
        startNewTask();
    }, [startNewTask]);
    var selectedModelInfo = (0, react_2.useMemo)(function () {
        return (0, ApiOptions_1.normalizeApiConfiguration)(apiConfiguration);
    }, [apiConfiguration]).selectedModelInfo;
    var selectImages = (0, react_2.useCallback)(function () {
        vscode_1.vscode.postMessage({ type: "selectImages" });
    }, []);
    var shouldDisableImages = !selectedModelInfo.supportsImages || textAreaDisabled || selectedImages.length >= exports.MAX_IMAGES_PER_MESSAGE;
    var handleMessage = (0, react_2.useCallback)(function (e) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var message = e.data;
        switch (message.type) {
            case "action":
                switch (message.action) {
                    case "didBecomeVisible":
                        if (!isHidden && !textAreaDisabled && !enableButtons) {
                            (_a = textAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                        }
                        break;
                }
                break;
            case "selectedImages":
                var newImages_1 = (_b = message.images) !== null && _b !== void 0 ? _b : [];
                if (newImages_1.length > 0) {
                    setSelectedImages(function (prevImages) { return __spreadArray(__spreadArray([], prevImages, true), newImages_1, true).slice(0, exports.MAX_IMAGES_PER_MESSAGE); });
                }
                break;
            case "addToInput":
                setInputValue(function (prevValue) {
                    var _a;
                    var newText = (_a = message.text) !== null && _a !== void 0 ? _a : "";
                    return prevValue ? "".concat(prevValue, "\n").concat(newText) : newText;
                });
                // Add scroll to bottom after state update
                setTimeout(function () {
                    if (textAreaRef.current) {
                        textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
                    }
                }, 0);
                break;
            case "invoke":
                switch (message.invoke) {
                    case "sendMessage":
                        handleSendMessage((_c = message.text) !== null && _c !== void 0 ? _c : "", (_d = message.images) !== null && _d !== void 0 ? _d : []);
                        break;
                    case "primaryButtonClick":
                        handlePrimaryButtonClick((_e = message.text) !== null && _e !== void 0 ? _e : "", (_f = message.images) !== null && _f !== void 0 ? _f : []);
                        break;
                    case "secondaryButtonClick":
                        handleSecondaryButtonClick((_g = message.text) !== null && _g !== void 0 ? _g : "", (_h = message.images) !== null && _h !== void 0 ? _h : []);
                        break;
                }
        }
        // textAreaRef.current is not explicitly required here since react guarantees that ref will be stable across re-renders, and we're not using its value but its reference.
    }, [isHidden, textAreaDisabled, enableButtons, handleSendMessage, handlePrimaryButtonClick, handleSecondaryButtonClick]);
    (0, react_use_1.useEvent)("message", handleMessage);
    (0, react_use_1.useMount)(function () {
        var _a;
        // NOTE: the vscode window needs to be focused for this to work
        (_a = textAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    });
    (0, react_2.useEffect)(function () {
        var timer = setTimeout(function () {
            var _a;
            if (!isHidden && !textAreaDisabled && !enableButtons) {
                (_a = textAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }, 50);
        return function () {
            clearTimeout(timer);
        };
    }, [isHidden, textAreaDisabled, enableButtons]);
    var visibleMessages = (0, react_2.useMemo)(function () {
        return modifiedMessages.filter(function (message) {
            var _a, _b, _c;
            switch (message.ask) {
                case "completion_result":
                    // don't show a chat row for a completion_result ask without text. This specific type of message only occurs if cline wants to execute a command as part of its completion result, in which case we interject the completion_result tool with the execute_command tool.
                    if (message.text === "") {
                        return false;
                    }
                    break;
                case "api_req_failed": // this message is used to update the latest api_req_started that the request failed
                case "resume_task":
                case "resume_completed_task":
                    return false;
            }
            switch (message.say) {
                case "api_req_finished": // combineApiRequests removes this from modifiedMessages anyways
                case "api_req_retried": // this message is used to update the latest api_req_started that the request was retried
                case "deleted_api_reqs": // aggregated api_req metrics from deleted messages
                    return false;
                case "text":
                    // Sometimes cline returns an empty text message, we don't want to render these. (We also use a say text for user messages, so in case they just sent images we still render that)
                    if (((_a = message.text) !== null && _a !== void 0 ? _a : "") === "" && ((_c = (_b = message.images) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) === 0) {
                        return false;
                    }
                    break;
                case "mcp_server_request_started":
                    return false;
            }
            return true;
        });
    }, [modifiedMessages]);
    var isBrowserSessionMessage = function (message) {
        // which of visible messages are browser session messages, see above
        if (message.type === "ask") {
            return ["browser_action_launch"].includes(message.ask);
        }
        if (message.type === "say") {
            return ["browser_action_launch", "api_req_started", "text", "browser_action", "browser_action_result"].includes(message.say);
        }
        return false;
    };
    var groupedMessages = (0, react_2.useMemo)(function () {
        var result = [];
        var currentGroup = [];
        var isInBrowserSession = false;
        var endBrowserSession = function () {
            if (currentGroup.length > 0) {
                result.push(__spreadArray([], currentGroup, true));
                currentGroup = [];
                isInBrowserSession = false;
            }
        };
        visibleMessages.forEach(function (message) {
            if (message.ask === "browser_action_launch" || message.say === "browser_action_launch") {
                // complete existing browser session if any
                endBrowserSession();
                // start new
                isInBrowserSession = true;
                currentGroup.push(message);
            }
            else if (isInBrowserSession) {
                // end session if api_req_started is cancelled
                if (message.say === "api_req_started") {
                    // get last api_req_started in currentGroup to check if it's cancelled. If it is then this api req is not part of the current browser session
                    var lastApiReqStarted = __spreadArray([], currentGroup, true).reverse().find(function (m) { return m.say === "api_req_started"; });
                    if ((lastApiReqStarted === null || lastApiReqStarted === void 0 ? void 0 : lastApiReqStarted.text) != null) {
                        var info = JSON.parse(lastApiReqStarted.text);
                        var isCancelled = info.cancelReason != null;
                        if (isCancelled) {
                            endBrowserSession();
                            result.push(message);
                            return;
                        }
                    }
                }
                if (isBrowserSessionMessage(message)) {
                    currentGroup.push(message);
                    // Check if this is a close action
                    if (message.say === "browser_action") {
                        var browserAction = JSON.parse(message.text || "{}");
                        if (browserAction.action === "close") {
                            endBrowserSession();
                        }
                    }
                }
                else {
                    // complete existing browser session if any
                    endBrowserSession();
                    result.push(message);
                }
            }
            else {
                result.push(message);
            }
        });
        // Handle case where browser session is the last group
        if (currentGroup.length > 0) {
            result.push(__spreadArray([], currentGroup, true));
        }
        return result;
    }, [visibleMessages]);
    // scrolling
    var scrollToBottomSmooth = (0, react_2.useMemo)(function () {
        return (0, debounce_1.default)(function () {
            var _a;
            (_a = virtuosoRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
                top: Number.MAX_SAFE_INTEGER,
                behavior: "smooth",
            });
        }, 10, { immediate: true });
    }, []);
    var scrollToBottomAuto = (0, react_2.useCallback)(function () {
        var _a;
        (_a = virtuosoRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
            top: Number.MAX_SAFE_INTEGER,
            behavior: "auto", // instant causes crash
        });
    }, []);
    // scroll when user toggles certain rows
    var toggleRowExpansion = (0, react_2.useCallback)(function (ts) {
        var _a;
        var isCollapsing = (_a = expandedRows[ts]) !== null && _a !== void 0 ? _a : false;
        var lastGroup = groupedMessages.at(-1);
        var isLast = Array.isArray(lastGroup) ? lastGroup[0].ts === ts : (lastGroup === null || lastGroup === void 0 ? void 0 : lastGroup.ts) === ts;
        var secondToLastGroup = groupedMessages.at(-2);
        var isSecondToLast = Array.isArray(secondToLastGroup)
            ? secondToLastGroup[0].ts === ts
            : (secondToLastGroup === null || secondToLastGroup === void 0 ? void 0 : secondToLastGroup.ts) === ts;
        var isLastCollapsedApiReq = isLast &&
            !Array.isArray(lastGroup) && // Make sure it's not a browser session group
            (lastGroup === null || lastGroup === void 0 ? void 0 : lastGroup.say) === "api_req_started" &&
            !expandedRows[lastGroup.ts];
        setExpandedRows(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[ts] = !prev[ts], _a)));
        });
        // disable auto scroll when user expands row
        if (!isCollapsing) {
            disableAutoScrollRef.current = true;
        }
        if (isCollapsing && isAtBottom) {
            var timer_1 = setTimeout(function () {
                scrollToBottomAuto();
            }, 0);
            return function () { return clearTimeout(timer_1); };
        }
        else if (isLast || isSecondToLast) {
            if (isCollapsing) {
                if (isSecondToLast && !isLastCollapsedApiReq) {
                    return;
                }
                var timer_2 = setTimeout(function () {
                    scrollToBottomAuto();
                }, 0);
                return function () { return clearTimeout(timer_2); };
            }
            else {
                var timer_3 = setTimeout(function () {
                    var _a;
                    (_a = virtuosoRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
                        index: groupedMessages.length - (isLast ? 1 : 2),
                        align: "start",
                    });
                }, 0);
                return function () { return clearTimeout(timer_3); };
            }
        }
    }, [groupedMessages, expandedRows, scrollToBottomAuto, isAtBottom]);
    var handleRowHeightChange = (0, react_2.useCallback)(function (isTaller) {
        if (!disableAutoScrollRef.current) {
            if (isTaller) {
                scrollToBottomSmooth();
            }
            else {
                setTimeout(function () {
                    scrollToBottomAuto();
                }, 0);
            }
        }
    }, [scrollToBottomSmooth, scrollToBottomAuto]);
    (0, react_2.useEffect)(function () {
        if (!disableAutoScrollRef.current) {
            setTimeout(function () {
                scrollToBottomSmooth();
            }, 50);
            // return () => clearTimeout(timer) // dont cleanup since if visibleMessages.length changes it cancels.
        }
    }, [groupedMessages.length, scrollToBottomSmooth]);
    var handleWheel = (0, react_2.useCallback)(function (event) {
        var _a;
        var wheelEvent = event;
        if (wheelEvent.deltaY && wheelEvent.deltaY < 0) {
            if ((_a = scrollContainerRef.current) === null || _a === void 0 ? void 0 : _a.contains(wheelEvent.target)) {
                // user scrolled up
                disableAutoScrollRef.current = true;
            }
        }
    }, []);
    (0, react_use_1.useEvent)("wheel", handleWheel, window, { passive: true }); // passive improves scrolling performance
    var placeholderText = (0, react_2.useMemo)(function () {
        var text = task ? "Type a message..." : "Type your task here...";
        return text;
    }, [task]);
    var itemContent = (0, react_2.useCallback)(function (index, messageOrGroup) {
        // browser session group
        if (Array.isArray(messageOrGroup)) {
            return (<BrowserSessionRow_1.default messages={messageOrGroup} isLast={index === groupedMessages.length - 1} lastModifiedMessage={modifiedMessages.at(-1)} onHeightChange={handleRowHeightChange} 
            // Pass handlers for each message in the group
            isExpanded={function (messageTs) { var _a; return (_a = expandedRows[messageTs]) !== null && _a !== void 0 ? _a : false; }} onToggleExpand={function (messageTs) {
                    setExpandedRows(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[messageTs] = !prev[messageTs], _a)));
                    });
                }}/>);
        }
        // regular message
        return (<ChatRow_1.default key={messageOrGroup.ts} message={messageOrGroup} isExpanded={expandedRows[messageOrGroup.ts] || false} onToggleExpand={function () { return toggleRowExpansion(messageOrGroup.ts); }} lastModifiedMessage={modifiedMessages.at(-1)} isLast={index === groupedMessages.length - 1} onHeightChange={handleRowHeightChange}/>);
    }, [expandedRows, modifiedMessages, groupedMessages.length, toggleRowExpansion, handleRowHeightChange]);
    return (<div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: isHidden ? "none" : "flex",
            flexDirection: "column",
            overflow: "hidden",
        }}>
			{task ? (<TaskHeader_1.default task={task} tokensIn={apiMetrics.totalTokensIn} tokensOut={apiMetrics.totalTokensOut} doesModelSupportPromptCache={selectedModelInfo.supportsPromptCache} cacheWrites={apiMetrics.totalCacheWrites} cacheReads={apiMetrics.totalCacheReads} totalCost={apiMetrics.totalCost} lastApiReqTotalTokens={lastApiReqTotalTokens} onClose={handleTaskCloseButtonClick}/>) : (<div style={{
                flex: "1 1 0", // flex-grow: 1, flex-shrink: 1, flex-basis: 0
                minHeight: 0,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                paddingBottom: "10px",
            }}>
					{telemetrySetting === "unset" && <TelemetryBanner_1.default />}

					{showAnnouncement && <Announcement_1.default version={version} hideAnnouncement={hideAnnouncement}/>}

					<div style={{ padding: "0 20px", flexShrink: 0 }}>
						<h2>What can I do for you?</h2>
						<p>
							Thanks to{" "}
							<react_1.VSCodeLink href="https://www.anthropic.com/claude/sonnet" style={{ display: "inline" }}>
								Claude 3.7 Sonnet's
							</react_1.VSCodeLink>
							agentic coding capabilities, I can handle complex software development tasks step-by-step. With tools
							that let me create & edit files, explore complex projects, use a browser, and execute terminal
							commands (after you grant permission), I can assist you in ways that go beyond code completion or tech
							support. I can even use MCP to create new tools and extend my own capabilities.
						</p>
					</div>
					{taskHistory.length > 0 && <HistoryPreview_1.default showHistoryView={showHistoryView}/>}
				</div>)}

			{/*
        // Flex layout explanation:
        // 1. Content div above uses flex: "1 1 0" to:
        //    - Grow to fill available space (flex-grow: 1)
        //    - Shrink when AutoApproveMenu needs space (flex-shrink: 1)
        //    - Start from zero size (flex-basis: 0) to ensure proper distribution
        //    minHeight: 0 allows it to shrink below its content height
        //
        // 2. AutoApproveMenu uses flex: "0 1 auto" to:
        //    - Not grow beyond its content (flex-grow: 0)
        //    - Shrink when viewport is small (flex-shrink: 1)
        //    - Use its content size as basis (flex-basis: auto)
        //    This ensures it takes its natural height when there's space
        //    but becomes scrollable when the viewport is too small
        */}
			{!task && (<AutoApproveMenu_1.default style={{
                marginBottom: -2,
                flex: "0 1 auto", // flex-grow: 0, flex-shrink: 1, flex-basis: auto
                minHeight: 0,
            }}/>)}

			{task && (<>
					<div style={{ flexGrow: 1, display: "flex" }} ref={scrollContainerRef}>
						<react_virtuoso_1.Virtuoso ref={virtuosoRef} key={task.ts} // trick to make sure virtuoso re-renders when task changes, and we use initialTopMostItemIndex to start at the bottom
         className="scrollable" style={{
                flexGrow: 1,
                overflowY: "scroll", // always show scrollbar
            }} components={{
                Footer: function () { return <div style={{ height: 5 }}/>; }, // Add empty padding at the bottom
            }} 
        // increasing top by 3_000 to prevent jumping around when user collapses a row
        increaseViewportBy={{
                top: 3000,
                bottom: Number.MAX_SAFE_INTEGER,
            }} // hack to make sure the last message is always rendered to get truly perfect scroll to bottom animation when new messages are added (Number.MAX_SAFE_INTEGER is safe for arithmetic operations, which is all virtuoso uses this value for in src/sizeRangeSystem.ts)
         data={groupedMessages} // messages is the raw format returned by extension, modifiedMessages is the manipulated structure that combines certain messages of related type, and visibleMessages is the filtered structure that removes messages that should not be rendered
         itemContent={itemContent} atBottomStateChange={function (isAtBottom) {
                setIsAtBottom(isAtBottom);
                if (isAtBottom) {
                    disableAutoScrollRef.current = false;
                }
                setShowScrollToBottom(disableAutoScrollRef.current && !isAtBottom);
            }} atBottomThreshold={10} // anything lower causes issues with followOutput
         initialTopMostItemIndex={groupedMessages.length - 1}/>
					</div>
					<AutoApproveMenu_1.default />
					{showScrollToBottom ? (<div style={{
                    display: "flex",
                    padding: "10px 15px 0px 15px",
                }}>
							<ScrollToBottomButton onClick={function () {
                    scrollToBottomSmooth();
                    disableAutoScrollRef.current = false;
                }}>
								<span className="codicon codicon-chevron-down" style={{ fontSize: "18px" }}></span>
							</ScrollToBottomButton>
						</div>) : (<div style={{
                    opacity: primaryButtonText || secondaryButtonText || isStreaming
                        ? enableButtons || (isStreaming && !didClickCancel)
                            ? 1
                            : 0.5
                        : 0,
                    display: "flex",
                    padding: "".concat(primaryButtonText || secondaryButtonText || isStreaming ? "10" : "0", "px 15px 0px 15px"),
                }}>
							{primaryButtonText && !isStreaming && (<react_1.VSCodeButton appearance="primary" disabled={!enableButtons} style={{
                        flex: secondaryButtonText ? 1 : 2,
                        marginRight: secondaryButtonText ? "6px" : "0",
                    }} onClick={function () { return handlePrimaryButtonClick(inputValue, selectedImages); }}>
									{primaryButtonText}
								</react_1.VSCodeButton>)}
							{(secondaryButtonText || isStreaming) && (<react_1.VSCodeButton appearance="secondary" disabled={!enableButtons && !(isStreaming && !didClickCancel)} style={{
                        flex: isStreaming ? 2 : 1,
                        marginLeft: isStreaming ? 0 : "6px",
                    }} onClick={function () { return handleSecondaryButtonClick(inputValue, selectedImages); }}>
									{isStreaming ? "Cancel" : secondaryButtonText}
								</react_1.VSCodeButton>)}
						</div>)}
				</>)}
			<ChatTextArea_1.default ref={textAreaRef} inputValue={inputValue} setInputValue={setInputValue} textAreaDisabled={textAreaDisabled} placeholderText={placeholderText} selectedImages={selectedImages} setSelectedImages={setSelectedImages} onSend={function () { return handleSendMessage(inputValue, selectedImages); }} onSelectImages={selectImages} shouldDisableImages={shouldDisableImages} onHeightChange={function () {
            if (isAtBottom) {
                scrollToBottomAuto();
            }
        }}/>
		</div>);
};
var ScrollToBottomButton = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tbackground-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 55%, transparent);\n\tborder-radius: 3px;\n\toverflow: hidden;\n\tcursor: pointer;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tflex: 1;\n\theight: 25px;\n\n\t&:hover {\n\t\tbackground-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 90%, transparent);\n\t}\n\n\t&:active {\n\t\tbackground-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 70%, transparent);\n\t}\n"], ["\n\tbackground-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 55%, transparent);\n\tborder-radius: 3px;\n\toverflow: hidden;\n\tcursor: pointer;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tflex: 1;\n\theight: 25px;\n\n\t&:hover {\n\t\tbackground-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 90%, transparent);\n\t}\n\n\t&:active {\n\t\tbackground-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 70%, transparent);\n\t}\n"])));
exports.default = ChatView;
var templateObject_1;
