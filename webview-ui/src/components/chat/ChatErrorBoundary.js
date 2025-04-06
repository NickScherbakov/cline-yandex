"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAfterDelay = exports.ChatErrorBoundary = void 0;
var react_1 = require("react");
/**
 * A reusable error boundary component specifically designed for chat widgets.
 * It provides a consistent error UI with customizable title and body text.
 */
var ChatErrorBoundary = /** @class */ (function (_super) {
    __extends(ChatErrorBoundary, _super);
    function ChatErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false, error: null };
        return _this;
    }
    ChatErrorBoundary.getDerivedStateFromError = function (error) {
        return { hasError: true, error: error };
    };
    ChatErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        console.error("Error in ChatErrorBoundary:", error.message);
        console.error("Component stack:", errorInfo.componentStack);
    };
    ChatErrorBoundary.prototype.render = function () {
        var _a;
        var _b = this.props, errorTitle = _b.errorTitle, errorBody = _b.errorBody, height = _b.height;
        if (this.state.hasError) {
            return (<div style={{
                    padding: "10px",
                    color: "var(--vscode-errorForeground)",
                    height: height || "auto",
                    maxWidth: "512px",
                    overflow: "auto",
                    border: "1px solid var(--vscode-editorError-foreground)",
                    borderRadius: "4px",
                    backgroundColor: "var(--vscode-inputValidation-errorBackground, rgba(255, 0, 0, 0.1))",
                }}>
					<h3 style={{ margin: "0 0 8px 0" }}>{errorTitle || "Something went wrong displaying this content"}</h3>
					<p style={{ margin: "0" }}>{errorBody || "Error: ".concat(((_a = this.state.error) === null || _a === void 0 ? void 0 : _a.message) || "Unknown error")}</p>
				</div>);
        }
        return this.props.children;
    };
    return ChatErrorBoundary;
}(react_1.default.Component));
exports.ChatErrorBoundary = ChatErrorBoundary;
var ErrorAfterDelay = /** @class */ (function (_super) {
    __extends(ErrorAfterDelay, _super);
    function ErrorAfterDelay(props) {
        var _this = _super.call(this, props) || this;
        _this.intervalID = null;
        _this.state = {
            tickCount: 0,
        };
        return _this;
    }
    ErrorAfterDelay.prototype.componentDidMount = function () {
        var _this = this;
        var _a;
        var secondsToWait = (_a = this.props.numSecondsToWait) !== null && _a !== void 0 ? _a : 5;
        this.intervalID = setInterval(function () {
            if (_this.state.tickCount >= secondsToWait) {
                if (_this.intervalID) {
                    clearInterval(_this.intervalID);
                }
                // Error boundaries don't catch async code :(
                // So this only works by throwing inside of a setState
                _this.setState(function () {
                    throw new Error("This is an error for testing the error boundary");
                });
            }
            else {
                _this.setState({
                    tickCount: _this.state.tickCount + 1,
                });
            }
        }, 1000);
    };
    ErrorAfterDelay.prototype.componentWillUnmount = function () {
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
    };
    ErrorAfterDelay.prototype.render = function () {
        var _a;
        // Add a small visual indicator that this component will cause an error
        return (<div style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "rgba(255, 0, 0, 0.5)",
                color: "var(--vscode-errorForeground)",
                padding: "2px 5px",
                fontSize: "12px",
                borderRadius: "0 0 0 4px",
                zIndex: 100,
            }}>
				Error in {this.state.tickCount}/{(_a = this.props.numSecondsToWait) !== null && _a !== void 0 ? _a : 5} seconds
			</div>);
    };
    return ErrorAfterDelay;
}(react_1.default.Component));
exports.ErrorAfterDelay = ErrorAfterDelay;
exports.default = ChatErrorBoundary;
