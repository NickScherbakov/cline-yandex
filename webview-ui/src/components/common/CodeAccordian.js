"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.cleanPathPrefix = void 0
var react_1 = require("react")
var getLanguageFromPath_1 = require("@/utils/getLanguageFromPath")
var CodeBlock_1 = require("@/components/common/CodeBlock")
/*
We need to remove leading non-alphanumeric characters from the path in order for our leading ellipses trick to work.
^: Anchors the match to the start of the string.
[^a-zA-Z0-9]+: Matches one or more characters that are not alphanumeric.
The replace method removes these matched characters, effectively trimming the string up to the first alphanumeric character.
*/
var cleanPathPrefix = function (path) {
	return path.replace(/^[^\u4e00-\u9fa5a-zA-Z0-9]+/, "")
}
exports.cleanPathPrefix = cleanPathPrefix
var CodeAccordian = function (_a) {
	var _b
	var code = _a.code,
		diff = _a.diff,
		language = _a.language,
		path = _a.path,
		isFeedback = _a.isFeedback,
		isConsoleLogs = _a.isConsoleLogs,
		isExpanded = _a.isExpanded,
		onToggleExpand = _a.onToggleExpand,
		isLoading = _a.isLoading
	var inferredLanguage = (0, react_1.useMemo)(
		function () {
			return (
				code &&
				(language !== null && language !== void 0
					? language
					: path
						? (0, getLanguageFromPath_1.getLanguageFromPath)(path)
						: undefined)
			)
		},
		[path, language, code],
	)
	return (
		<div
			style={{
				borderRadius: 3,
				backgroundColor: CodeBlock_1.CODE_BLOCK_BG_COLOR,
				overflow: "hidden", // This ensures the inner scrollable area doesn't overflow the rounded corners
				border: "1px solid var(--vscode-editorGroup-border)",
			}}>
			{(path || isFeedback || isConsoleLogs) && (
				<div
					style={{
						color: "var(--vscode-descriptionForeground)",
						display: "flex",
						alignItems: "center",
						padding: "9px 10px",
						cursor: isLoading ? "wait" : "pointer",
						opacity: isLoading ? 0.7 : 1,
						// pointerEvents: isLoading ? "none" : "auto",
						userSelect: "none",
						WebkitUserSelect: "none",
						MozUserSelect: "none",
						msUserSelect: "none",
					}}
					onClick={isLoading ? undefined : onToggleExpand}>
					{isFeedback || isConsoleLogs ? (
						<div style={{ display: "flex", alignItems: "center" }}>
							<span
								className={"codicon codicon-".concat(isFeedback ? "feedback" : "output")}
								style={{ marginRight: "6px" }}></span>
							<span
								style={{
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
									marginRight: "8px",
								}}>
								{isFeedback ? "User Edits" : "Console Logs"}
							</span>
						</div>
					) : (
						<>
							{(path === null || path === void 0 ? void 0 : path.startsWith(".")) && <span>.</span>}
							<span
								style={{
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
									marginRight: "8px",
									// trick to get ellipsis at beginning of string
									direction: "rtl",
									textAlign: "left",
								}}>
								{(0, exports.cleanPathPrefix)(path !== null && path !== void 0 ? path : "") + "\u200E"}
							</span>
						</>
					)}
					<div style={{ flexGrow: 1 }}></div>
					<span className={"codicon codicon-chevron-".concat(isExpanded ? "up" : "down")}></span>
				</div>
			)}
			{(!(path || isFeedback || isConsoleLogs) || isExpanded) && (
				<div
					//className="code-block-scrollable" this doesn't seem to be necessary anymore, on silicon macs it shows the native mac scrollbar instead of the vscode styled one
					style={{
						overflowX: "auto",
						overflowY: "hidden",
						maxWidth: "100%",
					}}>
					<CodeBlock_1.default
						source={""
							.concat("```")
							.concat(diff !== undefined ? "diff" : inferredLanguage, "\n")
							.concat(
								((_b = code !== null && code !== void 0 ? code : diff) !== null && _b !== void 0
									? _b
									: ""
								).trim(),
								"\n",
							)
							.concat("```")}
					/>
				</div>
			)}
		</div>
	)
}
// memo does shallow comparison of props, so if you need it to re-render when a nested object changes, you need to pass a custom comparison function
exports.default = (0, react_1.memo)(CodeAccordian)
