"use strict"
var __spreadArray =
	(this && this.__spreadArray) ||
	function (to, from, pack) {
		if (pack || arguments.length === 2)
			for (var i = 0, l = from.length, ar; i < l; i++) {
				if (ar || !(i in from)) {
					if (!ar) ar = Array.prototype.slice.call(from, 0, i)
					ar[i] = from[i]
				}
			}
		return to.concat(ar || Array.prototype.slice.call(from))
	}
Object.defineProperty(exports, "__esModule", { value: true })
exports.useDebounceEffect = useDebounceEffect
var react_1 = require("react")
/**
 * Runs `effectRef.current()` after `delay` ms whenever any of the `deps` change,
 * but cancels/re-schedules if they change again before the delay.
 */
function useDebounceEffect(effect, delay, deps) {
	var callbackRef = (0, react_1.useRef)(effect)
	var timeoutRef = (0, react_1.useRef)(null)
	// Keep callbackRef current
	;(0, react_1.useEffect)(
		function () {
			callbackRef.current = effect
		},
		[effect],
	)
	;(0, react_1.useEffect)(
		function () {
			// Clear any queued call
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
			// Schedule a new call
			timeoutRef.current = setTimeout(function () {
				// always call the *latest* version of effect
				callbackRef.current()
			}, delay)
			// Cleanup on unmount or next effect
			return function () {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current)
				}
			}
			// We want to re‐schedule if any item in `deps` changed,
			// or if `delay` changed.
		},
		__spreadArray([delay], deps, true),
	)
}
