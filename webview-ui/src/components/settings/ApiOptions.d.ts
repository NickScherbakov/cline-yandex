import { ApiConfiguration, ApiProvider, ModelInfo } from "@shared/api";
interface ApiOptionsProps {
    showModelOptions: boolean;
    apiErrorMessage?: string;
    modelIdErrorMessage?: string;
    isPopup?: boolean;
}
export declare const DropdownContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
    zIndex?: number;
}>> & string;
declare module "vscode" {
    interface LanguageModelChatSelector {
        vendor?: string;
        family?: string;
        version?: string;
        id?: string;
    }
}
export declare function getOpenRouterAuthUrl(uriScheme?: string): string;
export declare const formatPrice: (price: number) => string;
export declare const ModelInfoView: ({ selectedModelId, modelInfo, isDescriptionExpanded, setIsDescriptionExpanded, isPopup, }: {
    selectedModelId: string;
    modelInfo: ModelInfo;
    isDescriptionExpanded: boolean;
    setIsDescriptionExpanded: (isExpanded: boolean) => void;
    isPopup?: boolean;
}) => import("react").JSX.Element;
export declare function normalizeApiConfiguration(apiConfiguration?: ApiConfiguration): {
    selectedProvider: ApiProvider;
    selectedModelId: string;
    selectedModelInfo: ModelInfo;
};
declare const _default: import("react").MemoExoticComponent<({ showModelOptions, apiErrorMessage, modelIdErrorMessage, isPopup }: ApiOptionsProps) => import("react").JSX.Element>;
export default _default;
