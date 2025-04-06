import React from "react"
declare const OpenAiModelPicker: React.FC
export default OpenAiModelPicker
export declare const OPENAI_MODEL_PICKER_Z_INDEX = 1000
export declare const ModelDescriptionMarkdown: import("react").MemoExoticComponent<
	({
		markdown,
		key,
		isExpanded,
		setIsExpanded,
	}: {
		markdown?: string
		key: string
		isExpanded: boolean
		setIsExpanded: (isExpanded: boolean) => void
	}) => JSX.Element
>
