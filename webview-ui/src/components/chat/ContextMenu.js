"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("react")
var context_mentions_1 = require("@/utils/context-mentions")
var CodeAccordian_1 = require("@/components/common/CodeAccordian")
var ContextMenu = function (_a) {
	var onSelect = _a.onSelect,
		searchQuery = _a.searchQuery,
		onMouseDown = _a.onMouseDown,
		selectedIndex = _a.selectedIndex,
		setSelectedIndex = _a.setSelectedIndex,
		selectedType = _a.selectedType,
		queryItems = _a.queryItems,
		_b = _a.dynamicSearchResults,
		dynamicSearchResults = _b === void 0 ? [] : _b,
		_c = _a.isLoading,
		isLoading = _c === void 0 ? false : _c
	var menuRef = (0, react_1.useRef)(null)
	// State to show delayed loading indicator
	var _d = (0, react_1.useState)(false),
		showDelayedLoading = _d[0],
		setShowDelayedLoading = _d[1]
	var loadingTimeoutRef = (0, react_1.useRef)(null)
	var filteredOptions = (0, react_1.useMemo)(
		function () {
			var options = (0, context_mentions_1.getContextMenuOptions)(
				searchQuery,
				selectedType,
				queryItems,
				dynamicSearchResults,
			)
			return options
		},
		[searchQuery, selectedType, queryItems, dynamicSearchResults],
	)
	// Effect to handle delayed loading indicator (show "Searching..." after 500ms of searching)
	;(0, react_1.useEffect)(
		function () {
			if (loadingTimeoutRef.current) {
				clearTimeout(loadingTimeoutRef.current)
				loadingTimeoutRef.current = null
			}
			if (isLoading && searchQuery) {
				setShowDelayedLoading(false)
				loadingTimeoutRef.current = setTimeout(function () {
					if (isLoading) {
						setShowDelayedLoading(true)
					}
				}, 500) // 500ms delay before showing "Searching..."
			} else {
				setShowDelayedLoading(false)
			}
			// Cleanup timeout on unmount or when dependencies change
			return function () {
				if (loadingTimeoutRef.current) {
					clearTimeout(loadingTimeoutRef.current)
					loadingTimeoutRef.current = null
				}
			}
		},
		[isLoading, searchQuery],
	)
	;(0, react_1.useEffect)(
		function () {
			if (menuRef.current) {
				var selectedElement = menuRef.current.children[selectedIndex]
				if (selectedElement) {
					var menuRect = menuRef.current.getBoundingClientRect()
					var selectedRect = selectedElement.getBoundingClientRect()
					if (selectedRect.bottom > menuRect.bottom) {
						menuRef.current.scrollTop += selectedRect.bottom - menuRect.bottom
					} else if (selectedRect.top < menuRect.top) {
						menuRef.current.scrollTop -= menuRect.top - selectedRect.top
					}
				}
			}
		},
		[selectedIndex],
	)
	var renderOptionContent = function (option) {
		var _a
		switch (option.type) {
			case context_mentions_1.ContextMenuOptionType.Problems:
				return <span>Problems</span>
			case context_mentions_1.ContextMenuOptionType.Terminal:
				return <span>Terminal</span>
			case context_mentions_1.ContextMenuOptionType.URL:
				return <span>Paste URL to fetch contents</span>
			case context_mentions_1.ContextMenuOptionType.NoResults:
				return <span>No results found</span>
			case context_mentions_1.ContextMenuOptionType.Git:
				if (option.value) {
					return (
						<div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
							<span style={{ lineHeight: "1.2" }}>{option.label}</span>
							<span
								style={{
									fontSize: "0.85em",
									opacity: 0.7,
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
									lineHeight: "1.2",
								}}>
								{option.description}
							</span>
						</div>
					)
				} else {
					return <span>Git Commits</span>
				}
			case context_mentions_1.ContextMenuOptionType.File:
			case context_mentions_1.ContextMenuOptionType.Folder:
				if (option.value) {
					return (
						<>
							<span>/</span>
							{((_a = option.value) === null || _a === void 0 ? void 0 : _a.startsWith("/.")) && <span>.</span>}
							<span
								style={{
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
									direction: "rtl",
									textAlign: "left",
								}}>
								{(0, CodeAccordian_1.cleanPathPrefix)(option.value || "") + "\u200E"}
							</span>
						</>
					)
				} else {
					return <span>Add {option.type === context_mentions_1.ContextMenuOptionType.File ? "File" : "Folder"}</span>
				}
		}
	}
	var getIconForOption = function (option) {
		switch (option.type) {
			case context_mentions_1.ContextMenuOptionType.File:
				return "file"
			case context_mentions_1.ContextMenuOptionType.Folder:
				return "folder"
			case context_mentions_1.ContextMenuOptionType.Problems:
				return "warning"
			case context_mentions_1.ContextMenuOptionType.Terminal:
				return "terminal"
			case context_mentions_1.ContextMenuOptionType.URL:
				return "link"
			case context_mentions_1.ContextMenuOptionType.Git:
				return "git-commit"
			case context_mentions_1.ContextMenuOptionType.NoResults:
				return "info"
			default:
				return "file"
		}
	}
	var isOptionSelectable = function (option) {
		return (
			option.type !== context_mentions_1.ContextMenuOptionType.NoResults &&
			option.type !== context_mentions_1.ContextMenuOptionType.URL
		)
	}
	return (
		<div
			style={{
				position: "absolute",
				bottom: "calc(100% - 10px)",
				left: 15,
				right: 15,
				overflowX: "hidden",
			}}
			onMouseDown={onMouseDown}>
			<div
				ref={menuRef}
				style={{
					backgroundColor: "var(--vscode-dropdown-background)",
					border: "1px solid var(--vscode-editorGroup-border)",
					borderRadius: "3px",
					boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
					zIndex: 1000,
					display: "flex",
					flexDirection: "column",
					maxHeight: "200px",
					overflowY: "auto",
				}}>
				{/* Can't use virtuoso since it requires fixed height and menu height is dynamic based on # of items */}
				{showDelayedLoading && searchQuery && (
					<div
						style={{
							padding: "8px 12px",
							display: "flex",
							alignItems: "center",
							gap: "8px",
							opacity: 0.7,
						}}>
						<i className="codicon codicon-loading codicon-modifier-spin" style={{ fontSize: "14px" }} />
						<span>Searching...</span>
					</div>
				)}
				{filteredOptions.map(function (option, index) {
					return (
						<div
							key={"".concat(option.type, "-").concat(option.value || index)}
							onClick={function () {
								return isOptionSelectable(option) && onSelect(option.type, option.value)
							}}
							style={{
								padding: "8px 12px",
								cursor: isOptionSelectable(option) ? "pointer" : "default",
								color:
									index === selectedIndex && isOptionSelectable(option)
										? "var(--vscode-quickInputList-focusForeground)"
										: "",
								borderBottom: "1px solid var(--vscode-editorGroup-border)",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								backgroundColor:
									index === selectedIndex && isOptionSelectable(option)
										? "var(--vscode-quickInputList-focusBackground)"
										: "",
							}}
							onMouseEnter={function () {
								return isOptionSelectable(option) && setSelectedIndex(index)
							}}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									flex: 1,
									minWidth: 0,
									overflow: "hidden",
								}}>
								<i
									className={"codicon codicon-".concat(getIconForOption(option))}
									style={{
										marginRight: "8px",
										flexShrink: 0,
										fontSize: "14px",
									}}
								/>
								{renderOptionContent(option)}
							</div>
							{(option.type === context_mentions_1.ContextMenuOptionType.File ||
								option.type === context_mentions_1.ContextMenuOptionType.Folder ||
								option.type === context_mentions_1.ContextMenuOptionType.Git) &&
								!option.value && (
									<i
										className="codicon codicon-chevron-right"
										style={{
											fontSize: "14px",
											flexShrink: 0,
											marginLeft: 8,
										}}
									/>
								)}
							{(option.type === context_mentions_1.ContextMenuOptionType.Problems ||
								option.type === context_mentions_1.ContextMenuOptionType.Terminal ||
								((option.type === context_mentions_1.ContextMenuOptionType.File ||
									option.type === context_mentions_1.ContextMenuOptionType.Folder ||
									option.type === context_mentions_1.ContextMenuOptionType.Git) &&
									option.value)) && (
								<i
									className="codicon codicon-add"
									style={{
										fontSize: "14px",
										flexShrink: 0,
										marginLeft: 8,
									}}
								/>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
exports.default = ContextMenu
