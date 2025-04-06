import { McpMarketplaceItem, McpServer } from "@shared/mcp"
interface McpMarketplaceCardProps {
	item: McpMarketplaceItem
	installedServers: McpServer[]
}
declare const McpMarketplaceCard: ({ item, installedServers }: McpMarketplaceCardProps) => import("react").JSX.Element
export default McpMarketplaceCard
