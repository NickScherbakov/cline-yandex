export declare const CODE_BLOCK_BG_COLOR = "var(--vscode-editor-background, --vscode-sideBar-background, rgb(30 30 30))";
interface CodeBlockProps {
    source?: string;
    forceWrap?: boolean;
}
declare const CodeBlock: import("react").MemoExoticComponent<({ source, forceWrap }: CodeBlockProps) => import("react").JSX.Element>;
export default CodeBlock;
