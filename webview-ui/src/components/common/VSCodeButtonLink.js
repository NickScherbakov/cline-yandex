"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@vscode/webview-ui-toolkit/react");
var VSCodeButtonLink = function (_a) {
    var href = _a.href, children = _a.children, props = __rest(_a, ["href", "children"]);
    return (<a href={href} style={{
            textDecoration: "none",
            color: "inherit",
        }}>
			<react_2.VSCodeButton {...props}>{children}</react_2.VSCodeButton>
		</a>);
};
exports.default = VSCodeButtonLink;
