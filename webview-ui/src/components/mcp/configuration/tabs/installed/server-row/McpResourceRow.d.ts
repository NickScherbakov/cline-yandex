import { McpResource, McpResourceTemplate } from "@shared/mcp";
type McpResourceRowProps = {
    item: McpResource | McpResourceTemplate;
};
declare const McpResourceRow: ({ item }: McpResourceRowProps) => import("react").JSX.Element;
export default McpResourceRow;
