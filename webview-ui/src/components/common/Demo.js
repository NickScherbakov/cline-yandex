"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@vscode/webview-ui-toolkit/react");
function Demo() {
    // function handleHowdyClick() {
    // 	vscode.postMessage({
    // 		command: "hello",
    // 		text: "Hey there partner! 🤠",
    // 	})
    // }
    var rowData = [
        {
            cell1: "Cell Data",
            cell2: "Cell Data",
            cell3: "Cell Data",
            cell4: "Cell Data",
        },
        {
            cell1: "Cell Data",
            cell2: "Cell Data",
            cell3: "Cell Data",
            cell4: "Cell Data",
        },
        {
            cell1: "Cell Data",
            cell2: "Cell Data",
            cell3: "Cell Data",
            cell4: "Cell Data",
        },
    ];
    return (<main>
			<h1>Hello World!</h1>
			<react_1.VSCodeButton>Howdy!</react_1.VSCodeButton>

			<div className="grid gap-3 p-2 place-items-start">
				<react_1.VSCodeDataGrid>
					<react_1.VSCodeDataGridRow row-type="header">
						<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="1">
							A Custom Header Title
						</react_1.VSCodeDataGridCell>
						<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="2">
							Another Custom Title
						</react_1.VSCodeDataGridCell>
						<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="3">
							Title Is Custom
						</react_1.VSCodeDataGridCell>
						<react_1.VSCodeDataGridCell cell-type="columnheader" grid-column="4">
							Custom Title
						</react_1.VSCodeDataGridCell>
					</react_1.VSCodeDataGridRow>
					{rowData.map(function (row, index) { return (<react_1.VSCodeDataGridRow key={index}>
							<react_1.VSCodeDataGridCell grid-column="1">{row.cell1}</react_1.VSCodeDataGridCell>
							<react_1.VSCodeDataGridCell grid-column="2">{row.cell2}</react_1.VSCodeDataGridCell>
							<react_1.VSCodeDataGridCell grid-column="3">{row.cell3}</react_1.VSCodeDataGridCell>
							<react_1.VSCodeDataGridCell grid-column="4">{row.cell4}</react_1.VSCodeDataGridCell>
						</react_1.VSCodeDataGridRow>); })}
				</react_1.VSCodeDataGrid>

				<react_1.VSCodeTextField>
					<section slot="end" style={{ display: "flex", alignItems: "center" }}>
						<react_1.VSCodeButton appearance="icon" aria-label="Match Case">
							<span className="codicon codicon-case-sensitive"></span>
						</react_1.VSCodeButton>
						<react_1.VSCodeButton appearance="icon" aria-label="Match Whole Word">
							<span className="codicon codicon-whole-word"></span>
						</react_1.VSCodeButton>
						<react_1.VSCodeButton appearance="icon" aria-label="Use Regular Expression">
							<span className="codicon codicon-regex"></span>
						</react_1.VSCodeButton>
					</section>
				</react_1.VSCodeTextField>
				<span slot="end" className="codicon codicon-chevron-right"></span>

				<span className="flex gap-3">
					<react_1.VSCodeProgressRing />
					<react_1.VSCodeTextField />
					<react_1.VSCodeButton>Add</react_1.VSCodeButton>
					<react_1.VSCodeButton appearance="secondary">Remove</react_1.VSCodeButton>
				</span>

				<react_1.VSCodeBadge>Badge</react_1.VSCodeBadge>
				<react_1.VSCodeCheckbox>Checkbox</react_1.VSCodeCheckbox>
				<react_1.VSCodeDivider />
				<react_1.VSCodeDropdown>
					<react_1.VSCodeOption>Option 1</react_1.VSCodeOption>
					<react_1.VSCodeOption>Option 2</react_1.VSCodeOption>
				</react_1.VSCodeDropdown>
				<react_1.VSCodeLink href="#">Link</react_1.VSCodeLink>
				<react_1.VSCodePanels>
					<react_1.VSCodePanelTab id="tab-1">Tab 1</react_1.VSCodePanelTab>
					<react_1.VSCodePanelTab id="tab-2">Tab 2</react_1.VSCodePanelTab>
					<react_1.VSCodePanelView id="view-1">Panel View 1</react_1.VSCodePanelView>
					<react_1.VSCodePanelView id="view-2">Panel View 2</react_1.VSCodePanelView>
				</react_1.VSCodePanels>
				<react_1.VSCodeRadioGroup>
					<react_1.VSCodeRadio>Radio 1</react_1.VSCodeRadio>
					<react_1.VSCodeRadio>Radio 2</react_1.VSCodeRadio>
				</react_1.VSCodeRadioGroup>
				<react_1.VSCodeTag>Tag</react_1.VSCodeTag>
				<react_1.VSCodeTextArea placeholder="Text Area"/>
			</div>
		</main>);
}
exports.default = Demo;
