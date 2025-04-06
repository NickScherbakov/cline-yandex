import { ClineMessage } from "@shared/ExtensionMessage"
interface ChatRowProps {
	message: ClineMessage
	isExpanded: boolean
	onToggleExpand: () => void
	lastModifiedMessage?: ClineMessage
	isLast: boolean
	onHeightChange: (isTaller: boolean) => void
}
interface ChatRowContentProps extends Omit<ChatRowProps, "onHeightChange"> {}
export declare const ProgressIndicator: () => JSX.Element
declare const ChatRow: import("react").NamedExoticComponent<ChatRowProps>
export default ChatRow
export declare const ChatRowContent: ({
	message,
	isExpanded,
	onToggleExpand,
	lastModifiedMessage,
	isLast,
}: ChatRowContentProps) => JSX.Element
