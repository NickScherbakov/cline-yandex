import { WebviewMessage } from "@shared/WebviewMessage";
/**
 * A utility wrapper around the acquireVsCodeApi() function, which enables
 * message passing and state management between the webview and extension
 * contexts.
 *
 * This utility also enables webview code to be run in a web browser-based
 * dev server by using native web browser features that mock the functionality
 * enabled by acquireVsCodeApi.
 */
declare class VSCodeAPIWrapper {
    private readonly vsCodeApi;
    constructor();
    /**
     * Post a message (i.e. send arbitrary data) to the owner of the webview.
     *
     * @remarks When running webview code inside a web browser, postMessage will instead
     * log the given message to the console.
     *
     * @param message Abitrary data (must be JSON serializable) to send to the extension context.
     */
    postMessage(message: WebviewMessage): void;
    /**
     * Get the persistent state stored for this webview.
     *
     * @remarks When running webview source code inside a web browser, getState will retrieve state
     * from local storage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
     *
     * @return The current state or `undefined` if no state has been set.
     */
    getState(): unknown | undefined;
    /**
     * Set the persistent state stored for this webview.
     *
     * @remarks When running webview source code inside a web browser, setState will set the given
     * state using local storage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
     *
     * @param newState New persisted state. This must be a JSON serializable object. Can be retrieved
     * using {@link getState}.
     *
     * @return The new state.
     */
    setState<T extends unknown | undefined>(newState: T): T;
}
export declare const vscode: VSCodeAPIWrapper;
export {};
