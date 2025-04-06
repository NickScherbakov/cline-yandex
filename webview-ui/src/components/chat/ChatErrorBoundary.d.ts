import React from "react";
interface ChatErrorBoundaryProps {
    children: React.ReactNode;
    errorTitle?: string;
    errorBody?: string;
    height?: string;
}
interface ChatErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}
/**
 * A reusable error boundary component specifically designed for chat widgets.
 * It provides a consistent error UI with customizable title and body text.
 */
export declare class ChatErrorBoundary extends React.Component<ChatErrorBoundaryProps, ChatErrorBoundaryState> {
    constructor(props: ChatErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
        error: Error;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): any;
}
/**
 * A demo component that throws an error after a delay.
 * This is useful for testing error boundaries during development
 */
interface ErrorAfterDelayProps {
    numSecondsToWait?: number;
}
interface ErrorAfterDelayState {
    tickCount: number;
}
export declare class ErrorAfterDelay extends React.Component<ErrorAfterDelayProps, ErrorAfterDelayState> {
    private intervalID;
    constructor(props: ErrorAfterDelayProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default ChatErrorBoundary;
