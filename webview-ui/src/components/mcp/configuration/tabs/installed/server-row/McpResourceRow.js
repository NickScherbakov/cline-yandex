"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var McpResourceRow = function (_a) {
    var item = _a.item;
    var hasUri = "uri" in item;
    var uri = hasUri ? item.uri : item.uriTemplate;
    return (<div key={uri} style={{
            padding: "3px 0",
        }}>
			<div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "4px",
        }}>
				<span className={"codicon codicon-symbol-file"} style={{ marginRight: "6px" }}/>
				<span style={{ fontWeight: 500, wordBreak: "break-all" }}>{uri}</span>
			</div>
			<div style={{
            fontSize: "12px",
            opacity: 0.8,
            margin: "4px 0",
        }}>
				{item.name && item.description
            ? "".concat(item.name, ": ").concat(item.description)
            : !item.name && item.description
                ? item.description
                : !item.description && item.name
                    ? item.name
                    : "No description"}
			</div>
			<div style={{
            fontSize: "12px",
        }}>
				<span style={{ opacity: 0.8 }}>Returns </span>
				<code style={{
            color: "var(--vscode-textPreformat-foreground)",
            background: "var(--vscode-textPreformat-background)",
            padding: "1px 4px",
            borderRadius: "3px",
        }}>
					{item.mimeType || "Unknown"}
				</code>
			</div>
		</div>);
};
exports.default = McpResourceRow;
