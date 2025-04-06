"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.ClineAccountInfoCard = void 0
var react_1 = require("@vscode/webview-ui-toolkit/react")
var FirebaseAuthContext_1 = require("@/context/FirebaseAuthContext")
var vscode_1 = require("@/utils/vscode")
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext")
var ClineAccountInfoCard = function () {
	var _a = (0, FirebaseAuthContext_1.useFirebaseAuth)(),
		firebaseUser = _a.user,
		handleSignOut = _a.handleSignOut
	var _b = (0, ExtensionStateContext_1.useExtensionState)(),
		userInfo = _b.userInfo,
		apiConfiguration = _b.apiConfiguration
	var user = (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.clineApiKey)
		? firebaseUser || userInfo
		: undefined
	var handleLogin = function () {
		vscode_1.vscode.postMessage({ type: "accountLoginClicked" })
	}
	var handleLogout = function () {
		// First notify extension to clear API keys and state
		vscode_1.vscode.postMessage({ type: "accountLogoutClicked" })
		// Then sign out of Firebase
		handleSignOut()
	}
	var handleShowAccount = function () {
		vscode_1.vscode.postMessage({ type: "showAccountViewClicked" })
	}
	return (
		<div className="max-w-[600px]">
			{user ? (
				<react_1.VSCodeButton appearance="secondary" onClick={handleShowAccount}>
					View Billing & Usage
				</react_1.VSCodeButton>
			) : (
				// <div className="p-2 rounded-[2px] bg-[var(--vscode-dropdown-background)]">
				// 	<div className="flex items-center gap-3">
				// 		{user.photoURL ? (
				// 			<img src={user.photoURL} alt="Profile" className="w-[38px] h-[38px] rounded-full flex-shrink-0" />
				// 		) : (
				// 			<div className="w-[38px] h-[38px] rounded-full bg-[var(--vscode-button-background)] flex items-center justify-center text-xl text-[var(--vscode-button-foreground)] flex-shrink-0">
				// 				{user.displayName?.[0] || user.email?.[0] || "?"}
				// 			</div>
				// 		)}
				// 		<div className="flex flex-col gap-1 flex-1 overflow-hidden">
				// 			{user.displayName && (
				// 				<div className="text-[13px] font-bold text-[var(--vscode-foreground)] break-words">
				// 					{user.displayName}
				// 				</div>
				// 			)}
				// 			{user.email && (
				// 				<div className="text-[13px] text-[var(--vscode-descriptionForeground)] break-words overflow-hidden text-ellipsis">
				// 					{user.email}
				// 				</div>
				// 			)}
				// 			<div className="flex gap-2 flex-wrap mt-1">
				// 				<VSCodeButton
				// 					appearance="secondary"
				// 					onClick={handleLogout}
				// 					className="scale-[0.85] origin-left w-fit mt-0.5 mb-0 -mr-3">
				// 					Log out
				// 				</VSCodeButton>
				// 			</div>
				// 		</div>
				// 	</div>
				// </div>
				<div>
					<react_1.VSCodeButton onClick={handleLogin} className="mt-0">
						Sign Up with Cline
					</react_1.VSCodeButton>
				</div>
			)}
		</div>
	)
}
exports.ClineAccountInfoCard = ClineAccountInfoCard
