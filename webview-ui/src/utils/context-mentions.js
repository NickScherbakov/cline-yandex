"use strict"
var __spreadArray =
	(this && this.__spreadArray) ||
	function (to, from, pack) {
		if (pack || arguments.length === 2)
			for (var i = 0, l = from.length, ar; i < l; i++) {
				if (ar || !(i in from)) {
					if (!ar) ar = Array.prototype.slice.call(from, 0, i)
					ar[i] = from[i]
				}
			}
		return to.concat(ar || Array.prototype.slice.call(from))
	}
Object.defineProperty(exports, "__esModule", { value: true })
exports.ContextMenuOptionType = void 0
exports.insertMention = insertMention
exports.removeMention = removeMention
exports.getContextMenuOptions = getContextMenuOptions
exports.shouldShowContextMenu = shouldShowContextMenu
var context_mentions_1 = require("@shared/context-mentions")
var fzf_1 = require("fzf")
var path = require("path")
function insertMention(text, position, value) {
	var beforeCursor = text.slice(0, position)
	var afterCursor = text.slice(position)
	// Find the position of the last '@' symbol before the cursor
	var lastAtIndex = beforeCursor.lastIndexOf("@")
	var newValue
	var mentionIndex
	if (lastAtIndex !== -1) {
		// If there's an '@' symbol, replace everything after it with the new mention
		var beforeMention = text.slice(0, lastAtIndex)
		newValue = beforeMention + "@" + value + " " + afterCursor.replace(/^[^\s]*/, "")
		mentionIndex = lastAtIndex
	} else {
		// If there's no '@' symbol, insert the mention at the cursor position
		newValue = beforeCursor + "@" + value + " " + afterCursor
		mentionIndex = position
	}
	return { newValue: newValue, mentionIndex: mentionIndex }
}
function removeMention(text, position) {
	var beforeCursor = text.slice(0, position)
	var afterCursor = text.slice(position)
	// Check if we're at the end of a mention
	var matchEnd = beforeCursor.match(new RegExp(context_mentions_1.mentionRegex.source + "$"))
	if (matchEnd) {
		// If we're at the end of a mention, remove it
		var newText = text.slice(0, position - matchEnd[0].length) + afterCursor.replace(" ", "") // removes the first space after the mention
		var newPosition = position - matchEnd[0].length
		return { newText: newText, newPosition: newPosition }
	}
	// If we're not at the end of a mention, just return the original text and position
	return { newText: text, newPosition: position }
}
var ContextMenuOptionType
;(function (ContextMenuOptionType) {
	ContextMenuOptionType["File"] = "file"
	ContextMenuOptionType["Folder"] = "folder"
	ContextMenuOptionType["Problems"] = "problems"
	ContextMenuOptionType["Terminal"] = "terminal"
	ContextMenuOptionType["URL"] = "url"
	ContextMenuOptionType["Git"] = "git"
	ContextMenuOptionType["NoResults"] = "noResults"
})(ContextMenuOptionType || (exports.ContextMenuOptionType = ContextMenuOptionType = {}))
function getContextMenuOptions(query, selectedType, queryItems, dynamicSearchResults) {
	if (selectedType === void 0) {
		selectedType = null
	}
	if (dynamicSearchResults === void 0) {
		dynamicSearchResults = []
	}
	var workingChanges = {
		type: ContextMenuOptionType.Git,
		value: "git-changes",
		label: "Working changes",
		description: "Current uncommitted changes",
	}
	if (query === "") {
		if (selectedType === ContextMenuOptionType.File) {
			var files = queryItems
				.filter(function (item) {
					return item.type === ContextMenuOptionType.File
				})
				.map(function (item) {
					return {
						type: item.type,
						value: item.value,
					}
				})
			return files.length > 0 ? files : [{ type: ContextMenuOptionType.NoResults }]
		}
		if (selectedType === ContextMenuOptionType.Folder) {
			var folders = queryItems
				.filter(function (item) {
					return item.type === ContextMenuOptionType.Folder
				})
				.map(function (item) {
					return {
						type: ContextMenuOptionType.Folder,
						value: item.value,
					}
				})
			return folders.length > 0 ? folders : [{ type: ContextMenuOptionType.NoResults }]
		}
		if (selectedType === ContextMenuOptionType.Git) {
			var commits = queryItems.filter(function (item) {
				return item.type === ContextMenuOptionType.Git
			})
			return commits.length > 0 ? __spreadArray([workingChanges], commits, true) : [workingChanges]
		}
		return [
			{ type: ContextMenuOptionType.URL },
			{ type: ContextMenuOptionType.Problems },
			{ type: ContextMenuOptionType.Terminal },
			{ type: ContextMenuOptionType.Git },
			{ type: ContextMenuOptionType.Folder },
			{ type: ContextMenuOptionType.File },
		]
	}
	var lowerQuery = query.toLowerCase()
	var suggestions = []
	// Check for top-level option matches
	if ("git".startsWith(lowerQuery)) {
		suggestions.push({
			type: ContextMenuOptionType.Git,
			label: "Git Commits",
			description: "Search repository history",
		})
	} else if ("git-changes".startsWith(lowerQuery)) {
		suggestions.push(workingChanges)
	}
	if ("problems".startsWith(lowerQuery)) {
		suggestions.push({ type: ContextMenuOptionType.Problems })
	}
	if (query.startsWith("http")) {
		suggestions.push({ type: ContextMenuOptionType.URL, value: query })
	}
	// Add exact SHA matches to suggestions
	if (/^[a-f0-9]{7,40}$/i.test(lowerQuery)) {
		var exactMatches = queryItems.filter(function (item) {
			var _a
			return (
				item.type === ContextMenuOptionType.Git &&
				((_a = item.value) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === lowerQuery
			)
		})
		if (exactMatches.length > 0) {
			suggestions.push.apply(suggestions, exactMatches)
		} else {
			// If no exact match but valid SHA format, add as option
			suggestions.push({
				type: ContextMenuOptionType.Git,
				value: lowerQuery,
				label: "Commit ".concat(lowerQuery),
				description: "Git commit hash",
			})
		}
	}
	// Create searchable strings array for fzf
	var searchableItems = queryItems.map(function (item) {
		return {
			original: item,
			searchStr: [item.value, item.label, item.description].filter(Boolean).join(" "),
		}
	})
	// Initialize fzf instance for fuzzy search
	var fzf = new fzf_1.Fzf(searchableItems, {
		selector: function (item) {
			return item.searchStr
		},
	})
	// Get fuzzy matching items
	var matchingItems = query
		? fzf.find(query).map(function (result) {
				return result.item.original
			})
		: []
	// Separate matches by type
	var fileMatches = matchingItems.filter(function (item) {
		return item.type === ContextMenuOptionType.File || item.type === ContextMenuOptionType.Folder
	})
	var gitMatches = matchingItems.filter(function (item) {
		return item.type === ContextMenuOptionType.Git
	})
	var otherMatches = matchingItems.filter(function (item) {
		return (
			item.type !== ContextMenuOptionType.File &&
			item.type !== ContextMenuOptionType.Folder &&
			item.type !== ContextMenuOptionType.Git
		)
	})
	var searchResultItems = dynamicSearchResults.map(function (result) {
		var formattedPath = result.path.startsWith("/") ? result.path : "/".concat(result.path)
		var item = {
			type: result.type === "folder" ? ContextMenuOptionType.Folder : ContextMenuOptionType.File,
			value: formattedPath,
			label: result.label || path.basename(result.path),
			description: formattedPath,
		}
		return item
	})
	// If we have dynamic search results, prioritize those
	if (dynamicSearchResults.length > 0) {
		// Only show suggestions and dynamic results
		var allItems = __spreadArray(__spreadArray([], suggestions, true), searchResultItems, true)
		return allItems.length > 0 ? allItems : [{ type: ContextMenuOptionType.NoResults }]
	}
	// Otherwise fall back to local fuzzy search
	if (suggestions.length > 0 || matchingItems.length > 0) {
		var allItems = __spreadArray(
			__spreadArray(__spreadArray(__spreadArray([], suggestions, true), fileMatches, true), gitMatches, true),
			otherMatches,
			true,
		)
		// Remove duplicates - normalize paths by ensuring all have leading slashes
		var seen_1 = new Set()
		var deduped = allItems.filter(function (item) {
			// Normalize paths for deduplication by ensuring leading slashes
			var normalizedValue = item.value && !item.value.startsWith("/") ? "/".concat(item.value) : item.value
			var key = "".concat(item.type, "-").concat(normalizedValue)
			if (seen_1.has(key)) {
				return false
			}
			seen_1.add(key)
			return true
		})
		return deduped.length > 0 ? deduped : [{ type: ContextMenuOptionType.NoResults }]
	}
	return [{ type: ContextMenuOptionType.NoResults }]
}
function shouldShowContextMenu(text, position) {
	var beforeCursor = text.slice(0, position)
	var atIndex = beforeCursor.lastIndexOf("@")
	if (atIndex === -1) {
		return false
	}
	var textAfterAt = beforeCursor.slice(atIndex + 1)
	// Check if there's any whitespace after the '@'
	if (/\s/.test(textAfterAt)) {
		return false
	}
	// Don't show the menu if it's a URL
	if (textAfterAt.toLowerCase().startsWith("http")) {
		return false
	}
	// Don't show the menu if it's a problems or terminal
	if (textAfterAt.toLowerCase().startsWith("problems") || textAfterAt.toLowerCase().startsWith("terminal")) {
		return false
	}
	// NOTE: it's okay that menu shows when there's trailing punctuation since user could be inputting a path with marks
	// Show the menu if there's just '@' or '@' followed by some text (but not a URL)
	return true
}
