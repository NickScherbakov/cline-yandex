export declare const VSC_INPUT_BACKGROUND = "--vscode-input-background"
export declare const VSC_INPUT_FOREGROUND = "--vscode-input-foreground"
export declare const VSC_SIDEBAR_BACKGROUND = "--vscode-sideBar-background"
export declare const VSC_FOREGROUND = "--vscode-foreground"
export declare const VSC_EDITOR_FOREGROUND = "--vscode-editor-foreground"
export declare const VSC_FOREGROUND_MUTED = "--vscode-foreground-muted"
export declare const VSC_DESCRIPTION_FOREGROUND = "--vscode-descriptionForeground"
export declare const VSC_INPUT_PLACEHOLDER_FOREGROUND = "--vscode-input-placeholderForeground"
export declare const VSC_BUTTON_BACKGROUND = "--vscode-button-background"
export declare const VSC_BUTTON_FOREGROUND = "--vscode-button-foreground"
export declare const VSC_EDITOR_BACKGROUND = "--vscode-editor-background"
export declare const VSC_LIST_SELECTION_BACKGROUND = "--vscode-list-activeSelectionBackground"
export declare const VSC_FOCUS_BORDER = "--vscode-focus-border"
export declare const VSC_LIST_ACTIVE_FOREGROUND = "--vscode-quickInputList-focusForeground"
export declare const VSC_QUICK_INPUT_BACKGROUND = "--vscode-quickInput-background"
export declare const VSC_INPUT_BORDER = "--vscode-input-border"
export declare const VSC_INPUT_BORDER_FOCUS = "--vscode-focusBorder"
export declare const VSC_BADGE_BACKGROUND = "--vscode-badge-background"
export declare const VSC_BADGE_FOREGROUND = "--vscode-badge-foreground"
export declare const VSC_SIDEBAR_BORDER = "--vscode-sideBar-border"
export declare const VSC_DIFF_REMOVED_LINE_BACKGROUND = "--vscode-diffEditor-removedLineBackground"
export declare const VSC_DIFF_INSERTED_LINE_BACKGROUND = "--vscode-diffEditor-insertedLineBackground"
export declare const VSC_INACTIVE_SELECTION_BACKGROUND = "--vscode-editor-inactiveSelectionBackground"
export declare const VSC_TITLEBAR_INACTIVE_FOREGROUND = "--vscode-titleBar-inactiveForeground"
export declare function getAsVar(varName: string): string
export declare function hexToRGB(hexColor: string): {
	r: number
	g: number
	b: number
}
export declare function colorToHex(colorVar: string): string
