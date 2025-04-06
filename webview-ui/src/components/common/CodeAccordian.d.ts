interface CodeAccordianProps {
	code?: string
	diff?: string
	language?: string | undefined
	path?: string
	isFeedback?: boolean
	isConsoleLogs?: boolean
	isExpanded: boolean
	onToggleExpand: () => void
	isLoading?: boolean
}
export declare const cleanPathPrefix: (path: string) => string
declare const _default: import("react").MemoExoticComponent<
	({
		code,
		diff,
		language,
		path,
		isFeedback,
		isConsoleLogs,
		isExpanded,
		onToggleExpand,
		isLoading,
	}: CodeAccordianProps) => import("react").JSX.Element
>
export default _default
