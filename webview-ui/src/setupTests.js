"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
require("@testing-library/jest-dom")
var vitest_1 = require("vitest")
// "Official" jest workaround for mocking window.matchMedia()
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vitest_1.vi.fn().mockImplementation(function (query) {
		return {
			matches: false,
			media: query,
			onchange: null,
			addListener: vitest_1.vi.fn(), // Deprecated
			removeListener: vitest_1.vi.fn(), // Deprecated
			addEventListener: vitest_1.vi.fn(),
			removeEventListener: vitest_1.vi.fn(),
			dispatchEvent: vitest_1.vi.fn(),
		}
	}),
})
