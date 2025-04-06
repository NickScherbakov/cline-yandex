"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLargeNumber = formatLargeNumber;
exports.formatDollars = formatDollars;
exports.formatTimestamp = formatTimestamp;
exports.formatSize = formatSize;
var pretty_bytes_1 = require("pretty-bytes");
function formatLargeNumber(num) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + "b";
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "m";
    }
    if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + "k";
    }
    return num.toString();
}
// Helper to format cents as dollars with 2 decimal places
function formatDollars(cents) {
    if (cents === undefined) {
        return "";
    }
    return (cents / 100).toFixed(2);
}
function formatTimestamp(timestamp) {
    var date = new Date(timestamp);
    var dateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return dateFormatter.format(date);
}
function formatSize(bytes) {
    if (bytes === undefined) {
        return "--kb";
    }
    return (0, pretty_bytes_1.default)(bytes);
}
