"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var VSCodeButtonLink_1 = require("@/components/common/VSCodeButtonLink");
var react_2 = require("@vscode/webview-ui-toolkit/react");
var vscode_1 = require("@/utils/vscode");
var CreditLimitError = function (_a) {
    var currentBalance = _a.currentBalance, totalSpent = _a.totalSpent, totalPromotions = _a.totalPromotions, message = _a.message;
    return (<div style={{
            backgroundColor: "var(--vscode-textBlockQuote-background)",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "12px",
        }}>
			<div style={{ color: "var(--vscode-errorForeground)", marginBottom: "8px" }}>{message}</div>
			<div style={{ marginBottom: "12px" }}>
				<div style={{ color: "var(--vscode-foreground)" }}>
					Current Balance: <span style={{ fontWeight: "bold" }}>${currentBalance.toFixed(2)}</span>
				</div>
				<div style={{ color: "var(--vscode-foreground)" }}>Total Spent: ${totalSpent.toFixed(2)}</div>
				<div style={{ color: "var(--vscode-foreground)" }}>Total Promotions: ${totalPromotions.toFixed(2)}</div>
			</div>

			<VSCodeButtonLink_1.default href="https://app.cline.bot/credits/#buy" style={{
            width: "100%",
            marginBottom: "8px",
        }}>
				<span className="codicon codicon-credit-card" style={{ fontSize: "14px", marginRight: "6px" }}/>
				Buy Credits
			</VSCodeButtonLink_1.default>

			<react_2.VSCodeButton onClick={function () {
            vscode_1.vscode.postMessage({
                type: "invoke",
                text: "primaryButtonClick",
            });
        }} appearance="secondary" style={{
            width: "100%",
        }}>
				<span className="codicon codicon-refresh" style={{ fontSize: "14px", marginRight: "6px" }}/>
				Retry Request
			</react_2.VSCodeButton>
		</div>);
};
exports.default = CreditLimitError;
