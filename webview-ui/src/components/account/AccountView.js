"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClineAccountView = void 0;
var react_1 = require("@vscode/webview-ui-toolkit/react");
var react_2 = require("react");
var FirebaseAuthContext_1 = require("@/context/FirebaseAuthContext");
var vscode_1 = require("@/utils/vscode");
var VSCodeButtonLink_1 = require("../common/VSCodeButtonLink");
var ClineLogoWhite_1 = require("../../assets/ClineLogoWhite");
var react_countup_1 = require("react-countup");
var CreditsHistoryTable_1 = require("./CreditsHistoryTable");
var ExtensionStateContext_1 = require("@/context/ExtensionStateContext");
var AccountView = function (_a) {
    var onDone = _a.onDone;
    return (<div className="fixed inset-0 flex flex-col overflow-hidden pt-[10px] pl-[20px]">
			<div className="flex justify-between items-center mb-[17px] pr-[17px]">
				<h3 className="text-[var(--vscode-foreground)] m-0">Account</h3>
				<react_1.VSCodeButton onClick={onDone}>Done</react_1.VSCodeButton>
			</div>
			<div className="flex-grow overflow-hidden pr-[8px] flex flex-col">
				<div className="h-full mb-[5px]">
					<exports.ClineAccountView />
				</div>
			</div>
		</div>);
};
var ClineAccountView = function () {
    var _a, _b;
    var _c = (0, FirebaseAuthContext_1.useFirebaseAuth)(), firebaseUser = _c.user, handleSignOut = _c.handleSignOut;
    var _d = (0, ExtensionStateContext_1.useExtensionState)(), userInfo = _d.userInfo, apiConfiguration = _d.apiConfiguration;
    var user = (apiConfiguration === null || apiConfiguration === void 0 ? void 0 : apiConfiguration.clineApiKey) ? firebaseUser || userInfo : undefined;
    var _e = (0, react_2.useState)(0), balance = _e[0], setBalance = _e[1];
    var _f = (0, react_2.useState)(true), isLoading = _f[0], setIsLoading = _f[1];
    var _g = (0, react_2.useState)([]), usageData = _g[0], setUsageData = _g[1];
    var _h = (0, react_2.useState)([]), paymentsData = _h[0], setPaymentsData = _h[1];
    // Listen for balance and transaction data updates from the extension
    (0, react_2.useEffect)(function () {
        var handleMessage = function (event) {
            var message = event.data;
            if (message.type === "userCreditsBalance" && message.userCreditsBalance) {
                setBalance(message.userCreditsBalance.currentBalance);
            }
            else if (message.type === "userCreditsUsage" && message.userCreditsUsage) {
                setUsageData(message.userCreditsUsage.usageTransactions);
            }
            else if (message.type === "userCreditsPayments" && message.userCreditsPayments) {
                setPaymentsData(message.userCreditsPayments.paymentTransactions);
            }
            setIsLoading(false);
        };
        window.addEventListener("message", handleMessage);
        // Fetch all account data when component mounts
        if (user) {
            setIsLoading(true);
            vscode_1.vscode.postMessage({ type: "fetchUserCreditsData" });
        }
        return function () {
            window.removeEventListener("message", handleMessage);
        };
    }, [user]);
    var handleLogin = function () {
        vscode_1.vscode.postMessage({ type: "accountLoginClicked" });
    };
    var handleLogout = function () {
        // First notify extension to clear API keys and state
        vscode_1.vscode.postMessage({ type: "accountLogoutClicked" });
        // Then sign out of Firebase
        handleSignOut();
    };
    return (<div className="h-full flex flex-col">
			{user ? (<div className="flex flex-col pr-3 h-full">
					<div className="flex flex-col w-full">
						<div className="flex items-center mb-6 flex-wrap gap-y-4">
							{user.photoURL ? (<img src={user.photoURL} alt="Profile" className="size-16 rounded-full mr-4"/>) : (<div className="size-16 rounded-full bg-[var(--vscode-button-background)] flex items-center justify-center text-2xl text-[var(--vscode-button-foreground)] mr-4">
									{((_a = user.displayName) === null || _a === void 0 ? void 0 : _a[0]) || ((_b = user.email) === null || _b === void 0 ? void 0 : _b[0]) || "?"}
								</div>)}

							<div className="flex flex-col">
								{user.displayName && (<h2 className="text-[var(--vscode-foreground)] m-0 mb-1 text-lg font-medium">
										{user.displayName}
									</h2>)}

								{user.email && (<div className="text-sm text-[var(--vscode-descriptionForeground)]">{user.email}</div>)}
							</div>
						</div>
					</div>

					<div className="w-full flex gap-2 flex-col min-[225px]:flex-row">
						<div className="w-full min-[225px]:w-1/2">
							<VSCodeButtonLink_1.default href="https://app.cline.bot/credits" appearance="primary" className="w-full">
								Dashboard
							</VSCodeButtonLink_1.default>
						</div>
						<react_1.VSCodeButton appearance="secondary" onClick={handleLogout} className="w-full min-[225px]:w-1/2">
							Log out
						</react_1.VSCodeButton>
					</div>

					<react_1.VSCodeDivider className="w-full my-6"/>

					<div className="w-full flex flex-col items-center">
						<div className="text-sm text-[var(--vscode-descriptionForeground)] mb-3">CURRENT BALANCE</div>

						<div className="text-4xl font-bold text-[var(--vscode-foreground)] mb-6 flex items-center gap-2">
							{isLoading ? (<div className="text-[var(--vscode-descriptionForeground)]">Loading...</div>) : (<>
									<span>$</span>
									<react_countup_1.default end={balance} duration={0.66} decimals={2}/>
									<react_1.VSCodeButton appearance="icon" className="mt-1" onClick={function () { return vscode_1.vscode.postMessage({ type: "fetchUserCreditsData" }); }}>
										<span className="codicon codicon-refresh"></span>
									</react_1.VSCodeButton>
								</>)}
						</div>

						<div className="w-full">
							<VSCodeButtonLink_1.default href="https://app.cline.bot/credits/#buy" className="w-full">
								Add Credits
							</VSCodeButtonLink_1.default>
						</div>
					</div>

					<react_1.VSCodeDivider className="mt-6 mb-3 w-full"/>

					<div className="flex-grow flex flex-col min-h-0 pb-[0px]">
						<CreditsHistoryTable_1.default isLoading={isLoading} usageData={usageData} paymentsData={paymentsData}/>
					</div>
				</div>) : (<div className="flex flex-col items-center pr-3">
					<ClineLogoWhite_1.default className="size-16 mb-4"/>

					<p style={{}}>
						Sign up for an account to get access to the latest models, billing dashboard to view usage and credits,
						and more upcoming features.
					</p>

					<react_1.VSCodeButton onClick={handleLogin} className="w-full mb-4">
						Sign up with Cline
					</react_1.VSCodeButton>

					<p className="text-[var(--vscode-descriptionForeground)] text-xs text-center m-0">
						By continuing, you agree to the <react_1.VSCodeLink href="https://cline.bot/tos">Terms of Service</react_1.VSCodeLink> and{" "}
						<react_1.VSCodeLink href="https://cline.bot/privacy">Privacy Policy.</react_1.VSCodeLink>
					</p>
				</div>)}
		</div>);
};
exports.ClineAccountView = ClineAccountView;
exports.default = (0, react_2.memo)(AccountView);
