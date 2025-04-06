"use strict";
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
exports.highlight = void 0;
var react_1 = require("@vscode/webview-ui-toolkit/react");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var vscode_1 = require("@/utils/vscode");
var react_virtuoso_1 = require("react-virtuoso");
var react_2 = require("react");
var fuse_js_1 = require("fuse.js");
var format_1 = require("@/utils/format");
var format_2 = require("@/utils/format");
var react_use_1 = require("react-use");
var DangerButton_1 = require("@/components/common/DangerButton");
var HistoryView = function (_a) {
    var onDone = _a.onDone;
    var _b = (0, ExtensionStateContext_1.useExtensionState)(), taskHistory = _b.taskHistory, totalTasksSize = _b.totalTasksSize;
    var _c = (0, react_2.useState)(""), searchQuery = _c[0], setSearchQuery = _c[1];
    var _d = (0, react_2.useState)("newest"), sortOption = _d[0], setSortOption = _d[1];
    var _e = (0, react_2.useState)("newest"), lastNonRelevantSort = _e[0], setLastNonRelevantSort = _e[1];
    var _f = (0, react_2.useState)(false), deleteAllDisabled = _f[0], setDeleteAllDisabled = _f[1];
    var handleMessage = (0, react_2.useCallback)(function (event) {
        if (event.data.type === "relinquishControl") {
            setDeleteAllDisabled(false);
        }
    }, []);
    (0, react_use_1.useEvent)("message", handleMessage);
    // Request total tasks size when component mounts
    (0, react_2.useEffect)(function () {
        vscode_1.vscode.postMessage({ type: "requestTotalTasksSize" });
    }, []);
    (0, react_2.useEffect)(function () {
        if (searchQuery && sortOption !== "mostRelevant" && !lastNonRelevantSort) {
            setLastNonRelevantSort(sortOption);
            setSortOption("mostRelevant");
        }
        else if (!searchQuery && sortOption === "mostRelevant" && lastNonRelevantSort) {
            setSortOption(lastNonRelevantSort);
            setLastNonRelevantSort(null);
        }
    }, [searchQuery, sortOption, lastNonRelevantSort]);
    var handleHistorySelect = function (id) {
        vscode_1.vscode.postMessage({ type: "showTaskWithId", text: id });
    };
    var handleDeleteHistoryItem = function (id) {
        vscode_1.vscode.postMessage({ type: "deleteTaskWithId", text: id });
    };
    var formatDate = function (timestamp) {
        var date = new Date(timestamp);
        return date === null || date === void 0 ? void 0 : date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).replace(", ", " ").replace(" at", ",").toUpperCase();
    };
    var presentableTasks = (0, react_2.useMemo)(function () {
        return taskHistory.filter(function (item) { return item.ts && item.task; });
    }, [taskHistory]);
    var fuse = (0, react_2.useMemo)(function () {
        return new fuse_js_1.default(presentableTasks, {
            keys: ["task"],
            threshold: 0.6,
            shouldSort: true,
            isCaseSensitive: false,
            ignoreLocation: false,
            includeMatches: true,
            minMatchCharLength: 1,
        });
    }, [presentableTasks]);
    var taskHistorySearchResults = (0, react_2.useMemo)(function () {
        var results = searchQuery ? (0, exports.highlight)(fuse.search(searchQuery)) : presentableTasks;
        results.sort(function (a, b) {
            switch (sortOption) {
                case "oldest":
                    return a.ts - b.ts;
                case "mostExpensive":
                    return (b.totalCost || 0) - (a.totalCost || 0);
                case "mostTokens":
                    return ((b.tokensIn || 0) +
                        (b.tokensOut || 0) +
                        (b.cacheWrites || 0) +
                        (b.cacheReads || 0) -
                        ((a.tokensIn || 0) + (a.tokensOut || 0) + (a.cacheWrites || 0) + (a.cacheReads || 0)));
                case "mostRelevant":
                    // NOTE: you must never sort directly on object since it will cause members to be reordered
                    return searchQuery ? 0 : b.ts - a.ts; // Keep fuse order if searching, otherwise sort by newest
                case "newest":
                default:
                    return b.ts - a.ts;
            }
        });
        return results;
    }, [presentableTasks, searchQuery, fuse, sortOption]);
    return (<>
			<style>
				{"\n\t\t\t\t\t.history-item:hover {\n\t\t\t\t\t\tbackground-color: var(--vscode-list-hoverBackground);\n\t\t\t\t\t}\n\t\t\t\t\t.delete-button, .export-button {\n\t\t\t\t\t\topacity: 0;\n\t\t\t\t\t\tpointer-events: none;\n\t\t\t\t\t}\n\t\t\t\t\t.history-item:hover .delete-button,\n\t\t\t\t\t.history-item:hover .export-button {\n\t\t\t\t\t\topacity: 1;\n\t\t\t\t\t\tpointer-events: auto;\n\t\t\t\t\t}\n\t\t\t\t\t.history-item-highlight {\n\t\t\t\t\t\tbackground-color: var(--vscode-editor-findMatchHighlightBackground);\n\t\t\t\t\t\tcolor: inherit;\n\t\t\t\t\t}\n\t\t\t\t"}
			</style>
			<div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }}>
				<div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 17px 10px 20px",
        }}>
					<h3 style={{
            color: "var(--vscode-foreground)",
            margin: 0,
        }}>
						History
					</h3>
					<react_1.VSCodeButton onClick={onDone}>Done</react_1.VSCodeButton>
				</div>
				<div style={{ padding: "5px 17px 6px 17px" }}>
					<div style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
        }}>
						<react_1.VSCodeTextField style={{ width: "100%" }} placeholder="Fuzzy search history..." value={searchQuery} onInput={function (e) {
            var _a;
            var newValue = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
            setSearchQuery(newValue);
            if (newValue && !searchQuery && sortOption !== "mostRelevant") {
                setLastNonRelevantSort(sortOption);
                setSortOption("mostRelevant");
            }
        }}>
							<div slot="start" className="codicon codicon-search" style={{
            fontSize: 13,
            marginTop: 2.5,
            opacity: 0.8,
        }}></div>
							{searchQuery && (<div className="input-icon-button codicon codicon-close" aria-label="Clear search" onClick={function () { return setSearchQuery(""); }} slot="end" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}/>)}
						</react_1.VSCodeTextField>
						<react_1.VSCodeRadioGroup style={{ display: "flex", flexWrap: "wrap" }} value={sortOption} onChange={function (e) { return setSortOption(e.target.value); }}>
							<react_1.VSCodeRadio value="newest">Newest</react_1.VSCodeRadio>
							<react_1.VSCodeRadio value="oldest">Oldest</react_1.VSCodeRadio>
							<react_1.VSCodeRadio value="mostExpensive">Most Expensive</react_1.VSCodeRadio>
							<react_1.VSCodeRadio value="mostTokens">Most Tokens</react_1.VSCodeRadio>
							<react_1.VSCodeRadio value="mostRelevant" disabled={!searchQuery} style={{ opacity: searchQuery ? 1 : 0.5 }}>
								Most Relevant
							</react_1.VSCodeRadio>
						</react_1.VSCodeRadioGroup>
					</div>
				</div>
				<div style={{ flexGrow: 1, overflowY: "auto", margin: 0 }}>
					{/* {presentableTasks.length === 0 && (
            <div
                style={{
                    
                    alignItems: "center",
                    fontStyle: "italic",
                    color: "var(--vscode-descriptionForeground)",
                    textAlign: "center",
                    padding: "0px 10px",
                }}>
                <span
                    className="codicon codicon-robot"
                    style={{ fontSize: "60px", marginBottom: "10px" }}></span>
                <div>Start a task to see it here</div>
            </div>
        )} */}
					<react_virtuoso_1.Virtuoso style={{
            flexGrow: 1,
            overflowY: "scroll",
        }} data={taskHistorySearchResults} itemContent={function (index, item) {
            var _a;
            return (<div key={item.id} className="history-item" style={{
                    cursor: "pointer",
                    borderBottom: index < taskHistory.length - 1 ? "1px solid var(--vscode-panel-border)" : "none",
                }} onClick={function () { return handleHistorySelect(item.id); }}>
								<div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "12px 20px",
                    position: "relative",
                }}>
									<div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
										<span style={{
                    color: "var(--vscode-descriptionForeground)",
                    fontWeight: 500,
                    fontSize: "0.85em",
                    textTransform: "uppercase",
                }}>
											{formatDate(item.ts)}
										</span>
										<react_1.VSCodeButton appearance="icon" onClick={function (e) {
                    e.stopPropagation();
                    handleDeleteHistoryItem(item.id);
                }} className="delete-button" style={{ padding: "0px 0px" }}>
											<div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    fontSize: "11px",
                    // fontWeight: "bold",
                }}>
												<span className="codicon codicon-trash"></span>
												{(0, format_2.formatSize)(item.size)}
											</div>
										</react_1.VSCodeButton>
									</div>
									<div style={{
                    fontSize: "var(--vscode-font-size)",
                    color: "var(--vscode-foreground)",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                }} dangerouslySetInnerHTML={{
                    __html: item.task,
                }}/>
									<div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                }}>
										<div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
											<div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    flexWrap: "wrap",
                }}>
												<span style={{
                    fontWeight: 500,
                    color: "var(--vscode-descriptionForeground)",
                }}>
													Tokens:
												</span>
												<span style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    color: "var(--vscode-descriptionForeground)",
                }}>
													<i className="codicon codicon-arrow-up" style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "-2px",
                }}/>
													{(0, format_1.formatLargeNumber)(item.tokensIn || 0)}
												</span>
												<span style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    color: "var(--vscode-descriptionForeground)",
                }}>
													<i className="codicon codicon-arrow-down" style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "-2px",
                }}/>
													{(0, format_1.formatLargeNumber)(item.tokensOut || 0)}
												</span>
											</div>
											{!item.totalCost && <ExportButton itemId={item.id}/>}
										</div>

										{!!item.cacheWrites && (<div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        flexWrap: "wrap",
                    }}>
												<span style={{
                        fontWeight: 500,
                        color: "var(--vscode-descriptionForeground)",
                    }}>
													Cache:
												</span>
												<span style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        color: "var(--vscode-descriptionForeground)",
                    }}>
													<i className="codicon codicon-database" style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        marginBottom: "-1px",
                    }}/>
													+{(0, format_1.formatLargeNumber)(item.cacheWrites || 0)}
												</span>
												<span style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        color: "var(--vscode-descriptionForeground)",
                    }}>
													<i className="codicon codicon-arrow-right" style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        marginBottom: 0,
                    }}/>
													{(0, format_1.formatLargeNumber)(item.cacheReads || 0)}
												</span>
											</div>)}
										{!!item.totalCost && (<div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: -2,
                    }}>
												<div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                    }}>
													<span style={{
                        fontWeight: 500,
                        color: "var(--vscode-descriptionForeground)",
                    }}>
														API Cost:
													</span>
													<span style={{
                        color: "var(--vscode-descriptionForeground)",
                    }}>
														${(_a = item.totalCost) === null || _a === void 0 ? void 0 : _a.toFixed(4)}
													</span>
												</div>
												<ExportButton itemId={item.id}/>
											</div>)}
									</div>
								</div>
							</div>);
        }}/>
				</div>
				<div style={{
            padding: "10px 10px",
            borderTop: "1px solid var(--vscode-panel-border)",
        }}>
					<DangerButton_1.default style={{ width: "100%" }} disabled={deleteAllDisabled || taskHistory.length === 0} onClick={function () {
            setDeleteAllDisabled(true);
            vscode_1.vscode.postMessage({ type: "clearAllTaskHistory" });
        }}>
						Delete All History{totalTasksSize !== null ? " (".concat((0, format_2.formatSize)(totalTasksSize), ")") : ""}
					</DangerButton_1.default>
				</div>
			</div>
		</>);
};
var ExportButton = function (_a) {
    var itemId = _a.itemId;
    return (<react_1.VSCodeButton className="export-button" appearance="icon" onClick={function (e) {
            e.stopPropagation();
            vscode_1.vscode.postMessage({ type: "exportTaskWithId", text: itemId });
        }}>
		<div style={{ fontSize: "11px", fontWeight: 500, opacity: 1 }}>EXPORT</div>
	</react_1.VSCodeButton>);
};
// https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0
var highlight = function (fuseSearchResult, highlightClassName) {
    if (highlightClassName === void 0) { highlightClassName = "history-item-highlight"; }
    var set = function (obj, path, value) {
        var pathValue = path.split(".");
        var i;
        for (i = 0; i < pathValue.length - 1; i++) {
            obj = obj[pathValue[i]];
        }
        obj[pathValue[i]] = value;
    };
    // Function to merge overlapping regions
    var mergeRegions = function (regions) {
        if (regions.length === 0)
            return regions;
        // Sort regions by start index
        regions.sort(function (a, b) { return a[0] - b[0]; });
        var merged = [regions[0]];
        for (var i = 1; i < regions.length; i++) {
            var last = merged[merged.length - 1];
            var current = regions[i];
            if (current[0] <= last[1] + 1) {
                // Overlapping or adjacent regions
                last[1] = Math.max(last[1], current[1]);
            }
            else {
                merged.push(current);
            }
        }
        return merged;
    };
    var generateHighlightedText = function (inputText, regions) {
        if (regions === void 0) { regions = []; }
        if (regions.length === 0) {
            return inputText;
        }
        // Sort and merge overlapping regions
        var mergedRegions = mergeRegions(regions);
        var content = "";
        var nextUnhighlightedRegionStartingIndex = 0;
        mergedRegions.forEach(function (region) {
            var start = region[0];
            var end = region[1];
            var lastRegionNextIndex = end + 1;
            content += [
                inputText.substring(nextUnhighlightedRegionStartingIndex, start),
                "<span class=\"".concat(highlightClassName, "\">"),
                inputText.substring(start, lastRegionNextIndex),
                "</span>",
            ].join("");
            nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
        });
        content += inputText.substring(nextUnhighlightedRegionStartingIndex);
        return content;
    };
    return fuseSearchResult
        .filter(function (_a) {
        var matches = _a.matches;
        return matches && matches.length;
    })
        .map(function (_a) {
        var item = _a.item, matches = _a.matches;
        var highlightedItem = __assign({}, item);
        matches === null || matches === void 0 ? void 0 : matches.forEach(function (match) {
            if (match.key && typeof match.value === "string" && match.indices) {
                // Merge overlapping regions before generating highlighted text
                var mergedIndices = mergeRegions(__spreadArray([], match.indices, true));
                set(highlightedItem, match.key, generateHighlightedText(match.value, mergedIndices));
            }
        });
        return highlightedItem;
    });
};
exports.highlight = highlight;
exports.default = (0, react_2.memo)(HistoryView);
