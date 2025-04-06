import React from "react"
import { ContextMenuOptionType, ContextMenuQueryItem, SearchResult } from "@/utils/context-mentions"
interface ContextMenuProps {
	onSelect: (type: ContextMenuOptionType, value?: string) => void
	searchQuery: string
	onMouseDown: () => void
	selectedIndex: number
	setSelectedIndex: (index: number) => void
	selectedType: ContextMenuOptionType | null
	queryItems: ContextMenuQueryItem[]
	dynamicSearchResults?: SearchResult[]
	isLoading?: boolean
}
declare const ContextMenu: React.FC<ContextMenuProps>
export default ContextMenu
