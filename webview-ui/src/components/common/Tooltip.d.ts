import React from "react"
interface TooltipProps {
	visible: boolean
	hintText: string
	tipText: string
	children: React.ReactNode
	style?: React.CSSProperties
}
declare const Tooltip: React.FC<TooltipProps>
export default Tooltip
