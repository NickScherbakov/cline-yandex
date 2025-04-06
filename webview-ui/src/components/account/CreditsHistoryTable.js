"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@vscode/webview-ui-toolkit/react");
var react_2 = require("react");
var McpConfigurationView_1 = require("../mcp/configuration/McpConfigurationView");
var format_1 = require("@/utils/format");
var CreditsHistoryTable = function (_a) {
    var isLoading = _a.isLoading, usageData = _a.usageData, paymentsData = _a.paymentsData;
    var _b = (0, react_2.useState)("usage"), activeTab = _b[0], setActiveTab = _b[1];
    return (<div className="flex flex-col flex-grow h-full">
			{/* Tabs container */}
			<div className="flex border-b border-[var(--vscode-panel-border)]">
				<McpConfigurationView_1.TabButton isActive={activeTab === "usage"} onClick={function () { return setActiveTab("usage"); }}>
					USAGE HISTORY
				</McpConfigurationView_1.TabButton>
				<McpConfigurationView_1.TabButton isActive={activeTab === "payments"} onClick={function () { return setActiveTab("payments"); }}>
					PAYMENTS HISTORY
				</McpConfigurationView_1.TabButton>
			</div>

			{/* Content container */}
			<div className="mt-[15px] mb-[0px] rounded-md overflow-auto flex-grow">
				{isLoading ? (<div className="flex justify-center items-center p-4">
						<div className="text-[var(--vscode-descriptionForeground)]">Loading...</div>
					</div>) : (<>
						{activeTab === "usage" && (<>
								{usageData.length > 0 ? (<react_1.VSCodeDataGrid>
										<react_1.VSCodeDataGridRow row-type="header">
											<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="1">
												Date
											</react_1.VSCodeDataGridCell>
											<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="2">
												Model
											</react_1.VSCodeDataGridCell>
											{/* <VSCodeDataGridCell cell-type="columnheader" grid-column="3">
                        Tokens Used
                    </VSCodeDataGridCell> */}
											<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="3">
												Credits Used
											</react_1.VSCodeDataGridCell>
										</react_1.VSCodeDataGridRow>

										{usageData.map(function (row, index) { return (<react_1.VSCodeDataGridRow key={index}>
												<react_1.VSCodeDataGridCell grid-column="1">
													{(0, format_1.formatTimestamp)(row.spentAt)}
												</react_1.VSCodeDataGridCell>
												<react_1.VSCodeDataGridCell grid-column="2">{"".concat(row.modelProvider, "/").concat(row.model)}</react_1.VSCodeDataGridCell>
												{/* <VSCodeDataGridCell grid-column="3">{`${row.promptTokens} → ${row.completionTokens}`}</VSCodeDataGridCell> */}
												<react_1.VSCodeDataGridCell grid-column="3">{"$".concat(Number(row.credits).toFixed(7))}</react_1.VSCodeDataGridCell>
											</react_1.VSCodeDataGridRow>); })}
									</react_1.VSCodeDataGrid>) : (<div className="flex justify-center items-center p-4">
										<div className="text-[var(--vscode-descriptionForeground)]">No usage history</div>
									</div>)}
							</>)}

						{activeTab === "payments" && (<>
								{paymentsData.length > 0 ? (<react_1.VSCodeDataGrid>
										<react_1.VSCodeDataGridRow row-type="header">
											<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="1">
												Date
											</react_1.VSCodeDataGridCell>
											<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="2">
												Total Cost
											</react_1.VSCodeDataGridCell>
											<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="3">
												Credits
											</react_1.VSCodeDataGridCell>
										</react_1.VSCodeDataGridRow>

										{paymentsData.map(function (row, index) { return (<react_1.VSCodeDataGridRow key={index}>
												<react_1.VSCodeDataGridCell grid-column="1">
													{(0, format_1.formatTimestamp)(row.paidAt)}
												</react_1.VSCodeDataGridCell>
												<react_1.VSCodeDataGridCell grid-column="2">{"$".concat((0, format_1.formatDollars)(parseInt(row.amountCents)))}</react_1.VSCodeDataGridCell>
												<react_1.VSCodeDataGridCell grid-column="3">{"".concat(row.credits)}</react_1.VSCodeDataGridCell>
											</react_1.VSCodeDataGridRow>); })}
									</react_1.VSCodeDataGrid>) : (<div className="flex justify-center items-center p-4">
										<div className="text-[var(--vscode-descriptionForeground)]">No payment history</div>
									</div>)}
							</>)}
					</>)}
			</div>
		</div>);
};
exports.default = CreditsHistoryTable;
