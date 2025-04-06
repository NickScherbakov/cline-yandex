type McpViewProps = {
    onDone: () => void;
};
declare const McpConfigurationView: ({ onDone }: McpViewProps) => import("react").JSX.Element;
export declare const TabButton: ({ children, isActive, onClick, }: {
    children: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}) => import("react").JSX.Element;
export default McpConfigurationView;
