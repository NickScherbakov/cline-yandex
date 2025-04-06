"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var CardContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tpadding: 2px 4px;\n\tmargin-bottom: 2px;\n\tborder-radius: 3px;\n\tborder: 1px solid var(--vscode-textLink-foreground);\n\topacity: ", ";\n\tcursor: pointer;\n\n\t&:hover {\n\t\tbackground-color: var(--vscode-list-hoverBackground);\n\t\topacity: 1;\n\t}\n"], ["\n\tpadding: 2px 4px;\n\tmargin-bottom: 2px;\n\tborder-radius: 3px;\n\tborder: 1px solid var(--vscode-textLink-foreground);\n\topacity: ", ";\n\tcursor: pointer;\n\n\t&:hover {\n\t\tbackground-color: var(--vscode-list-hoverBackground);\n\t\topacity: 1;\n\t}\n"])), function (props) { return (props.isSelected ? 1 : 0.6); });
var ModelHeader = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n"], ["\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n"])));
var ModelName = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tfont-weight: 500;\n\tfont-size: 12px;\n\tline-height: 1.2;\n"], ["\n\tfont-weight: 500;\n\tfont-size: 12px;\n\tline-height: 1.2;\n"])));
var Label = styled_components_1.default.span(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tfont-size: 10px;\n\tcolor: var(--vscode-textLink-foreground);\n\ttext-transform: uppercase;\n\tletter-spacing: 0.5px;\n\tfont-weight: 500;\n"], ["\n\tfont-size: 10px;\n\tcolor: var(--vscode-textLink-foreground);\n\ttext-transform: uppercase;\n\tletter-spacing: 0.5px;\n\tfont-weight: 500;\n"])));
var Description = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\tmargin-top: 0px;\n\tfont-size: 11px;\n\tcolor: var(--vscode-descriptionForeground);\n\tline-height: 1.2;\n"], ["\n\tmargin-top: 0px;\n\tfont-size: 11px;\n\tcolor: var(--vscode-descriptionForeground);\n\tline-height: 1.2;\n"])));
var FeaturedModelCard = function (_a) {
    var modelId = _a.modelId, description = _a.description, onClick = _a.onClick, isSelected = _a.isSelected, label = _a.label;
    return (<CardContainer isSelected={isSelected} onClick={onClick}>
			<ModelHeader>
				<ModelName>{modelId}</ModelName>
				<Label>{label}</Label>
			</ModelHeader>
			<Description>{description}</Description>
		</CardContainer>);
};
exports.default = FeaturedModelCard;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
