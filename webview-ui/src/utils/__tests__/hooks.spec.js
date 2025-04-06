"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var react_1 = require("@testing-library/react")
var hooks_1 = require("../hooks")
var vitest_1 = require("vitest")
describe("useShortcut", function () {
	it("should call the callback when the shortcut is pressed", function () {
		var callback = vitest_1.vi.fn()
		;(0, react_1.renderHook)(function () {
			return (0, hooks_1.useShortcut)("Meta+Shift+a", callback)
		})
		var event = new KeyboardEvent("keydown", { key: "a", metaKey: true, shiftKey: true })
		window.dispatchEvent(event)
		expect(callback).toHaveBeenCalled()
	})
	it("should not call the callback when the shortcut is not pressed", function () {
		var callback = vitest_1.vi.fn()
		;(0, react_1.renderHook)(function () {
			return (0, hooks_1.useShortcut)("Command+Shift+b", callback)
		})
		var event = new KeyboardEvent("keydown", { key: "a", metaKey: true, shiftKey: true })
		window.dispatchEvent(event)
		expect(callback).not.toHaveBeenCalled()
	})
	it("should not call the callback when typing in a text input when disableTextInputs is true", function () {
		var callback = vitest_1.vi.fn()
		;(0, react_1.renderHook)(function () {
			return (0, hooks_1.useShortcut)("Meta+Shift+a", callback, { disableTextInputs: true })
		})
		var input = document.createElement("input")
		document.body.appendChild(input)
		input.focus()
		var event = new KeyboardEvent("keydown", { key: "a", metaKey: true, shiftKey: true })
		input.dispatchEvent(event)
		expect(callback).not.toHaveBeenCalled()
		document.body.removeChild(input)
	})
})
describe("useMetaKeyDetection", function () {
	it("should detect Windows OS and metaKey from platform", function () {
		// mock the detect functions
		var result = (0, react_1.renderHook)(function () {
			return (0, hooks_1.useMetaKeyDetection)("win32")
		}).result
		expect(result.current[0]).toBe("windows")
		expect(result.current[1]).toBe("Win")
	})
	it("should detect Mac OS and metaKey from platform", function () {
		// mock the detect functions
		var result = (0, react_1.renderHook)(function () {
			return (0, hooks_1.useMetaKeyDetection)("darwin")
		}).result
		expect(result.current[0]).toBe("mac")
		expect(result.current[1]).toBe("CMD")
	})
	it("should detect Linux OS and metaKey from platform", function () {
		// mock the detect functions
		var result = (0, react_1.renderHook)(function () {
			return (0, hooks_1.useMetaKeyDetection)("linux")
		}).result
		expect(result.current[0]).toBe("linux")
		expect(result.current[1]).toBe("Alt")
	})
})
