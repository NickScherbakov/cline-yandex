"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("react")
var vscode_1 = require("@/utils/vscode")
var AccountOptions = function () {
	var handleAccountClick = function () {
		vscode_1.vscode.postMessage({ type: "accountLoginClicked" })
	}
	// Call handleAccountClick immediately when component mounts
	handleAccountClick()
	return null // This component doesn't render anything
}
exports.default = (0, react_1.memo)(AccountOptions)
