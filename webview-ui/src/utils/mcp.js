"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMatchingTemplate = findMatchingTemplate;
exports.findMatchingResourceOrTemplate = findMatchingResourceOrTemplate;
exports.getMcpServerDisplayName = getMcpServerDisplayName;
/**
 * Matches a URI against an array of URI templates and returns the matching template
 * @param uri The URI to match
 * @param templates Array of URI templates to match against
 * @returns The matching template or undefined if no match is found
 */
function findMatchingTemplate(uri, templates) {
    if (templates === void 0) { templates = []; }
    return templates.find(function (template) {
        // Convert template to regex pattern
        var pattern = String(template.uriTemplate)
            // First escape special regex characters
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            // Then replace {param} with ([^/]+) to match any non-slash characters
            // We need to use \{ and \} because we just escaped them
            .replace(/\\\{([^}]+)\\\}/g, "([^/]+)");
        var regex = new RegExp("^".concat(pattern, "$"));
        return regex.test(uri);
    });
}
/**
 * Finds either an exact resource match or a matching template for a given URI
 * @param uri The URI to find a match for
 * @param resources Array of concrete resources
 * @param templates Array of resource templates
 * @returns The matching resource, template, or undefined
 */
function findMatchingResourceOrTemplate(uri, resources, templates) {
    if (resources === void 0) { resources = []; }
    if (templates === void 0) { templates = []; }
    // First try to find an exact resource match
    var exactMatch = resources.find(function (resource) { return resource.uri === uri; });
    if (exactMatch) {
        return exactMatch;
    }
    // If no exact match, try to find a matching template
    return findMatchingTemplate(uri, templates);
}
/**
 * Attempts to convert an MCP server name to its display name using the marketplace catalog
 * @param serverName The server name/ID to look up
 * @param mcpMarketplaceCatalog The marketplace catalog containing server metadata
 * @returns The display name if found in catalog, otherwise returns the original server name
 */
function getMcpServerDisplayName(serverName, mcpMarketplaceCatalog) {
    // Find matching item in marketplace catalog
    var catalogItem = mcpMarketplaceCatalog.items.find(function (item) { return item.mcpId === serverName; });
    // Return display name if found, otherwise return original server name
    return (catalogItem === null || catalogItem === void 0 ? void 0 : catalogItem.name) || serverName;
}
