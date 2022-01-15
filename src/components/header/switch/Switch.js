import React from 'react'
import './Switch.css'
import { Context } from '../../../Context.js'
import { getHorizontalOffsets } from '../../../helpers/getHorizontalOffsets.js'

export default function Switch({props}) {
    const { getDarkMode } = React.useContext(Context)
    const switchRef = React.useRef()
    const activity = props.position ? 'on' : 'off'
    const appearance = getDarkMode ? 'dark' : 'light'

    function enableTooltip() {
        const horizontalOffsets = getHorizontalOffsets(switchRef.current.getBoundingClientRect())
        props.setTooltipText('Dark mode')
        props.setToolOffsets(horizontalOffsets)
        props.setTooltipVisibility(true)
    }

    function disableTooltip() {
        props.setTooltipVisibility(false)
    }

    return (
        <div
            className={`Switch ${appearance}`}
            ref={switchRef}
            onClick={props.callback}
            onMouseOver={enableTooltip}
            onMouseOut={disableTooltip}>
            <div className={`Switch-thumb ${appearance} ${activity}`}/>
        </div>
    )
}
