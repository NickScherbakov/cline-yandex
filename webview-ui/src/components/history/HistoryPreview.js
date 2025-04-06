"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@vscode/webview-ui-toolkit/react");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var vscode_1 = require("@/utils/vscode");
var react_2 = require("react");
var format_1 = require("@/utils/format");
var HistoryPreview = function (_a) {
    var showHistoryView = _a.showHistoryView;
    var taskHistory = (0, ExtensionStateContext_1.useExtensionState)().taskHistory;
    var handleHistorySelect = function (id) {
        vscode_1.vscode.postMessage({ type: "showTaskWithId", text: id });
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
    return (<div style={{ flexShrink: 0 }}>
			<style>
				{"\n\t\t\t\t\t.history-preview-item {\n\t\t\t\t\t\tbackground-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 65%, transparent);\n\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\topacity: 0.8;\n\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\tmargin-bottom: 12px;\n\t\t\t\t\t}\n\t\t\t\t\t.history-preview-item:hover {\n\t\t\t\t\t\tbackground-color: color-mix(in srgb, var(--vscode-toolbar-hoverBackground) 100%, transparent);\n\t\t\t\t\t\topacity: 1;\n\t\t\t\t\t\tpointer-events: auto;\n\t\t\t\t\t}\n\t\t\t\t"}
			</style>

			<div style={{
            color: "var(--vscode-descriptionForeground)",
            margin: "10px 20px 10px 20px",
            display: "flex",
            alignItems: "center",
        }}>
				<span className="codicon codicon-comment-discussion" style={{
            marginRight: "4px",
            transform: "scale(0.9)",
        }}></span>
				<span style={{
            fontWeight: 500,
            fontSize: "0.85em",
            textTransform: "uppercase",
        }}>
					Recent Tasks
				</span>
			</div>

			<div style={{ padding: "0px 20px 0 20px" }}>
				{taskHistory
            .filter(function (item) { return item.ts && item.task; })
            .slice(0, 3)
            .map(function (item) {
            var _a;
            return (<div key={item.id} className="history-preview-item" onClick={function () { return handleHistorySelect(item.id); }}>
							<div style={{ padding: "12px" }}>
								<div style={{ marginBottom: "8px" }}>
									<span style={{
                    color: "var(--vscode-descriptionForeground)",
                    fontWeight: 500,
                    fontSize: "0.85em",
                    textTransform: "uppercase",
                }}>
										{formatDate(item.ts)}
									</span>
								</div>
								<div style={{
                    fontSize: "var(--vscode-font-size)",
                    color: "var(--vscode-descriptionForeground)",
                    marginBottom: "8px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                }}>
									{item.task}
								</div>
								<div style={{
                    fontSize: "0.85em",
                    color: "var(--vscode-descriptionForeground)",
                }}>
									<span>
										Tokens: ↑{(0, format_1.formatLargeNumber)(item.tokensIn || 0)} ↓{(0, format_1.formatLargeNumber)(item.tokensOut || 0)}
									</span>
									{!!item.cacheWrites && (<>
											{" • "}
											<span>
												Cache: +{(0, format_1.formatLargeNumber)(item.cacheWrites || 0)} →{" "}
												{(0, format_1.formatLargeNumber)(item.cacheReads || 0)}
											</span>
										</>)}
									{!!item.totalCost && (<>
											{" • "}
											<span>API Cost: ${(_a = item.totalCost) === null || _a === void 0 ? void 0 : _a.toFixed(4)}</span>
										</>)}
								</div>
							</div>
						</div>);
        })}
				<div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
					<react_1.VSCodeButton appearance="icon" onClick={function () { return showHistoryView(); }} style={{
            opacity: 0.9,
        }}>
						<div style={{
            fontSize: "var(--vscode-font-size)",
            color: "var(--vscode-descriptionForeground)",
        }}>
							View all history
						</div>
					</react_1.VSCodeButton>
				</div>
			</div>
		</div>);
};
exports.default = (0, react_2.memo)(HistoryPreview);
