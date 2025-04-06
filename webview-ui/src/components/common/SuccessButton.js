"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("@vscode/webview-ui-toolkit/react")
var SuccessButtonTW = function (props) {
	return (
		<react_1.VSCodeButton
			{...props}
			className={"\n\t\t\t\t!bg-[#176f2c] \n\t\t\t\t!border-[#176f2c] \n\t\t\t\t!text-white\n\t\t\t\thover:!bg-[#197f31] \n\t\t\t\thover:!border-[#197f31]\n\t\t\t\tactive:!bg-[#156528] \n\t\t\t\tactive:!border-[#156528]\n\t\t\t\t"
				.concat(props.className || "", "\n\t\t\t")
				.replace(/\s+/g, " ")
				.trim()}
		/>
	)
}
exports.default = SuccessButtonTW
