import React from "react"
interface ChatTextAreaProps {
	inputValue: string
	setInputValue: (value: string) => void
	textAreaDisabled: boolean
	placeholderText: string
	selectedImages: string[]
	setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>
	onSend: () => void
	onSelectImages: () => void
	shouldDisableImages: boolean
	onHeightChange?: (height: number) => void
}
declare const ChatTextArea: import("react").ForwardRefExoticComponent<
	ChatTextAreaProps & import("react").RefAttributes<HTMLTextAreaElement>
>
export default ChatTextArea
