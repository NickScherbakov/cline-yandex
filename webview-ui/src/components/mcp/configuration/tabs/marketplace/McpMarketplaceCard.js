"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var vscode_1 = require("@/utils/vscode");
var react_use_1 = require("react-use");
var McpMarketplaceCard = function (_a) {
    var _b, _c;
    var item = _a.item, installedServers = _a.installedServers;
    var isInstalled = installedServers.some(function (server) { return server.name === item.mcpId; });
    var _d = (0, react_1.useState)(false), isDownloading = _d[0], setIsDownloading = _d[1];
    var _e = (0, react_1.useState)(false), isLoading = _e[0], setIsLoading = _e[1];
    var githubLinkRef = (0, react_1.useRef)(null);
    var handleMessage = (0, react_1.useCallback)(function (event) {
        var message = event.data;
        switch (message.type) {
            case "mcpDownloadDetails":
                setIsDownloading(false);
                break;
            case "relinquishControl":
                setIsLoading(false);
                break;
        }
    }, []);
    (0, react_use_1.useEvent)("message", handleMessage);
    var githubAuthorUrl = (0, react_1.useMemo)(function () {
        var url = new URL(item.githubUrl);
        var pathParts = url.pathname.split("/");
        if (pathParts.length >= 2) {
            return "".concat(url.origin, "/").concat(pathParts[1]);
        }
        return item.githubUrl;
    }, [item.githubUrl]);
    return (<>
			<style>
				{"\n\t\t\t\t\t.mcp-card {\n\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\toutline: none !important;\n\t\t\t\t\t}\n\t\t\t\t\t.mcp-card:hover {\n\t\t\t\t\t\tbackground-color: var(--vscode-list-hoverBackground);\n\t\t\t\t\t}\n\t\t\t\t\t.mcp-card:focus {\n\t\t\t\t\t\toutline: none !important;\n\t\t\t\t\t}\n\t\t\t\t"}
			</style>
			<a href={item.githubUrl} className="mcp-card" style={{
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            cursor: isLoading ? "wait" : "pointer",
            textDecoration: "none",
            color: "inherit",
        }}>
				{/* Main container with logo and content */}
				<div style={{ display: "flex", gap: "12px" }}>
					{/* Logo */}
					{item.logoUrl && (<img src={item.logoUrl} alt={"".concat(item.name, " logo")} style={{
                width: 42,
                height: 42,
                borderRadius: 4,
            }}/>)}

					{/* Content section */}
					<div style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}>
						{/* First row: name and install button */}
						<div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
        }}>
							<h3 style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: 600,
        }}>
								{item.name}
							</h3>
							<div onClick={function (e) {
            e.preventDefault(); // Prevent card click when clicking install
            e.stopPropagation(); // Stop event from bubbling up to parent link
            if (!isInstalled && !isDownloading) {
                setIsDownloading(true);
                vscode_1.vscode.postMessage({
                    type: "downloadMcp",
                    mcpId: item.mcpId,
                });
            }
        }} style={{}}>
								<StyledInstallButton disabled={isInstalled || isDownloading} $isInstalled={isInstalled}>
									{isInstalled ? "Installed" : isDownloading ? "Installing..." : "Install"}
								</StyledInstallButton>
							</div>
						</div>

						{/* Second row: metadata */}
						<div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "var(--vscode-descriptionForeground)",
            flexWrap: "wrap",
            minWidth: 0,
            rowGap: 0,
        }}>
							<a href={githubAuthorUrl} style={{
            display: "flex",
            alignItems: "center",
            color: "var(--vscode-foreground)",
            minWidth: 0,
            opacity: 0.7,
            textDecoration: "none",
            border: "none !important",
        }} className="github-link" onMouseEnter={function (e) {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.color = "var(--link-active-foreground)";
        }} onMouseLeave={function (e) {
            e.currentTarget.style.opacity = "0.7";
            e.currentTarget.style.color = "var(--vscode-foreground)";
        }}>
								<div style={{ display: "flex", gap: "4px", alignItems: "center" }} ref={githubLinkRef}>
									<span className="codicon codicon-github" style={{ fontSize: "14px" }}/>
									<span style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-all",
            minWidth: 0,
        }}>
										{item.author}
									</span>
								</div>
							</a>
							<div style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            minWidth: 0,
            flexShrink: 0,
        }}>
								<span className="codicon codicon-star-full"/>
								<span style={{ wordBreak: "break-all" }}>{(_c = (_b = item.githubStars) === null || _b === void 0 ? void 0 : _b.toLocaleString()) !== null && _c !== void 0 ? _c : 0}</span>
							</div>
							{/* <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                minWidth: 0,
                flexShrink: 0,
            }}>
            <span className="codicon codicon-cloud-download" />
            <span style={{ wordBreak: "break-all" }}>{item.downloadCount?.toLocaleString() ?? 0}</span>
        </div> */}
							{item.requiresApiKey && (<span className="codicon codicon-key" title="Requires API key" style={{ flexShrink: 0 }}/>)}
						</div>
					</div>
				</div>

				{/* Description and tags */}
				<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
					{/* {!item.isRecommended && (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    color: "var(--vscode-notificationsWarningIcon-foreground)",
                    marginTop: -3,
                    marginBottom: -3,
                }}>
                <span className="codicon codicon-warning" style={{ fontSize: "14px" }} />
                <span>Community Made (use at your own risk)</span>
            </div>
        )} */}

					<p style={{ fontSize: "13px", margin: 0 }}>{item.description}</p>
					<div style={{
            display: "flex",
            gap: "6px",
            flexWrap: "nowrap",
            overflowX: "auto",
            scrollbarWidth: "none",
            position: "relative",
        }} onScroll={function (e) {
            var target = e.currentTarget;
            var gradient = target.querySelector(".tags-gradient");
            if (gradient) {
                gradient.style.visibility = target.scrollLeft > 0 ? "hidden" : "visible";
            }
        }}>
						<span style={{
            fontSize: "10px",
            padding: "1px 4px",
            borderRadius: "3px",
            border: "1px solid color-mix(in srgb, var(--vscode-descriptionForeground) 50%, transparent)",
            color: "var(--vscode-descriptionForeground)",
            whiteSpace: "nowrap",
        }}>
							{item.category}
						</span>
						{item.tags.map(function (tag, index) { return (<span key={tag} style={{
                fontSize: "10px",
                padding: "1px 4px",
                borderRadius: "3px",
                border: "1px solid color-mix(in srgb, var(--vscode-descriptionForeground) 50%, transparent)",
                color: "var(--vscode-descriptionForeground)",
                whiteSpace: "nowrap",
                display: "inline-flex",
            }}>
								{tag}
								{index === item.tags.length - 1 ? "" : ""}
							</span>); })}
						<div className="tags-gradient" style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "32px",
            background: "linear-gradient(to right, transparent, var(--vscode-sideBar-background))",
            pointerEvents: "none",
        }}/>
					</div>
				</div>
			</a>
		</>);
};
var StyledInstallButton = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tfont-size: 12px;\n\tfont-weight: 500;\n\tpadding: 2px 6px;\n\tborder-radius: 2px;\n\tborder: none;\n\tcursor: pointer;\n\tbackground: ", ";\n\tcolor: var(--vscode-button-foreground);\n\n\t&:hover:not(:disabled) {\n\t\tbackground: ", ";\n\t}\n\n\t&:active:not(:disabled) {\n\t\tbackground: ", ";\n\t\topacity: 0.7;\n\t}\n\n\t&:disabled {\n\t\topacity: 0.5;\n\t\tcursor: default;\n\t}\n"], ["\n\tfont-size: 12px;\n\tfont-weight: 500;\n\tpadding: 2px 6px;\n\tborder-radius: 2px;\n\tborder: none;\n\tcursor: pointer;\n\tbackground: ", ";\n\tcolor: var(--vscode-button-foreground);\n\n\t&:hover:not(:disabled) {\n\t\tbackground: ", ";\n\t}\n\n\t&:active:not(:disabled) {\n\t\tbackground: ", ";\n\t\topacity: 0.7;\n\t}\n\n\t&:disabled {\n\t\topacity: 0.5;\n\t\tcursor: default;\n\t}\n"])), function (props) {
    return props.$isInstalled ? "var(--vscode-button-secondaryBackground)" : "var(--vscode-button-background)";
}, function (props) {
    return props.$isInstalled ? "var(--vscode-button-secondaryHoverBackground)" : "var(--vscode-button-hoverBackground)";
}, function (props) {
    return props.$isInstalled ? "var(--vscode-button-secondaryBackground)" : "var(--vscode-button-background)";
});
exports.default = McpMarketplaceCard;
var templateObject_1;
