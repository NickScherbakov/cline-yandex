export interface SearchResult {
	path: string
	type: "file" | "folder"
	label?: string
}
export declare function insertMention(
	text: string,
	position: number,
	value: string,
): {
	newValue: string
	mentionIndex: number
}
export declare function removeMention(
	text: string,
	position: number,
): {
	newText: string
	newPosition: number
}
export declare enum ContextMenuOptionType {
	File = "file",
	Folder = "folder",
	Problems = "problems",
	Terminal = "terminal",
	URL = "url",
	Git = "git",
	NoResults = "noResults",
}
export interface ContextMenuQueryItem {
	type: ContextMenuOptionType
	value?: string
	label?: string
	description?: string
}
export declare function getContextMenuOptions(
	query: string,
	selectedType: ContextMenuOptionType | null,
	queryItems: ContextMenuQueryItem[],
	dynamicSearchResults?: SearchResult[],
): ContextMenuQueryItem[]
export declare function shouldShowContextMenu(text: string, position: number): boolean
