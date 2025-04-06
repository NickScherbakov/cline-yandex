"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRow_1 = require("./server-row/ServerRow");
var ServersToggleList = function (_a) {
    var servers = _a.servers;
    return servers.length > 0 ? (<div className="flex flex-col gap-2.5">
			{servers.map(function (server) { return (<ServerRow_1.default key={server.name} server={server}/>); })}
		</div>) : (<div className="flex flex-col items-center gap-3 my-5 text-[var(--vscode-descriptionForeground)]">
			No MCP servers installed
		</div>);
};
exports.default = ServersToggleList;
