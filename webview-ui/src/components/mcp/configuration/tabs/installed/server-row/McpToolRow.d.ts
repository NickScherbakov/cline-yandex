import { McpTool } from "@shared/mcp"
type McpToolRowProps = {
	tool: McpTool
	serverName?: string
}
declare const McpToolRow: ({ tool, serverName }: McpToolRowProps) => import("react").JSX.Element
export default McpToolRow
