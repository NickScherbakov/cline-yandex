"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckmarkControl = void 0;
var react_1 = require("react");
var react_use_1 = require("react-use");
var styled_components_1 = require("styled-components");
var vscode_1 = require("@/utils/vscode");
var CodeBlock_1 = require("@/components/common/CodeBlock");
var react_2 = require("@vscode/webview-ui-toolkit/react");
var react_dom_1 = require("react-dom");
var react_3 = require("@floating-ui/react");
var CheckmarkControl = function (_a) {
    var messageTs = _a.messageTs, isCheckpointCheckedOut = _a.isCheckpointCheckedOut;
    var _b = (0, react_1.useState)(false), compareDisabled = _b[0], setCompareDisabled = _b[1];
    var _c = (0, react_1.useState)(false), restoreTaskDisabled = _c[0], setRestoreTaskDisabled = _c[1];
    var _d = (0, react_1.useState)(false), restoreWorkspaceDisabled = _d[0], setRestoreWorkspaceDisabled = _d[1];
    var _e = (0, react_1.useState)(false), restoreBothDisabled = _e[0], setRestoreBothDisabled = _e[1];
    var _f = (0, react_1.useState)(false), showRestoreConfirm = _f[0], setShowRestoreConfirm = _f[1];
    var _g = (0, react_1.useState)(false), hasMouseEntered = _g[0], setHasMouseEntered = _g[1];
    var containerRef = (0, react_1.useRef)(null);
    var tooltipRef = (0, react_1.useRef)(null);
    var _h = (0, react_3.useFloating)({
        placement: "bottom-end",
        middleware: [
            (0, react_3.offset)({
                mainAxis: 8,
                crossAxis: 10,
            }),
            (0, react_3.flip)(),
            (0, react_3.shift)(),
        ],
    }), refs = _h.refs, floatingStyles = _h.floatingStyles, update = _h.update, placement = _h.placement;
    (0, react_1.useEffect)(function () {
        var handleScroll = function () {
            update();
        };
        window.addEventListener("scroll", handleScroll, true);
        return function () { return window.removeEventListener("scroll", handleScroll, true); };
    }, [update]);
    (0, react_1.useEffect)(function () {
        if (showRestoreConfirm) {
            update();
        }
    }, [showRestoreConfirm, update]);
    var handleMessage = (0, react_1.useCallback)(function (event) {
        if (event.data.type === "relinquishControl") {
            setCompareDisabled(false);
            setRestoreTaskDisabled(false);
            setRestoreWorkspaceDisabled(false);
            setRestoreBothDisabled(false);
            setShowRestoreConfirm(false);
        }
    }, []);
    var handleRestoreTask = function () {
        setRestoreTaskDisabled(true);
        vscode_1.vscode.postMessage({
            type: "checkpointRestore",
            number: messageTs,
            text: "task",
        });
    };
    var handleRestoreWorkspace = function () {
        setRestoreWorkspaceDisabled(true);
        vscode_1.vscode.postMessage({
            type: "checkpointRestore",
            number: messageTs,
            text: "workspace",
        });
    };
    var handleRestoreBoth = function () {
        setRestoreBothDisabled(true);
        vscode_1.vscode.postMessage({
            type: "checkpointRestore",
            number: messageTs,
            text: "taskAndWorkspace",
        });
    };
    var handleMouseEnter = function () {
        setHasMouseEntered(true);
    };
    var handleMouseLeave = function () {
        if (hasMouseEntered) {
            setShowRestoreConfirm(false);
            setHasMouseEntered(false);
        }
    };
    var handleControlsMouseLeave = function (e) {
        var tooltipElement = tooltipRef.current;
        if (tooltipElement && showRestoreConfirm) {
            var tooltipRect = tooltipElement.getBoundingClientRect();
            if (e.clientY >= tooltipRect.top &&
                e.clientY <= tooltipRect.bottom &&
                e.clientX >= tooltipRect.left &&
                e.clientX <= tooltipRect.right) {
                return;
            }
        }
        setShowRestoreConfirm(false);
        setHasMouseEntered(false);
    };
    (0, react_use_1.useEvent)("message", handleMessage);
    return (<Container isMenuOpen={showRestoreConfirm} $isCheckedOut={isCheckpointCheckedOut} onMouseLeave={handleControlsMouseLeave}>
			<i className="codicon codicon-bookmark" style={{
            color: isCheckpointCheckedOut ? "var(--vscode-textLink-foreground)" : "var(--vscode-descriptionForeground)",
            fontSize: "12px",
            flexShrink: 0,
        }}/>
			<Label $isCheckedOut={isCheckpointCheckedOut}>
				{isCheckpointCheckedOut ? "Checkpoint (restored)" : "Checkpoint"}
			</Label>
			<DottedLine $isCheckedOut={isCheckpointCheckedOut}/>
			<ButtonGroup>
				<CustomButton $isCheckedOut={isCheckpointCheckedOut} disabled={compareDisabled} style={{ cursor: compareDisabled ? "wait" : "pointer" }} onClick={function () {
            setCompareDisabled(true);
            vscode_1.vscode.postMessage({
                type: "checkpointDiff",
                number: messageTs,
            });
        }}>
					Compare
				</CustomButton>
				<DottedLine small $isCheckedOut={isCheckpointCheckedOut}/>
				<div ref={refs.setReference} style={{ position: "relative", marginTop: -2 }}>
					<CustomButton $isCheckedOut={isCheckpointCheckedOut} isActive={showRestoreConfirm} onClick={function () { return setShowRestoreConfirm(true); }}>
						Restore
					</CustomButton>
					{showRestoreConfirm &&
            (0, react_dom_1.createPortal)(<RestoreConfirmTooltip ref={refs.setFloating} style={floatingStyles} data-placement={placement} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
								<RestoreOption>
									<react_2.VSCodeButton onClick={handleRestoreWorkspace} disabled={restoreWorkspaceDisabled} style={{
                    cursor: restoreWorkspaceDisabled ? "wait" : "pointer",
                    width: "100%",
                    marginBottom: "10px",
                }}>
										Restore Files
									</react_2.VSCodeButton>
									<p>
										Restores your project's files back to a snapshot taken at this point (use "Compare" to see
										what will be reverted)
									</p>
								</RestoreOption>
								<RestoreOption>
									<react_2.VSCodeButton onClick={handleRestoreTask} disabled={restoreTaskDisabled} style={{
                    cursor: restoreTaskDisabled ? "wait" : "pointer",
                    width: "100%",
                    marginBottom: "10px",
                }}>
										Restore Task Only
									</react_2.VSCodeButton>
									<p>Deletes messages after this point (does not affect workspace files)</p>
								</RestoreOption>
								<RestoreOption>
									<react_2.VSCodeButton onClick={handleRestoreBoth} disabled={restoreBothDisabled} style={{
                    cursor: restoreBothDisabled ? "wait" : "pointer",
                    width: "100%",
                    marginBottom: "10px",
                }}>
										Restore Files & Task
									</react_2.VSCodeButton>
									<p>Restores your project's files and deletes all messages after this point</p>
								</RestoreOption>
							</RestoreConfirmTooltip>, document.body)}
				</div>
				<DottedLine small $isCheckedOut={isCheckpointCheckedOut}/>
			</ButtonGroup>
		</Container>);
};
exports.CheckmarkControl = CheckmarkControl;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tdisplay: flex;\n\talign-items: center;\n\tpadding: 4px 0;\n\tgap: 4px;\n\tposition: relative;\n\tmin-width: 0;\n\tmargin-top: -10px;\n\tmargin-bottom: -10px;\n\topacity: ", ";\n\n\t&:hover {\n\t\topacity: 1;\n\t}\n"], ["\n\tdisplay: flex;\n\talign-items: center;\n\tpadding: 4px 0;\n\tgap: 4px;\n\tposition: relative;\n\tmin-width: 0;\n\tmargin-top: -10px;\n\tmargin-bottom: -10px;\n\topacity: ", ";\n\n\t&:hover {\n\t\topacity: 1;\n\t}\n"])), function (props) { return (props.$isCheckedOut ? 1 : props.isMenuOpen ? 1 : 0.5); });
var Label = styled_components_1.default.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tcolor: ", ";\n\tfont-size: 9px;\n\tflex-shrink: 0;\n"], ["\n\tcolor: ", ";\n\tfont-size: 9px;\n\tflex-shrink: 0;\n"])), function (props) { return (props.$isCheckedOut ? "var(--vscode-textLink-foreground)" : "var(--vscode-descriptionForeground)"); });
var DottedLine = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tflex: ", ";\n\tmin-width: ", ";\n\theight: 1px;\n\tbackground-image: linear-gradient(\n\t\tto right,\n\t\t", " 50%,\n\t\ttransparent 50%\n\t);\n\tbackground-size: 4px 1px;\n\tbackground-repeat: repeat-x;\n"], ["\n\tflex: ", ";\n\tmin-width: ", ";\n\theight: 1px;\n\tbackground-image: linear-gradient(\n\t\tto right,\n\t\t", " 50%,\n\t\ttransparent 50%\n\t);\n\tbackground-size: 4px 1px;\n\tbackground-repeat: repeat-x;\n"])), function (props) { return (props.small ? "0 0 5px" : "1"); }, function (props) { return (props.small ? "5px" : "5px"); }, function (props) { return (props.$isCheckedOut ? "var(--vscode-textLink-foreground)" : "var(--vscode-descriptionForeground)"); });
var ButtonGroup = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 4px;\n\tflex-shrink: 0;\n"], ["\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 4px;\n\tflex-shrink: 0;\n"])));
var CustomButton = styled_components_1.default.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\tbackground: ", ";\n\tborder: none;\n\tcolor: ", ";\n\tpadding: 2px 6px;\n\tfont-size: 9px;\n\tcursor: pointer;\n\tposition: relative;\n\n\t&::before {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tbottom: 0;\n\t\tborder-radius: 1px;\n\t\tbackground-image: ", ";\n\t\tbackground-size: ", ";\n\t\tbackground-repeat: repeat-x, repeat-y, repeat-x, repeat-y;\n\t\tbackground-position:\n\t\t\t0 0,\n\t\t\t100% 0,\n\t\t\t0 100%,\n\t\t\t0 0;\n\t}\n\n\t&:hover:not(:disabled) {\n\t\tbackground: ", ";\n\t\tcolor: var(--vscode-editor-background);\n\t\t&::before {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\topacity: 0.5;\n\t\tcursor: not-allowed;\n\t}\n"], ["\n\tbackground: ", ";\n\tborder: none;\n\tcolor: ", ";\n\tpadding: 2px 6px;\n\tfont-size: 9px;\n\tcursor: pointer;\n\tposition: relative;\n\n\t&::before {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tbottom: 0;\n\t\tborder-radius: 1px;\n\t\tbackground-image: ", ";\n\t\tbackground-size: ", ";\n\t\tbackground-repeat: repeat-x, repeat-y, repeat-x, repeat-y;\n\t\tbackground-position:\n\t\t\t0 0,\n\t\t\t100% 0,\n\t\t\t0 100%,\n\t\t\t0 0;\n\t}\n\n\t&:hover:not(:disabled) {\n\t\tbackground: ", ";\n\t\tcolor: var(--vscode-editor-background);\n\t\t&::before {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\topacity: 0.5;\n\t\tcursor: not-allowed;\n\t}\n"])), function (props) {
    return props.isActive || props.disabled
        ? props.$isCheckedOut
            ? "var(--vscode-textLink-foreground)"
            : "var(--vscode-descriptionForeground)"
        : "transparent";
}, function (props) {
    return props.isActive || props.disabled
        ? "var(--vscode-editor-background)"
        : props.$isCheckedOut
            ? "var(--vscode-textLink-foreground)"
            : "var(--vscode-descriptionForeground)";
}, function (props) {
    return props.isActive || props.disabled
        ? "none"
        : "linear-gradient(to right, ".concat(props.$isCheckedOut ? "var(--vscode-textLink-foreground)" : "var(--vscode-descriptionForeground)", " 50%, transparent 50%),\n\t\t\tlinear-gradient(to bottom, ").concat(props.$isCheckedOut ? "var(--vscode-textLink-foreground)" : "var(--vscode-descriptionForeground)", " 50%, transparent 50%),\n\t\t\tlinear-gradient(to right, ").concat(props.$isCheckedOut ? "var(--vscode-textLink-foreground)" : "var(--vscode-descriptionForeground)", " 50%, transparent 50%),\n\t\t\tlinear-gradient(to bottom, ").concat(props.$isCheckedOut ? "var(--vscode-textLink-foreground)" : "var(--vscode-descriptionForeground)", " 50%, transparent 50%)");
}, function (props) { return (props.isActive || props.disabled ? "auto" : "4px 1px, 1px 4px, 4px 1px, 1px 4px"); }, function (props) {
    return props.$isCheckedOut ? "var(--vscode-textLink-foreground)" : "var(--vscode-descriptionForeground)";
});
var RestoreOption = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n\t&:not(:last-child) {\n\t\tmargin-bottom: 10px;\n\t\tpadding-bottom: 4px;\n\t\tborder-bottom: 1px solid var(--vscode-editorGroup-border);\n\t}\n\n\tp {\n\t\tmargin: 0 0 2px 0;\n\t\tcolor: var(--vscode-descriptionForeground);\n\t\tfont-size: 11px;\n\t\tline-height: 14px;\n\t}\n\n\t&:last-child p {\n\t\tmargin: 0 0 -2px 0;\n\t}\n"], ["\n\t&:not(:last-child) {\n\t\tmargin-bottom: 10px;\n\t\tpadding-bottom: 4px;\n\t\tborder-bottom: 1px solid var(--vscode-editorGroup-border);\n\t}\n\n\tp {\n\t\tmargin: 0 0 2px 0;\n\t\tcolor: var(--vscode-descriptionForeground);\n\t\tfont-size: 11px;\n\t\tline-height: 14px;\n\t}\n\n\t&:last-child p {\n\t\tmargin: 0 0 -2px 0;\n\t}\n"])));
var RestoreConfirmTooltip = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n\tposition: fixed;\n\tbackground: ", ";\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tpadding: 12px;\n\tborder-radius: 3px;\n\twidth: min(calc(100vw - 54px), 600px);\n\tz-index: 1000;\n\n\t// Add invisible padding to create a safe hover zone\n\t&::before {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\ttop: -8px;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 8px;\n\t}\n\n\t// Adjust arrow to be above the padding\n\t&::after {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\ttop: -6px;\n\t\tright: 24px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tbackground: ", ";\n\t\tborder-left: 1px solid var(--vscode-editorGroup-border);\n\t\tborder-top: 1px solid var(--vscode-editorGroup-border);\n\t\ttransform: rotate(45deg);\n\t\tz-index: 1;\n\t}\n\n\t// When menu appears above the button\n\t&[data-placement^=\"top\"] {\n\t\t&::before {\n\t\t\ttop: auto;\n\t\t\tbottom: -8px;\n\t\t}\n\n\t\t&::after {\n\t\t\ttop: auto;\n\t\t\tbottom: -6px;\n\t\t\tright: 24px;\n\t\t\ttransform: rotate(225deg);\n\t\t}\n\t}\n\n\tp {\n\t\tmargin: 0 0 6px 0;\n\t\tcolor: var(--vscode-descriptionForeground);\n\t\tfont-size: 12px;\n\t\twhite-space: normal;\n\t\tword-wrap: break-word;\n\t}\n"], ["\n\tposition: fixed;\n\tbackground: ", ";\n\tborder: 1px solid var(--vscode-editorGroup-border);\n\tpadding: 12px;\n\tborder-radius: 3px;\n\twidth: min(calc(100vw - 54px), 600px);\n\tz-index: 1000;\n\n\t// Add invisible padding to create a safe hover zone\n\t&::before {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\ttop: -8px;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 8px;\n\t}\n\n\t// Adjust arrow to be above the padding\n\t&::after {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\ttop: -6px;\n\t\tright: 24px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tbackground: ", ";\n\t\tborder-left: 1px solid var(--vscode-editorGroup-border);\n\t\tborder-top: 1px solid var(--vscode-editorGroup-border);\n\t\ttransform: rotate(45deg);\n\t\tz-index: 1;\n\t}\n\n\t// When menu appears above the button\n\t&[data-placement^=\"top\"] {\n\t\t&::before {\n\t\t\ttop: auto;\n\t\t\tbottom: -8px;\n\t\t}\n\n\t\t&::after {\n\t\t\ttop: auto;\n\t\t\tbottom: -6px;\n\t\t\tright: 24px;\n\t\t\ttransform: rotate(225deg);\n\t\t}\n\t}\n\n\tp {\n\t\tmargin: 0 0 6px 0;\n\t\tcolor: var(--vscode-descriptionForeground);\n\t\tfont-size: 12px;\n\t\twhite-space: normal;\n\t\tword-wrap: break-word;\n\t}\n"])), CodeBlock_1.CODE_BLOCK_BG_COLOR, CodeBlock_1.CODE_BLOCK_BG_COLOR);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
