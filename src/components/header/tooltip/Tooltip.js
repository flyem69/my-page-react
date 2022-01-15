import React from 'react'
import './Tooltip.css'
import { Context } from '../../../Context.js'

export default function Tooltip({props}) {
    const {
        getDarkMode,
        getTooltipText,
        getTooltipVisibility,
        getTooltipDistances
    } = React.useContext(Context)
    const tooltipRef = React.useRef()
    const appearance = getDarkMode ? 'dark' : 'light'
    const activity = getTooltipVisibility ? 'active' : 'idle'

    React.useEffect(() => {
        const toolOffsetLeft = getTooltipDistances[0]
        const toolOffsetRight = getTooltipDistances[1]
        const tooltipWidth = tooltipRef.current.offsetWidth
        if (toolOffsetLeft < (tooltipWidth / 2)) {
            tooltipRef.current.style.left = '0px'
            tooltipRef.current.style.right = 'auto'
        } else if (toolOffsetRight < (tooltipWidth / 2)) {
            tooltipRef.current.style.right = '0px'
            tooltipRef.current.style.left = 'auto'
        } else {
            const styleLeft = toolOffsetLeft - (tooltipWidth / 2)
            tooltipRef.current.style.left = styleLeft + 'px'
            tooltipRef.current.style.right = 'auto'
        }
    }, [getTooltipDistances])

    return (
        <div className={`Tooltip ${activity} ${appearance}`} ref={tooltipRef}>
            {getTooltipText}
        </div>
    )
}
