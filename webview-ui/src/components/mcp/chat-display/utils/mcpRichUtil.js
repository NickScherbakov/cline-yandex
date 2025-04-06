"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfImageUrl = exports.formatUrlForOpening = exports.normalizeRelativeUrl = exports.isLocalhostUrl = exports.getSafeHostname = exports.isUrl = exports.safeCreateUrl = void 0;
var vscode_1 = require("@/utils/vscode");
// Safely create a URL object with error handling and ensure HTTPS
var safeCreateUrl = function (url) {
    try {
        // Convert HTTP to HTTPS for security
        if (url.startsWith("http://")) {
            url = url.replace("http://", "https://");
        }
        return new URL(url);
    }
    catch (e) {
        // If the URL doesn't have a protocol, add https://
        if (!url.startsWith("https://")) {
            try {
                return new URL("https://".concat(url));
            }
            catch (e) {
                console.log("Invalid URL: ".concat(url));
                return null;
            }
        }
        console.log("Invalid URL: ".concat(url));
        return null;
    }
};
exports.safeCreateUrl = safeCreateUrl;
// Check if a string is a valid URL
var isUrl = function (str) {
    return (0, exports.safeCreateUrl)(str) !== null;
};
exports.isUrl = isUrl;
// Get hostname safely
var getSafeHostname = function (url) {
    try {
        var urlObj = (0, exports.safeCreateUrl)(url);
        return urlObj ? urlObj.hostname : "unknown-host";
    }
    catch (e) {
        return "unknown-host";
    }
};
exports.getSafeHostname = getSafeHostname;
// Check if a URL is a localhost URL by examining the hostname
var isLocalhostUrl = function (url) {
    try {
        var hostname = (0, exports.getSafeHostname)(url);
        return (hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            hostname === "0.0.0.0" ||
            hostname.startsWith("192.168.") ||
            hostname.startsWith("10.") ||
            hostname.endsWith(".local"));
    }
    catch (e) {
        // If we can't parse the URL, assume it's not localhost
        return false;
    }
};
exports.isLocalhostUrl = isLocalhostUrl;
// Function to normalize relative URLs by combining with a base URL
var normalizeRelativeUrl = function (relativeUrl, baseUrl) {
    // If it's already an absolute URL or a data URL, return as is
    if (relativeUrl.startsWith("http://") || relativeUrl.startsWith("https://") || relativeUrl.startsWith("data:")) {
        return relativeUrl;
    }
    try {
        // Parse the base URL
        var baseUrlObj = (0, exports.safeCreateUrl)(baseUrl);
        if (!baseUrlObj) {
            return relativeUrl; // If we can't parse the base URL, return original
        }
        // Handle different types of relative paths
        if (relativeUrl.startsWith("//")) {
            // Protocol-relative URL
            return "".concat(baseUrlObj.protocol).concat(relativeUrl);
        }
        else if (relativeUrl.startsWith("/")) {
            // Root-relative URL
            return "".concat(baseUrlObj.protocol, "//").concat(baseUrlObj.host).concat(relativeUrl);
        }
        else {
            // Path-relative URL
            // Get the directory part of the URL
            var basePath = baseUrlObj.pathname;
            if (!basePath.endsWith("/")) {
                // If the path doesn't end with a slash, remove the file part
                basePath = basePath.substring(0, basePath.lastIndexOf("/") + 1);
            }
            return "".concat(baseUrlObj.protocol, "//").concat(baseUrlObj.host).concat(basePath).concat(relativeUrl);
        }
    }
    catch (error) {
        console.log("Error normalizing relative URL: ".concat(error));
        return relativeUrl; // Return original on error
    }
};
exports.normalizeRelativeUrl = normalizeRelativeUrl;
// Helper to ensure URL is in a format that can be opened
var formatUrlForOpening = function (url) {
    // If it's a data URI, return as is
    if (url.startsWith("data:image/")) {
        return url;
    }
    // Use safeCreateUrl to validate and format the URL
    var urlObj = (0, exports.safeCreateUrl)(url);
    if (urlObj) {
        return urlObj.href;
    }
    console.log("Invalid URL format: ".concat(url));
    // Return a safe fallback that won't crash
    return "about:blank";
};
exports.formatUrlForOpening = formatUrlForOpening;
// Function to check if a URL is an image using HEAD request
var checkIfImageUrl = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var secureUrl;
    return __generator(this, function (_a) {
        // For data URLs, we can check synchronously
        if (url.startsWith("data:image/")) {
            return [2 /*return*/, true];
        }
        secureUrl = url;
        // Convert HTTP to HTTPS for security in the network request only
        if (secureUrl.startsWith("http://")) {
            secureUrl = secureUrl.replace("http://", "https://");
            console.log("Using HTTPS version for image check: ".concat(secureUrl));
        }
        // Validate URL before proceeding
        if (!(0, exports.isUrl)(url)) {
            console.log("Invalid URL format:", url);
            return [2 /*return*/, false];
        }
        // For https URLs, we need to send a message to the extension
        if (url.startsWith("https")) {
            try {
                // Create a promise that will resolve when we get a response
                return [2 /*return*/, new Promise(function (resolve) {
                        var timeoutId = undefined;
                        // Set up a one-time listener for the response
                        var messageListener = function (event) {
                            var message = event.data;
                            if (message.type === "isImageUrlResult" && message.url === url) {
                                window.removeEventListener("message", messageListener);
                                resolve(message.isImage);
                                if (timeoutId) {
                                    clearTimeout(timeoutId);
                                }
                            }
                        };
                        window.addEventListener("message", messageListener);
                        // Send the request to the extension
                        vscode_1.vscode.postMessage({
                            type: "checkIsImageUrl",
                            text: url,
                        });
                        // Set a timeout to avoid hanging indefinitely
                        timeoutId = setTimeout(function () {
                            window.removeEventListener("message", messageListener);
                            console.log("Hit timeout waiting for checkIsImageUrl");
                            resolve(false);
                        }, 3000);
                    })];
            }
            catch (error) {
                console.log("Error checking if URL is an image:", url);
                // Don't fall back to extension check on error
                // Instead, return false to indicate it's not an image
                return [2 /*return*/, false];
            }
        }
        // Don't fall back to extension check for other URLs
        // Only data URLs (handled above) are guaranteed to be images
        // For all other URLs, we need proper content type verification
        console.log("URL protocol not supported for image check: ".concat(url));
        return [2 /*return*/, false];
    });
}); };
exports.checkIfImageUrl = checkIfImageUrl;
