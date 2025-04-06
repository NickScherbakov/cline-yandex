import { McpMarketplaceCatalog, McpResource, McpResourceTemplate } from "@shared/mcp";
/**
 * Matches a URI against an array of URI templates and returns the matching template
 * @param uri The URI to match
 * @param templates Array of URI templates to match against
 * @returns The matching template or undefined if no match is found
 */
export declare function findMatchingTemplate(uri: string, templates?: McpResourceTemplate[]): McpResourceTemplate | undefined;
/**
 * Finds either an exact resource match or a matching template for a given URI
 * @param uri The URI to find a match for
 * @param resources Array of concrete resources
 * @param templates Array of resource templates
 * @returns The matching resource, template, or undefined
 */
export declare function findMatchingResourceOrTemplate(uri: string, resources?: McpResource[], templates?: McpResourceTemplate[]): McpResource | McpResourceTemplate | undefined;
/**
 * Attempts to convert an MCP server name to its display name using the marketplace catalog
 * @param serverName The server name/ID to look up
 * @param mcpMarketplaceCatalog The marketplace catalog containing server metadata
 * @returns The display name if found in catalog, otherwise returns the original server name
 */
export declare function getMcpServerDisplayName(serverName: string, mcpMarketplaceCatalog: McpMarketplaceCatalog): string;
