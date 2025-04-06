import React from "react"
import { ExtensionState } from "@shared/ExtensionMessage"
import { ApiConfiguration, ModelInfo } from "@shared/api"
import { McpMarketplaceCatalog, McpServer } from "../../../src/shared/mcp"
import { TelemetrySetting } from "@shared/TelemetrySetting"
interface ExtensionStateContextType extends ExtensionState {
	didHydrateState: boolean
	showWelcome: boolean
	theme: any
	openRouterModels: Record<string, ModelInfo>
	openAiModels: string[]
	mcpServers: McpServer[]
	mcpMarketplaceCatalog: McpMarketplaceCatalog
	filePaths: string[]
	totalTasksSize: number | null
	setApiConfiguration: (config: ApiConfiguration) => void
	setCustomInstructions: (value?: string) => void
	setTelemetrySetting: (value: TelemetrySetting) => void
	setShowAnnouncement: (value: boolean) => void
	setPlanActSeparateModelsSetting: (value: boolean) => void
}
export declare const ExtensionStateContextProvider: React.FC<{
	children: React.ReactNode
}>
export declare const useExtensionState: () => ExtensionStateContextType
export {}
