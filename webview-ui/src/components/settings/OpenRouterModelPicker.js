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
exports.ModelDescriptionMarkdown = exports.OPENROUTER_MODEL_PICKER_Z_INDEX = void 0;
var react_1 = require("@vscode/webview-ui-toolkit/react");
var fuse_js_1 = require("fuse.js");
var react_2 = require("react");
var react_remark_1 = require("react-remark");
var react_use_1 = require("react-use");
var styled_components_1 = require("styled-components");
var api_1 = require("@shared/api");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var vscode_1 = require("@/utils/vscode");
var HistoryView_1 = require("../history/HistoryView");
var ApiOptions_1 = require("./ApiOptions");
var CodeBlock_1 = require("@/components/common/CodeBlock");
var ThinkingBudgetSlider_1 = require("./ThinkingBudgetSlider");
var FeaturedModelCard_1 = require("./FeaturedModelCard");
// Featured models for Cline provider
var featuredModels = [
    {
        id: "anthropic/claude-3.7-sonnet",
        description: "Leading model for agentic coding",
        label: "Best",
    },
    {
        id: "google/gemini-2.5-pro-preview-03-25",
        description: "Large 1M context window, great value",
        label: "Trending",
    },
    {
        id: "meta-llama/llama-4-maverick",
        description: "Efficient performance at lower cost",
        label: "New",
    },
];
var OpenRouterModelPicker = function (_a) {
    var isPopup = _a.isPopup;
    var _b = (0, ExtensionStateContext_1.useExtensionState)(), apiConfiguration = _b.apiConfiguration, setApiConfiguration = _b.setApiConfiguration, openRouterModels = _b.openRouterModels;
    var _c = (0, react_2.useState)((apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.openRouterModelId) || api_1.openRouterDefaultModelId), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = (0, react_2.useState)(false), isDropdownVisible = _d[0], setIsDropdownVisible = _d[1];
    var _e = (0, react_2.useState)(-1), selectedIndex = _e[0], setSelectedIndex = _e[1];
    var dropdownRef = (0, react_2.useRef)(null);
    var itemRefs = (0, react_2.useRef)([]);
    var _f = (0, react_2.useState)(false), isDescriptionExpanded = _f[0], setIsDescriptionExpanded = _f[1];
    var dropdownListRef = (0, react_2.useRef)(null);
    var handleModelChange = function (newModelId) {
        // could be setting invalid model id/undefined info but validation will catch it
        setApiConfiguration(__assign(__assign({}, apiConfiguration), {
            openRouterModelId: newModelId,
            openRouterModelInfo: openRouterModels[newModelId],
        }));
        setSearchTerm(newModelId);
    };
    var _g = (0, react_2.useMemo)(function () {
        return (0, ApiOptions_1.normalizeApiConfiguration)(apiConfiguration);
    }, [apiConfiguration]), selectedModelId = _g.selectedModelId, selectedModelInfo = _g.selectedModelInfo;
    (0, react_use_1.useMount)(function () {
        vscode_1.vscode.postMessage({ type: "refreshOpenRouterModels" });
    });
    (0, react_2.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    var modelIds = (0, react_2.useMemo)(function () {
        var unfilteredModelIds = Object.keys(openRouterModels).sort(function (a, b) { return a.localeCompare(b); });
        return (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) === "cline"
            ? unfilteredModelIds.filter(function (id) { return !id.includes(":free"); })
            : unfilteredModelIds;
    }, [openRouterModels, apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider]);
    var searchableItems = (0, react_2.useMemo)(function () {
        return modelIds.map(function (id) { return ({
            id: id,
            html: id,
        }); });
    }, [modelIds]);
    var fuse = (0, react_2.useMemo)(function () {
        return new fuse_js_1.default(searchableItems, {
            keys: ["html"], // highlight function will update this
            threshold: 0.6,
            shouldSort: true,
            isCaseSensitive: false,
            ignoreLocation: false,
            includeMatches: true,
            minMatchCharLength: 1,
        });
    }, [searchableItems]);
    var modelSearchResults = (0, react_2.useMemo)(function () {
        var results = searchTerm
            ? (0, HistoryView_1.highlight)(fuse.search(searchTerm), "model-item-highlight")
            : searchableItems;
        // results.sort((a, b) => a.id.localeCompare(b.id)) NOTE: sorting like this causes ids in objects to be reordered and mismatched
        return results;
    }, [searchableItems, searchTerm, fuse]);
    var handleKeyDown = function (event) {
        if (!isDropdownVisible)
            return;
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setSelectedIndex(function (prev) { return (prev < modelSearchResults.length - 1 ? prev + 1 : prev); });
                break;
            case "ArrowUp":
                event.preventDefault();
                setSelectedIndex(function (prev) { return (prev > 0 ? prev - 1 : prev); });
                break;
            case "Enter":
                event.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < modelSearchResults.length) {
                    handleModelChange(modelSearchResults[selectedIndex].id);
                    setIsDropdownVisible(false);
                }
                break;
            case "Escape":
                setIsDropdownVisible(false);
                setSelectedIndex(-1);
                break;
        }
    };
    var hasInfo = (0, react_2.useMemo)(function () {
        try {
            return modelIds.some(function (id) { return id.toLowerCase() === searchTerm.toLowerCase(); });
        }
        catch (_a) {
            return false;
        }
    }, [modelIds, searchTerm]);
    (0, react_2.useEffect)(function () {
        setSelectedIndex(-1);
        if (dropdownListRef.current) {
            dropdownListRef.current.scrollTop = 0;
        }
    }, [searchTerm]);
    (0, react_2.useEffect)(function () {
        var _a;
        if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
            (_a = itemRefs.current[selectedIndex]) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
            });
        }
    }, [selectedIndex]);
    var showBudgetSlider = (0, react_2.useMemo)(function () {
        return ((selectedModelId === null || selectedModelId === void 0 ? void 0 : selectedModelId.toLowerCase().includes("claude-3-7-sonnet")) ||
            (selectedModelId === null || selectedModelId === void 0 ? void 0 : selectedModelId.toLowerCase().includes("claude-3.7-sonnet")) ||
            (selectedModelId === null || selectedModelId === void 0 ? void 0 : selectedModelId.toLowerCase().includes("claude-3.7-sonnet:thinking")));
    }, [selectedModelId]);
    return (<div style={{ width: "100%" }}>
			<style>
				{"\n\t\t\t\t.model-item-highlight {\n\t\t\t\t\tbackground-color: var(--vscode-editor-findMatchHighlightBackground);\n\t\t\t\t\tcolor: inherit;\n\t\t\t\t}\n\t\t\t\t"}
			</style>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<label htmlFor="model-search">
					<span style={{ fontWeight: 500 }}>Model</span>
				</label>

				{(apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.apiProvider) === "cline" && (<div style={{ marginBottom: "6px", marginTop: 4 }}>
						{featuredModels.map(function (model) { return (<FeaturedModelCard_1.default key={model.id} modelId={model.id} description={model.description} label={model.label} isSelected={selectedModelId === model.id} onClick={function () {
                    handleModelChange(model.id);
                    setIsDropdownVisible(false);
                }}/>); })}
					</div>)}

				<DropdownWrapper ref={dropdownRef}>
					<react_1.VSCodeTextField id="model-search" placeholder="Search and select a model..." value={searchTerm} onInput={function (e) {
            var _a, _b;
            handleModelChange((_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toLowerCase());
            setIsDropdownVisible(true);
        }} onFocus={function () { return setIsDropdownVisible(true); }} onKeyDown={handleKeyDown} style={{
            width: "100%",
            zIndex: exports.OPENROUTER_MODEL_PICKER_Z_INDEX,
            position: "relative",
        }}>
						{searchTerm && (<div className="input-icon-button codicon codicon-close" aria-label="Clear search" onClick={function () {
                handleModelChange("");
                setIsDropdownVisible(true);
            }} slot="end" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}/>)}
					</react_1.VSCodeTextField>
					{isDropdownVisible && (<DropdownList ref={dropdownListRef}>
							{modelSearchResults.map(function (item, index) { return (<DropdownItem key={item.id} ref={function (el) { return (itemRefs.current[index] = el); }} isSelected={index === selectedIndex} onMouseEnter={function () { return setSelectedIndex(index); }} onClick={function () {
                    handleModelChange(item.id);
                    setIsDropdownVisible(false);
                }} dangerouslySetInnerHTML={{
                    __html: item.html,
                }}/>); })}
						</DropdownList>)}
				</DropdownWrapper>
			</div>

			{hasInfo ? (<>
					{showBudgetSlider && (<ThinkingBudgetSlider_1.default apiConfiguration={apiConfiguration} setApiConfiguration={setApiConfiguration}/>)}

					<ApiOptions_1.ModelInfoView selectedModelId={selectedModelId} modelInfo={selectedModelInfo} isDescriptionExpanded={isDescriptionExpanded} setIsDescriptionExpanded={setIsDescriptionExpanded} isPopup={isPopup}/>
				</>) : (<p style={{
                fontSize: "12px",
                marginTop: 0,
                color: "var(--vscode-descriptionForeground)",
            }}>
					<>
						The extension automatically fetches the latest list of models available on{" "}
						<react_1.VSCodeLink style={{ display: "inline", fontSize: "inherit" }} href="https://openrouter.ai/models">
							OpenRouter.
						</react_1.VSCodeLink>
						If you're unsure which model to choose, Cline works best with{" "}
						<react_1.VSCodeLink style={{ display: "inline", fontSize: "inherit" }} onClick={function () { return handleModelChange("anthropic/claude-3.7-sonnet"); }}>
							anthropic/claude-3.7-sonnet.
						</react_1.VSCodeLink>
						You can also try searching "free" for no-cost options currently available.
					</>
				</p>)}
		</div>);
};
exports.default = OpenRouterModelPicker;
// Dropdown
var DropdownWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tposition: relative;\n\twidth: 100%;\n"], ["\n\tposition: relative;\n\twidth: 100%;\n"])));
exports.OPENROUTER_MODEL_PICKER_Z_INDEX = 1000;
var DropdownList = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tposition: absolute;\n\ttop: calc(100% - 3px);\n\tleft: 0;\n\twidth: calc(100% - 2px);\n\tmax-height: 200px;\n\toverflow-y: auto;\n\tbackground-color: var(--vscode-dropdown-background);\n\tborder: 1px solid var(--vscode-list-activeSelectionBackground);\n\tz-index: ", ";\n\tborder-bottom-left-radius: 3px;\n\tborder-bottom-right-radius: 3px;\n"], ["\n\tposition: absolute;\n\ttop: calc(100% - 3px);\n\tleft: 0;\n\twidth: calc(100% - 2px);\n\tmax-height: 200px;\n\toverflow-y: auto;\n\tbackground-color: var(--vscode-dropdown-background);\n\tborder: 1px solid var(--vscode-list-activeSelectionBackground);\n\tz-index: ", ";\n\tborder-bottom-left-radius: 3px;\n\tborder-bottom-right-radius: 3px;\n"])), exports.OPENROUTER_MODEL_PICKER_Z_INDEX - 1);
var DropdownItem = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tpadding: 5px 10px;\n\tcursor: pointer;\n\tword-break: break-all;\n\twhite-space: normal;\n\n\tbackground-color: ", ";\n\n\t&:hover {\n\t\tbackground-color: var(--vscode-list-activeSelectionBackground);\n\t}\n"], ["\n\tpadding: 5px 10px;\n\tcursor: pointer;\n\tword-break: break-all;\n\twhite-space: normal;\n\n\tbackground-color: ", ";\n\n\t&:hover {\n\t\tbackground-color: var(--vscode-list-activeSelectionBackground);\n\t}\n"
    // Markdown
])), function (_a) {
    var isSelected = _a.isSelected;
    return (isSelected ? "var(--vscode-list-activeSelectionBackground)" : "inherit");
});
// Markdown
var StyledMarkdown = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tfont-family:\n\t\tvar(--vscode-font-family),\n\t\tsystem-ui,\n\t\t-apple-system,\n\t\tBlinkMacSystemFont,\n\t\t\"Segoe UI\",\n\t\tRoboto,\n\t\tOxygen,\n\t\tUbuntu,\n\t\tCantarell,\n\t\t\"Open Sans\",\n\t\t\"Helvetica Neue\",\n\t\tsans-serif;\n\tfont-size: 12px;\n\tcolor: var(--vscode-descriptionForeground);\n\n\tp,\n\tli,\n\tol,\n\tul {\n\t\tline-height: 1.25;\n\t\tmargin: 0;\n\t}\n\n\tol,\n\tul {\n\t\tpadding-left: 1.5em;\n\t\tmargin-left: 0;\n\t}\n\n\tp {\n\t\twhite-space: pre-wrap;\n\t}\n\n\ta {\n\t\ttext-decoration: none;\n\t}\n\ta {\n\t\t&:hover {\n\t\t\ttext-decoration: underline;\n\t\t}\n\t}\n"], ["\n\tfont-family:\n\t\tvar(--vscode-font-family),\n\t\tsystem-ui,\n\t\t-apple-system,\n\t\tBlinkMacSystemFont,\n\t\t\"Segoe UI\",\n\t\tRoboto,\n\t\tOxygen,\n\t\tUbuntu,\n\t\tCantarell,\n\t\t\"Open Sans\",\n\t\t\"Helvetica Neue\",\n\t\tsans-serif;\n\tfont-size: 12px;\n\tcolor: var(--vscode-descriptionForeground);\n\n\tp,\n\tli,\n\tol,\n\tul {\n\t\tline-height: 1.25;\n\t\tmargin: 0;\n\t}\n\n\tol,\n\tul {\n\t\tpadding-left: 1.5em;\n\t\tmargin-left: 0;\n\t}\n\n\tp {\n\t\twhite-space: pre-wrap;\n\t}\n\n\ta {\n\t\ttext-decoration: none;\n\t}\n\ta {\n\t\t&:hover {\n\t\t\ttext-decoration: underline;\n\t\t}\n\t}\n"])));
exports.ModelDescriptionMarkdown = (0, react_2.memo)(function (_a) {
    var markdown = _a.markdown, key = _a.key, isExpanded = _a.isExpanded, setIsExpanded = _a.setIsExpanded, isPopup = _a.isPopup;
    var _b = (0, react_remark_1.useRemark)(), reactContent = _b[0], setMarkdown = _b[1];
    // const [isExpanded, setIsExpanded] = useState(false)
    var _c = (0, react_2.useState)(false), showSeeMore = _c[0], setShowSeeMore = _c[1];
    var textContainerRef = (0, react_2.useRef)(null);
    var textRef = (0, react_2.useRef)(null);
    (0, react_2.useEffect)(function () {
        setMarkdown(markdown || "");
    }, [markdown, setMarkdown]);
    (0, react_2.useEffect)(function () {
        if (textRef.current && textContainerRef.current) {
            var scrollHeight = textRef.current.scrollHeight;
            var clientHeight = textContainerRef.current.clientHeight;
            var isOverflowing = scrollHeight > clientHeight;
            setShowSeeMore(isOverflowing);
            // if (!isOverflowing) {
            // 	setIsExpanded(false)
            // }
        }
    }, [reactContent, setIsExpanded]);
    return (<StyledMarkdown key={key} style={{ display: "inline-block", marginBottom: 0 }}>
				<div ref={textContainerRef} style={{
            overflowY: isExpanded ? "auto" : "hidden",
            position: "relative",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
        }}>
					<div ref={textRef} style={{
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "unset" : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            // whiteSpace: "pre-wrap",
            // wordBreak: "break-word",
            // overflowWrap: "anywhere",
        }}>
						{reactContent}
					</div>
					{!isExpanded && showSeeMore && (<div style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
            }}>
							<div style={{
                width: 30,
                height: "1.2em",
                background: "linear-gradient(to right, transparent, var(--vscode-sideBar-background))",
            }}/>
							<react_1.VSCodeLink style={{
                // cursor: "pointer",
                // color: "var(--vscode-textLink-foreground)",
                fontSize: "inherit",
                paddingRight: 0,
                paddingLeft: 3,
                backgroundColor: isPopup ? CodeBlock_1.CODE_BLOCK_BG_COLOR : "var(--vscode-sideBar-background)",
            }} onClick={function () { return setIsExpanded(true); }}>
								See more
							</react_1.VSCodeLink>
						</div>)}
				</div>
				{/* {isExpanded && showSeeMore && (
        <div
            style={{
                cursor: "pointer",
                color: "var(--vscode-textLink-foreground)",
                marginLeft: "auto",
                textAlign: "right",
                paddingRight: 2,
            }}
            onClick={() => setIsExpanded(false)}>
            See less
        </div>
    )} */}
			</StyledMarkdown>);
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
