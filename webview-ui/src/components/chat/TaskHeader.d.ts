import { ClineMessage } from "@shared/ExtensionMessage"
interface TaskHeaderProps {
	task: ClineMessage
	tokensIn: number
	tokensOut: number
	doesModelSupportPromptCache: boolean
	cacheWrites?: number
	cacheReads?: number
	totalCost: number
	lastApiReqTotalTokens?: number
	onClose: () => void
}
export declare const highlightMentions: (text?: string, withShadow?: boolean) => string | (string | JSX.Element)[]
declare const _default: import("react").MemoExoticComponent<React.FC<TaskHeaderProps>>
export default _default
