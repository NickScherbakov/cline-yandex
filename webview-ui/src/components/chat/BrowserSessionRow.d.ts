import { ClineMessage } from "@shared/ExtensionMessage";
interface BrowserSessionRowProps {
    messages: ClineMessage[];
    isExpanded: (messageTs: number) => boolean;
    onToggleExpand: (messageTs: number) => void;
    lastModifiedMessage?: ClineMessage;
    isLast: boolean;
    onHeightChange: (isTaller: boolean) => void;
}
declare const BrowserSessionRow: import("react").NamedExoticComponent<BrowserSessionRowProps>;
export default BrowserSessionRow;
