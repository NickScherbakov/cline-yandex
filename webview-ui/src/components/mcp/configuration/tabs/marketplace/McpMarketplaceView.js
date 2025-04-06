"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("react")
var react_2 = require("@vscode/webview-ui-toolkit/react")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var vscode_1 = require("@/utils/vscode")
var McpMarketplaceCard_1 = require("./McpMarketplaceCard")
var McpSubmitCard_1 = require("./McpSubmitCard")
var McpMarketplaceView = function () {
	var mcpServers = (0, ExtensionStateContext_1.useExtensionState)().mcpServers
	var _a = (0, react_1.useState)([]),
		items = _a[0],
		setItems = _a[1]
	var _b = (0, react_1.useState)(true),
		isLoading = _b[0],
		setIsLoading = _b[1]
	var _c = (0, react_1.useState)(null),
		error = _c[0],
		setError = _c[1]
	var _d = (0, react_1.useState)(false),
		isRefreshing = _d[0],
		setIsRefreshing = _d[1]
	var _e = (0, react_1.useState)(""),
		searchQuery = _e[0],
		setSearchQuery = _e[1]
	var _f = (0, react_1.useState)(null),
		selectedCategory = _f[0],
		setSelectedCategory = _f[1]
	var _g = (0, react_1.useState)("newest"),
		sortBy = _g[0],
		setSortBy = _g[1]
	var categories = (0, react_1.useMemo)(
		function () {
			var uniqueCategories = new Set(
				items.map(function (item) {
					return item.category
				}),
			)
			return Array.from(uniqueCategories).sort()
		},
		[items],
	)
	var filteredItems = (0, react_1.useMemo)(
		function () {
			return items
				.filter(function (item) {
					var matchesSearch =
						searchQuery === "" ||
						item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
						item.tags.some(function (tag) {
							return tag.toLowerCase().includes(searchQuery.toLowerCase())
						})
					var matchesCategory = !selectedCategory || item.category === selectedCategory
					return matchesSearch && matchesCategory
				})
				.sort(function (a, b) {
					switch (sortBy) {
						// case "downloadCount":
						// 	return b.downloadCount - a.downloadCount
						case "stars":
							return b.githubStars - a.githubStars
						case "name":
							return a.name.localeCompare(b.name)
						case "newest":
							return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
						default:
							return 0
					}
				})
		},
		[items, searchQuery, selectedCategory, sortBy],
	)
	;(0, react_1.useEffect)(function () {
		var handleMessage = function (event) {
			var _a
			var message = event.data
			if (message.type === "mcpMarketplaceCatalog") {
				if (message.error) {
					setError(message.error)
				} else {
					setItems(((_a = message.mcpMarketplaceCatalog) === null || _a === void 0 ? void 0 : _a.items) || [])
					setError(null)
				}
				setIsLoading(false)
				setIsRefreshing(false)
			} else if (message.type === "mcpDownloadDetails") {
				if (message.error) {
					setError(message.error)
				}
			}
		}
		window.addEventListener("message", handleMessage)
		// Fetch marketplace catalog
		fetchMarketplace()
		return function () {
			window.removeEventListener("message", handleMessage)
		}
	}, [])
	var fetchMarketplace = function (forceRefresh) {
		if (forceRefresh === void 0) {
			forceRefresh = false
		}
		if (forceRefresh) {
			setIsRefreshing(true)
		} else {
			setIsLoading(true)
		}
		setError(null)
		vscode_1.vscode.postMessage({ type: "fetchMcpMarketplace", bool: forceRefresh })
	}
	if (isLoading || isRefreshing) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					padding: "20px",
				}}>
				<react_2.VSCodeProgressRing />
			</div>
		)
	}
	if (error) {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					padding: "20px",
					gap: "12px",
				}}>
				<div style={{ color: "var(--vscode-errorForeground)" }}>{error}</div>
				<react_2.VSCodeButton
					appearance="secondary"
					onClick={function () {
						return fetchMarketplace(true)
					}}>
					<span className="codicon codicon-refresh" style={{ marginRight: "6px" }} />
					Retry
				</react_2.VSCodeButton>
			</div>
		)
	}
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
			}}>
			<div style={{ padding: "20px 20px 5px", display: "flex", flexDirection: "column", gap: "16px" }}>
				{/* Search row */}
				<react_2.VSCodeTextField
					style={{ width: "100%" }}
					placeholder="Search MCPs..."
					value={searchQuery}
					onInput={function (e) {
						return setSearchQuery(e.target.value)
					}}>
					<div
						slot="start"
						className="codicon codicon-search"
						style={{
							fontSize: 13,
							opacity: 0.8,
						}}
					/>
					{searchQuery && (
						<div
							className="codicon codicon-close"
							aria-label="Clear search"
							onClick={function () {
								return setSearchQuery("")
							}}
							slot="end"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
								cursor: "pointer",
							}}
						/>
					)}
				</react_2.VSCodeTextField>

				{/* Filter row */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
					}}>
					<span
						style={{
							fontSize: "11px",
							color: "var(--vscode-descriptionForeground)",
							textTransform: "uppercase",
							fontWeight: 500,
							flexShrink: 0,
						}}>
						Filter:
					</span>
					<div
						style={{
							position: "relative",
							zIndex: 2,
							flex: 1,
						}}>
						<react_2.VSCodeDropdown
							style={{
								width: "100%",
							}}
							value={selectedCategory || ""}
							onChange={function (e) {
								return setSelectedCategory(e.target.value || null)
							}}>
							<react_2.VSCodeOption value="">All Categories</react_2.VSCodeOption>
							{categories.map(function (category) {
								return (
									<react_2.VSCodeOption key={category} value={category}>
										{category}
									</react_2.VSCodeOption>
								)
							})}
						</react_2.VSCodeDropdown>
					</div>
				</div>

				{/* Sort row */}
				<div
					style={{
						display: "flex",
						gap: "8px",
					}}>
					<span
						style={{
							fontSize: "11px",
							color: "var(--vscode-descriptionForeground)",
							textTransform: "uppercase",
							fontWeight: 500,
							marginTop: "3px",
						}}>
						Sort:
					</span>
					<react_2.VSCodeRadioGroup
						style={{
							display: "flex",
							flexWrap: "wrap",
							marginTop: "-2.5px",
						}}
						value={sortBy}
						onChange={function (e) {
							return setSortBy(e.target.value)
						}}>
						{/* <VSCodeRadio value="downloadCount">Most Installs</VSCodeRadio> */}
						<react_2.VSCodeRadio value="newest">Newest</react_2.VSCodeRadio>
						<react_2.VSCodeRadio value="stars">GitHub Stars</react_2.VSCodeRadio>
						<react_2.VSCodeRadio value="name">Name</react_2.VSCodeRadio>
					</react_2.VSCodeRadioGroup>
				</div>
			</div>

			<style>
				{
					"\n\t\t\t\t.mcp-search-input,\n\t\t\t\t.mcp-select {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\t}\n\t\t\t\t.mcp-search-input {\n\t\t\t\tmin-width: 140px;\n\t\t\t\t}\n\t\t\t\t.mcp-search-input:focus,\n\t\t\t\t.mcp-select:focus {\n\t\t\t\tborder-color: var(--vscode-focusBorder) !important;\n\t\t\t\t}\n\t\t\t\t.mcp-search-input:hover,\n\t\t\t\t.mcp-select:hover {\n\t\t\t\topacity: 0.9;\n\t\t\t\t}\n\t\t\t"
				}
			</style>
			<div style={{ display: "flex", flexDirection: "column" }}>
				{filteredItems.length === 0 ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
							padding: "20px",
							color: "var(--vscode-descriptionForeground)",
						}}>
						{searchQuery || selectedCategory
							? "No matching MCP servers found"
							: "No MCP servers found in the marketplace"}
					</div>
				) : (
					filteredItems.map(function (item) {
						return <McpMarketplaceCard_1.default key={item.mcpId} item={item} installedServers={mcpServers} />
					})
				)}
				<McpSubmitCard_1.default />
			</div>
		</div>
	)
}
exports.default = McpMarketplaceView
