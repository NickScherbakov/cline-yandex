"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShortcut = exports.useMetaKeyDetection = void 0;
var react_1 = require("react");
var platformUtils_1 = require("./platformUtils");
var useMetaKeyDetection = function (platform) {
    var _a = (0, react_1.useState)(platformUtils_1.unknown), metaKeyChar = _a[0], setMetaKeyChar = _a[1];
    var _b = (0, react_1.useState)(platformUtils_1.unknown), os = _b[0], setOs = _b[1];
    (0, react_1.useEffect)(function () {
        var detectedMetaKeyChar = (0, platformUtils_1.detectMetaKeyChar)(platform);
        var detectedOs = (0, platformUtils_1.detectOS)(platform);
        setMetaKeyChar(detectedMetaKeyChar);
        setOs(detectedOs);
    }, [platform]);
    return [os, metaKeyChar];
};
exports.useMetaKeyDetection = useMetaKeyDetection;
var useShortcut = function (shortcut, callback, options) {
    if (options === void 0) { options = { disableTextInputs: true }; }
    var callbackRef = (0, react_1.useRef)(callback);
    var _a = (0, react_1.useState)([]), keyCombo = _a[0], setKeyCombo = _a[1];
    (0, react_1.useLayoutEffect)(function () {
        callbackRef.current = callback;
    });
    var handleKeyDown = (0, react_1.useCallback)(function (event) {
        var isTextInput = event.target instanceof HTMLTextAreaElement ||
            (event.target instanceof HTMLInputElement && (!event.target.type || event.target.type === "text")) ||
            event.target.isContentEditable;
        var modifierMap = {
            Control: event.ctrlKey,
            Alt: event.altKey,
            Meta: event.metaKey, // alias for Command
            Shift: event.shiftKey,
        };
        if (event.repeat) {
            return null;
        }
        if (options.disableTextInputs && isTextInput) {
            return event.stopPropagation();
        }
        if (shortcut.includes("+")) {
            var keyArray = shortcut.split("+");
            if (Object.keys(modifierMap).includes(keyArray[0])) {
                var finalKey = keyArray.pop();
                if (!finalKey) {
                    return;
                }
                if (keyArray.every(function (k) { return modifierMap[k]; }) && finalKey.toLowerCase() === event.key.toLowerCase()) {
                    event.preventDefault();
                    return callbackRef.current(event);
                }
            }
            else {
                if (keyArray[keyCombo.length] === event.key) {
                    if (keyArray[keyArray.length - 1] === event.key && keyCombo.length === keyArray.length - 1) {
                        callbackRef.current(event);
                        return setKeyCombo([]);
                    }
                    return setKeyCombo(function (prevCombo) { return __spreadArray(__spreadArray([], prevCombo, true), [event.key], false); });
                }
                if (keyCombo.length > 0) {
                    return setKeyCombo([]);
                }
            }
        }
        if (shortcut === event.key) {
            return callbackRef.current(event);
        }
    }, [keyCombo.length, options.disableTextInputs, shortcut]);
    (0, react_1.useEffect)(function () {
        window.addEventListener("keydown", handleKeyDown);
        return function () {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
};
exports.useShortcut = useShortcut;
