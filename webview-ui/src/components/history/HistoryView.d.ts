import { FuseResult } from "fuse.js"
type HistoryViewProps = {
	onDone: () => void
}
export declare const highlight: (fuseSearchResult: FuseResult<any>[], highlightClassName?: string) => any[]
declare const _default: import("react").MemoExoticComponent<({ onDone }: HistoryViewProps) => import("react").JSX.Element>
export default _default
