"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@vscode/webview-ui-toolkit/react");
var vscode_1 = require("@/utils/vscode");
var styled_components_1 = require("styled-components");
var constants_1 = require("@/constants");
var AddLocalServerForm = function (_a) {
    var onServerAdded = _a.onServerAdded;
    return (<FormContainer>
			<div className="text-[var(--vscode-foreground)]">
				Add a local MCP server by configuring it in <code>cline_mcp_settings.json</code>. You'll need to specify the
				server name, command, arguments, and any required environment variables in the JSON configuration. Learn more
				<react_1.VSCodeLink href={constants_1.LINKS.DOCUMENTATION.LOCAL_MCP_SERVER_DOCS} style={{ display: "inline" }}>
					here.
				</react_1.VSCodeLink>
			</div>

			<react_1.VSCodeButton appearance="primary" style={{ width: "100%", marginBottom: "5px", marginTop: 8 }} onClick={function () {
            vscode_1.vscode.postMessage({ type: "openMcpSettings" });
        }}>
				Open cline_mcp_settings.json
			</react_1.VSCodeButton>
		</FormContainer>);
};
var FormContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tpadding: 16px 20px;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 8px;\n"], ["\n\tpadding: 16px 20px;\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 8px;\n"])));
exports.default = AddLocalServerForm;
var templateObject_1;
