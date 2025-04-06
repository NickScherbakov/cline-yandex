"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var vscode_1 = require("@/utils/vscode");
var react_2 = require("@vscode/webview-ui-toolkit/react");
var IconWrapper = styled_components_1.default.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tcolor: var(--vscode-descriptionForeground);\n"], ["\n\tcolor: var(--vscode-descriptionForeground);\n"])));
var ButtonWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\ttransform: scale(0.85);\n"], ["\n\ttransform: scale(0.85);\n"])));
var TaskFeedbackButtons = function (_a) {
    var messageTs = _a.messageTs, _b = _a.isFromHistory, isFromHistory = _b === void 0 ? false : _b, style = _a.style;
    var _c = (0, react_1.useState)(null), feedback = _c[0], setFeedback = _c[1];
    var _d = (0, react_1.useState)(true), shouldShow = _d[0], setShouldShow = _d[1];
    // Check localStorage on mount to see if feedback was already given for this message
    (0, react_1.useEffect)(function () {
        try {
            var feedbackHistory = localStorage.getItem("taskFeedbackHistory") || "{}";
            var history_1 = JSON.parse(feedbackHistory);
            // Check if this specific message timestamp has received feedback
            if (history_1[messageTs]) {
                setShouldShow(false);
            }
        }
        catch (e) {
            console.error("Error checking feedback history:", e);
        }
    }, [messageTs]);
    // Don't show buttons if this is from history or feedback was already given
    if (isFromHistory || !shouldShow) {
        return null;
    }
    var handleFeedback = function (type) {
        if (feedback !== null)
            return; // Already provided feedback
        setFeedback(type);
        // Send feedback to extension
        vscode_1.vscode.postMessage({
            type: "taskFeedback",
            feedbackType: type,
        });
        // Store in localStorage that feedback was provided for this message
        try {
            var feedbackHistory = localStorage.getItem("taskFeedbackHistory") || "{}";
            var history_2 = JSON.parse(feedbackHistory);
            history_2[messageTs] = true;
            localStorage.setItem("taskFeedbackHistory", JSON.stringify(history_2));
        }
        catch (e) {
            console.error("Error updating feedback history:", e);
        }
    };
    return (<Container style={style}>
			<ButtonsContainer>
				<ButtonWrapper>
					<react_2.VSCodeButton appearance="icon" onClick={function () { return handleFeedback("thumbs_up"); }} disabled={feedback !== null} title="This was helpful" aria-label="This was helpful">
						<IconWrapper>
							<span className={"codicon ".concat(feedback === "thumbs_up" ? "codicon-thumbsup-filled" : "codicon-thumbsup")}/>
						</IconWrapper>
					</react_2.VSCodeButton>
				</ButtonWrapper>
				<ButtonWrapper>
					<react_2.VSCodeButton appearance="icon" onClick={function () { return handleFeedback("thumbs_down"); }} disabled={feedback !== null && feedback !== "thumbs_down"} title="This wasn't helpful" aria-label="This wasn't helpful">
						<IconWrapper>
							<span className={"codicon ".concat(feedback === "thumbs_down" ? "codicon-thumbsdown-filled" : "codicon-thumbsdown")}/>
						</IconWrapper>
					</react_2.VSCodeButton>
				</ButtonWrapper>
				{/* <VSCodeButtonLink
            href="https://github.com/cline/cline/issues/new?template=bug_report.yml"
            appearance="icon"
            title="Report a bug"
            aria-label="Report a bug">
            <span className="codicon codicon-bug" />
        </VSCodeButtonLink> */}
			</ButtonsContainer>
		</Container>);
};
var Container = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: flex-end;\n"], ["\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: flex-end;\n"])));
var ButtonsContainer = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tdisplay: flex;\n\tgap: 0px;\n\topacity: 0.5;\n\n\t&:hover {\n\t\topacity: 1;\n\t}\n"], ["\n\tdisplay: flex;\n\tgap: 0px;\n\topacity: 0.5;\n\n\t&:hover {\n\t\topacity: 1;\n\t}\n"])));
exports.default = TaskFeedbackButtons;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
