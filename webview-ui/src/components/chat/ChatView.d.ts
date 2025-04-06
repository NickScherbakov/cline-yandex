interface ChatViewProps {
	isHidden: boolean
	showAnnouncement: boolean
	hideAnnouncement: () => void
	showHistoryView: () => void
}
export declare const MAX_IMAGES_PER_MESSAGE = 20
declare const ChatView: ({
	isHidden,
	showAnnouncement,
	hideAnnouncement,
	showHistoryView,
}: ChatViewProps) => import("react").JSX.Element
export default ChatView
