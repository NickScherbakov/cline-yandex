import React from "react";
export interface OpenRouterModelPickerProps {
    isPopup?: boolean;
}
declare const OpenRouterModelPicker: React.FC<OpenRouterModelPickerProps>;
export default OpenRouterModelPicker;
export declare const OPENROUTER_MODEL_PICKER_Z_INDEX = 1000;
export declare const ModelDescriptionMarkdown: import("react").MemoExoticComponent<({ markdown, key, isExpanded, setIsExpanded, isPopup, }: {
    markdown?: string;
    key: string;
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;
    isPopup?: boolean;
}) => JSX.Element>;
