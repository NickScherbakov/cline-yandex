import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
interface DangerButtonProps extends React.ComponentProps<typeof VSCodeButton> {}
declare const DangerButton: React.FC<DangerButtonProps>
export default DangerButton
