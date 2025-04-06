"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectMetaKeyChar = exports.detectOS = exports.unknown = void 0;
exports.unknown = "Unknown";
var platforms = {
    windows: /win32/,
    mac: /darwin/,
    linux: /linux/,
};
var detectOS = function (platform) {
    var detectedOs = exports.unknown;
    if (platform.match(platforms.windows)) {
        detectedOs = "windows";
    }
    else if (platform.match(platforms.mac)) {
        detectedOs = "mac";
    }
    else if (platform.match(platforms.linux)) {
        detectedOs = "linux";
    }
    return detectedOs;
};
exports.detectOS = detectOS;
var detectMetaKeyChar = function (platform) {
    if (platform.match(platforms.mac)) {
        return "CMD";
    }
    else if (platform.match(platforms.windows)) {
        return "Win";
    }
    else if (platform.match(platforms.linux)) {
        return "Alt";
    }
    else {
        return "CMD";
    }
};
exports.detectMetaKeyChar = detectMetaKeyChar;
