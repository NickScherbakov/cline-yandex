"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("@vscode/webview-ui-toolkit/react")
var DangerButton = function (props) {
	return (
		<react_1.VSCodeButton
			{...props}
			className={"\n\t\t\t\t!bg-[#c42b2b] \n\t\t\t\t!border-[#c42b2b] \n\t\t\t\t!text-white\n\t\t\t\thover:!bg-[#a82424] \n\t\t\t\thover:!border-[#a82424]\n\t\t\t\tactive:!bg-[#8f1f1f] \n\t\t\t\tactive:!border-[#8f1f1f]\n\t\t\t\t".concat(
				props.className || "",
				"\n\t\t\t",
			)}
		/>
	)
}
exports.default = DangerButton
