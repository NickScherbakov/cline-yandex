"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
var vitest_1 = require("vitest")
var platformUtils_1 = require("../platformUtils")
;(0, vitest_1.describe)("detectMetaKeyChar", function () {
	;(0, vitest_1.it)("should return ⌘ Command for darwin platform", function () {
		var result = (0, platformUtils_1.detectMetaKeyChar)("darwin")
		;(0, vitest_1.expect)(result).toBe("CMD")
	})
	;(0, vitest_1.it)("should return ⊞ Win for win32 platform", function () {
		var result = (0, platformUtils_1.detectMetaKeyChar)("win32")
		;(0, vitest_1.expect)(result).toBe("Win")
	})
	;(0, vitest_1.it)("should return Alt for linux platform", function () {
		var result = (0, platformUtils_1.detectMetaKeyChar)("linux")
		;(0, vitest_1.expect)(result).toBe("Alt")
	})
	;(0, vitest_1.it)("should return generic CMD for unknown platform", function () {
		var result = (0, platformUtils_1.detectMetaKeyChar)("somethingelse")
		;(0, vitest_1.expect)(result).toBe("CMD")
	})
})
