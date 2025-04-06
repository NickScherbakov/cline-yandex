"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightMentions = void 0;
var react_1 = require("@vscode/webview-ui-toolkit/react");
var react_2 = require("react");
var react_use_1 = require("react-use");
var context_mentions_1 = require("@shared/context-mentions");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var format_1 = require("@/utils/format");
var format_2 = require("@/utils/format");
var vscode_1 = require("@/utils/vscode");
var Thumbnails_1 = require("@/components/common/Thumbnails");
var ApiOptions_1 = require("@/components/settings/ApiOptions");
var TaskHeader = function (_a) {
    var task = _a.task, tokensIn = _a.tokensIn, tokensOut = _a.tokensOut, doesModelSupportPromptCache = _a.doesModelSupportPromptCache, cacheWrites = _a.cacheWrites, cacheReads = _a.cacheReads, totalCost = _a.totalCost, lastApiReqTotalTokens = _a.lastApiReqTotalTokens, onClose = _a.onClose;
    var _b = (0, ExtensionStateContext_1.useExtensionState)(), apiConfiguration = _b.apiConfiguration, currentTaskItem = _b.currentTaskItem, checkpointTrackerErrorMessage = _b.checkpointTrackerErrorMessage;
    var _c = (0, react_2.useState)(false), isTaskExpanded = _c[0], setIsTaskExpanded = _c[1];
    var _d = (0, react_2.useState)(false), isTextExpanded = _d[0], setIsTextExpanded = _d[1];
    var _e = (0, react_2.useState)(false), showSeeMore = _e[0], setShowSeeMore = _e[1];
    var textContainerRef = (0, react_2.useRef)(null);
    var textRef = (0, react_2.useRef)(null);
    var selectedModelInfo = (0, react_2.useMemo)(function () { return (0, ApiOptions_1.normalizeApiConfiguration)(apiConfiguration); }, [apiConfiguration]).selectedModelInfo;
    var contextWindow = selectedModelInfo === null || selectedModelInfo === void 0 ? void 0 : selectedModelInfo.contextWindow;
    // Open task header when checkpoint tracker error message is set
    var prevErrorMessageRef = (0, react_2.useRef)(checkpointTrackerErrorMessage);
    (0, react_2.useEffect)(function () {
        if (checkpointTrackerErrorMessage !== prevErrorMessageRef.current) {
            setIsTaskExpanded(true);
            prevErrorMessageRef.current = checkpointTrackerErrorMessage;
        }
    }, [checkpointTrackerErrorMessage]);
    // Reset isTextExpanded when task is collapsed
    (0, react_2.useEffect)(function () {
        if (!isTaskExpanded) {
            setIsTextExpanded(false);
        }
    }, [isTaskExpanded]);
    /*
    When dealing with event listeners in React components that depend on state variables, we face a challenge. We want our listener to always use the most up-to-date version of a callback function that relies on current state, but we don't want to constantly add and remove event listeners as that function updates. This scenario often arises with resize listeners or other window events. Simply adding the listener in a useEffect with an empty dependency array risks using stale state, while including the callback in the dependencies can lead to unnecessary re-registrations of the listener. There are react hook libraries that provide a elegant solution to this problem by utilizing the useRef hook to maintain a reference to the latest callback function without triggering re-renders or effect re-runs. This approach ensures that our event listener always has access to the most current state while minimizing performance overhead and potential memory leaks from multiple listener registrations.
    Sources
    - https://usehooks-ts.com/react-hook/use-event-listener
    - https://streamich.github.io/react-use/?path=/story/sensors-useevent--docs
    - https://github.com/streamich/react-use/blob/master/src/useEvent.ts
    - https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks

    Before:
    
    const updateMaxHeight = useCallback(() => {
        if (isExpanded && textContainerRef.current) {
            const maxHeight = window.innerHeight * (3 / 5)
            textContainerRef.current.style.maxHeight = `${maxHeight}px`
        }
    }, [isExpanded])

    useEffect(() => {
        updateMaxHeight()
    }, [isExpanded, updateMaxHeight])

    useEffect(() => {
        window.removeEventListener("resize", updateMaxHeight)
        window.addEventListener("resize", updateMaxHeight)
        return () => {
            window.removeEventListener("resize", updateMaxHeight)
        }
    }, [updateMaxHeight])

    After:
    */
    var _f = (0, react_use_1.useWindowSize)(), windowHeight = _f.height, windowWidth = _f.width;
    (0, react_2.useEffect)(function () {
        if (isTextExpanded && textContainerRef.current) {
            var maxHeight = windowHeight * (1 / 2);
            textContainerRef.current.style.maxHeight = "".concat(maxHeight, "px");
        }
    }, [isTextExpanded, windowHeight]);
    (0, react_2.useEffect)(function () {
        if (isTaskExpanded && textRef.current && textContainerRef.current) {
            // Use requestAnimationFrame to ensure DOM is fully updated
            requestAnimationFrame(function () {
                // Check if refs are still valid
                if (textRef.current && textContainerRef.current) {
                    var textContainerHeight = textContainerRef.current.clientHeight;
                    if (!textContainerHeight) {
                        textContainerHeight = textContainerRef.current.getBoundingClientRect().height;
                    }
                    var isOverflowing = textRef.current.scrollHeight > textContainerHeight;
                    setShowSeeMore(isOverflowing);
                }
            });
        }
    }, [task.text, windowWidth, isTaskExpanded]);
    var isCostAvailable = (0, react_2.useMemo)(function () {
        var _a, _b;
        var openAiCompatHasPricing = (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) === "openai" &&
            ((_a = apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openAiModelInfo) === null || _a === void 0 ? void 0 : _a.inputPrice) &&
            ((_b = apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openAiModelInfo) === null || _b === void 0 ? void 0 : _b.outputPrice);
        if (openAiCompatHasPricing) {
            return true;
        }
        return ((apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) !== "vscode-lm" &&
            (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) !== "ollama" &&
            (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) !== "lmstudio" &&
            (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) !== "gemini");
    }, [apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider, apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openAiModelInfo]);
    var shouldShowPromptCacheInfo = doesModelSupportPromptCache && (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) !== "openrouter" && (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) !== "cline";
    var ContextWindowComponent = (<>
			{isTaskExpanded && contextWindow && (<div style={{
                display: "flex",
                flexDirection: windowWidth < 270 ? "column" : "row",
                gap: "4px",
            }}>
					<div style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flexShrink: 0, // Prevents shrinking
            }}>
						<span style={{ fontWeight: "bold" }}>
							{/* {windowWidth > 280 && windowWidth < 310 ? "Context:" : "Context Window:"} */}
							Context Window:
						</span>
					</div>
					<div style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                flex: 1,
                whiteSpace: "nowrap",
            }}>
						<span>{(0, format_1.formatLargeNumber)(lastApiReqTotalTokens || 0)}</span>
						<div style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                flex: 1,
            }}>
							<div style={{
                flex: 1,
                height: "4px",
                backgroundColor: "color-mix(in srgb, var(--vscode-badge-foreground) 20%, transparent)",
                borderRadius: "2px",
                overflow: "hidden",
            }}>
								<div style={{
                width: "".concat(((lastApiReqTotalTokens || 0) / contextWindow) * 100, "%"),
                height: "100%",
                backgroundColor: "var(--vscode-badge-foreground)",
                borderRadius: "2px",
            }}/>
							</div>
							<span>{(0, format_1.formatLargeNumber)(contextWindow)}</span>
						</div>
					</div>
				</div>)}
		</>);
    return (<div style={{ padding: "10px 13px 10px 13px" }}>
			<div style={{
            backgroundColor: "var(--vscode-badge-background)",
            color: "var(--vscode-badge-foreground)",
            borderRadius: "3px",
            padding: "9px 10px 9px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            position: "relative",
            zIndex: 1,
        }}>
				<div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
					<div style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginLeft: -2,
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            flexGrow: 1,
            minWidth: 0, // This allows the div to shrink below its content size
        }} onClick={function () { return setIsTaskExpanded(!isTaskExpanded); }}>
						<div style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
        }}>
							<span className={"codicon codicon-chevron-".concat(isTaskExpanded ? "down" : "right")}></span>
						</div>
						<div style={{
            marginLeft: 6,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexGrow: 1,
            minWidth: 0, // This allows the div to shrink below its content size
        }}>
							<span style={{ fontWeight: "bold" }}>
								Task
								{!isTaskExpanded && ":"}
							</span>
							{!isTaskExpanded && <span style={{ marginLeft: 4 }}>{(0, exports.highlightMentions)(task.text, false)}</span>}
						</div>
					</div>
					{!isTaskExpanded && isCostAvailable && (<div style={{
                marginLeft: 10,
                backgroundColor: "color-mix(in srgb, var(--vscode-badge-foreground) 70%, transparent)",
                color: "var(--vscode-badge-background)",
                padding: "2px 4px",
                borderRadius: "500px",
                fontSize: "11px",
                fontWeight: 500,
                display: "inline-block",
                flexShrink: 0,
            }}>
							${totalCost === null || totalCost === void 0 ? void 0 : totalCost.toFixed(4)}
						</div>)}
					<react_1.VSCodeButton appearance="icon" onClick={onClose} style={{ marginLeft: 6, flexShrink: 0 }}>
						<span className="codicon codicon-close"></span>
					</react_1.VSCodeButton>
				</div>
				{isTaskExpanded && (<>
						<div ref={textContainerRef} style={{
                marginTop: -2,
                fontSize: "var(--vscode-font-size)",
                overflowY: isTextExpanded ? "auto" : "hidden",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                position: "relative",
            }}>
							<div ref={textRef} style={{
                display: "-webkit-box",
                WebkitLineClamp: isTextExpanded ? "unset" : 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
            }}>
								{(0, exports.highlightMentions)(task.text, false)}
							</div>
							{!isTextExpanded && showSeeMore && (<div style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                }}>
									<div style={{
                    width: 30,
                    height: "1.2em",
                    background: "linear-gradient(to right, transparent, var(--vscode-badge-background))",
                }}/>
									<div style={{
                    cursor: "pointer",
                    color: "var(--vscode-textLink-foreground)",
                    paddingRight: 0,
                    paddingLeft: 3,
                    backgroundColor: "var(--vscode-badge-background)",
                }} onClick={function () { return setIsTextExpanded(!isTextExpanded); }}>
										See more
									</div>
								</div>)}
						</div>
						{isTextExpanded && showSeeMore && (<div style={{
                    cursor: "pointer",
                    color: "var(--vscode-textLink-foreground)",
                    marginLeft: "auto",
                    textAlign: "right",
                    paddingRight: 2,
                }} onClick={function () { return setIsTextExpanded(!isTextExpanded); }}>
								See less
							</div>)}
						{task.images && task.images.length > 0 && <Thumbnails_1.default images={task.images}/>}
						<div style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
            }}>
							<div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: 17,
            }}>
								<div style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flexWrap: "wrap",
            }}>
									<span style={{ fontWeight: "bold" }}>Tokens:</span>
									<span style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
            }}>
										<i className="codicon codicon-arrow-up" style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "-2px",
            }}/>
										{(0, format_1.formatLargeNumber)(tokensIn || 0)}
									</span>
									<span style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
            }}>
										<i className="codicon codicon-arrow-down" style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "-2px",
            }}/>
										{(0, format_1.formatLargeNumber)(tokensOut || 0)}
									</span>
								</div>
								{!isCostAvailable && (<DeleteButton taskSize={(0, format_2.formatSize)(currentTaskItem === null || currentTaskItem === void 0 ? void 0 : currentTaskItem.size)} taskId={currentTaskItem === null || currentTaskItem === void 0 ? void 0 : currentTaskItem.id}/>)}
							</div>

							{shouldShowPromptCacheInfo &&
                (cacheReads !== undefined ||
                    cacheWrites !== undefined ||
                    (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) === "anthropic") && (<div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    flexWrap: "wrap",
                }}>
										<span style={{ fontWeight: "bold" }}>Cache:</span>
										<span style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                }}>
											<i className="codicon codicon-database" style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "-1px",
                }}/>
											+{(0, format_1.formatLargeNumber)(cacheWrites || 0)}
										</span>
										<span style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                }}>
											<i className="codicon codicon-arrow-right" style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: 0,
                }}/>
											{(0, format_1.formatLargeNumber)(cacheReads || 0)}
										</span>
									</div>)}
							{ContextWindowComponent}
							{isCostAvailable && (<div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 17,
                }}>
									<div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                }}>
										<span style={{ fontWeight: "bold" }}>API Cost:</span>
										<span>${totalCost === null || totalCost === void 0 ? void 0 : totalCost.toFixed(4)}</span>
									</div>
									<DeleteButton taskSize={(0, format_2.formatSize)(currentTaskItem === null || currentTaskItem === void 0 ? void 0 : currentTaskItem.size)} taskId={currentTaskItem === null || currentTaskItem === void 0 ? void 0 : currentTaskItem.id}/>
								</div>)}
							{checkpointTrackerErrorMessage && (<div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--vscode-editorWarning-foreground)",
                    fontSize: "11px",
                }}>
									<i className="codicon codicon-warning"/>
									<span>
										{checkpointTrackerErrorMessage.replace(/disabling checkpoints\.$/, "")}
										{checkpointTrackerErrorMessage.endsWith("disabling checkpoints.") && (<>
												<a onClick={function () {
                        vscode_1.vscode.postMessage({
                            type: "openExtensionSettings",
                            text: "enableCheckpoints",
                        });
                    }} style={{
                        color: "inherit",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}>
													disabling checkpoints.
												</a>
											</>)}
										{checkpointTrackerErrorMessage.includes("Git must be installed to use checkpoints.") && (<>
												{" "}
												<a href="https://github.com/cline/cline/wiki/Installing-Git-for-Checkpoints" style={{
                        color: "inherit",
                        textDecoration: "underline",
                    }}>
													See here for instructions.
												</a>
											</>)}
									</span>
								</div>)}
						</div>
					</>)}
			</div>
			{/* {apiProvider === "" && (
            <div
                style={{
                    backgroundColor: "color-mix(in srgb, var(--vscode-badge-background) 50%, transparent)",
                    color: "var(--vscode-badge-foreground)",
                    borderRadius: "0 0 3px 3px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "4px 12px 6px 12px",
                    fontSize: "0.9em",
                    marginLeft: "10px",
                    marginRight: "10px",
                }}>
                <div style={{ fontWeight: "500" }}>Credits Remaining:</div>
                <div>
                    {formatPrice(Credits || 0)}
                    {(Credits || 0) < 1 && (
                        <>
                            {" "}
                            <VSCodeLink style={{ fontSize: "0.9em" }} href={getAddCreditsUrl(vscodeUriScheme)}>
                                (get more?)
                            </VSCodeLink>
                        </>
                    )}
                </div>
            </div>
        )} */}
		</div>);
};
var highlightMentions = function (text, withShadow) {
    if (withShadow === void 0) { withShadow = true; }
    if (!text)
        return text;
    var parts = text.split(context_mentions_1.mentionRegexGlobal);
    return parts.map(function (part, index) {
        if (index % 2 === 0) {
            // This is regular text
            return part;
        }
        else {
            // This is a mention
            return (<span key={index} className={withShadow ? "mention-context-highlight-with-shadow" : "mention-context-highlight"} style={{ cursor: "pointer" }} onClick={function () { return vscode_1.vscode.postMessage({ type: "openMention", text: part }); }}>
					@{part}
				</span>);
        }
    });
};
exports.highlightMentions = highlightMentions;
var DeleteButton = function (_a) {
    var taskSize = _a.taskSize, taskId = _a.taskId;
    return (<react_1.VSCodeButton appearance="icon" onClick={function () { return vscode_1.vscode.postMessage({ type: "deleteTaskWithId", text: taskId }); }} style={{ padding: "0px 0px" }}>
		<div style={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            fontSize: "10px",
            fontWeight: "bold",
            opacity: 0.6,
        }}>
			<i className={"codicon codicon-trash"}/>
			{taskSize}
		</div>
	</react_1.VSCodeButton>);
};
// const ExportButton = () => (
// 	<VSCodeButton
// 		appearance="icon"
// 		onClick={() => vscode.postMessage({ type: "exportCurrentTask" })}
// 		style={
// 			{
// 				// marginBottom: "-2px",
// 				// marginRight: "-2.5px",
// 			}
// 		}>
// 		<div style={{ fontSize: "10.5px", fontWeight: "bold", opacity: 0.6 }}>EXPORT</div>
// 	</VSCodeButton>
// )
exports.default = (0, react_2.memo)(TaskHeader);
