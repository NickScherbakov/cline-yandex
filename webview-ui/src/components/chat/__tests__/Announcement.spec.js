"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var vitest_1 = require("vitest");
var Announcement_1 = require("../Announcement");
vitest_1.vi.mock("@vscode/webview-ui-toolkit/react", function () { return ({
    useTheme: function () { return ({ themeType: "light" }); },
    VSCodeButton: function (props) { return <button {...props}>{props.children}</button>; },
    VSCodeLink: function (_a) {
        var children = _a.children;
        return <a>{children}</a>;
    },
}); });
(0, vitest_1.describe)("Announcement", function () {
    var hideAnnouncement = vitest_1.vi.fn();
    (0, vitest_1.it)("renders the announcement with the correct version", function () {
        (0, react_1.render)(<Announcement_1.default version="2.0.0" hideAnnouncement={hideAnnouncement}/>);
        (0, vitest_1.expect)(react_1.screen.getByText(/New in v2.0/)).toBeInTheDocument();
    });
    (0, vitest_1.it)("calls hideAnnouncement when close button is clicked", function () {
        (0, react_1.render)(<Announcement_1.default version="2.0.0" hideAnnouncement={hideAnnouncement}/>);
        react_1.fireEvent.click(react_1.screen.getByRole("button"));
        (0, vitest_1.expect)(hideAnnouncement).toHaveBeenCalled();
    });
    (0, vitest_1.it)("renders the mcp server improvements announcement", function () {
        (0, react_1.render)(<Announcement_1.default version="2.0.0" hideAnnouncement={hideAnnouncement}/>);
        (0, vitest_1.expect)(react_1.screen.getByText(/MCP server improvements:/)).toBeInTheDocument();
    });
    (0, vitest_1.it)("renders the 'See new changes' button feature", function () {
        (0, react_1.render)(<Announcement_1.default version="2.0.0" hideAnnouncement={hideAnnouncement}/>);
        (0, vitest_1.expect)(react_1.screen.getByText(/See it in action here./)).toBeInTheDocument();
    });
    (0, vitest_1.it)("renders the demo link", function () {
        (0, react_1.render)(<Announcement_1.default version="2.0.0" hideAnnouncement={hideAnnouncement}/>);
        (0, vitest_1.expect)(react_1.screen.getByText(/See a demo here./)).toBeInTheDocument();
    });
});
