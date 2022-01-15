import React from 'react'
import './Switch.css'
import { Context } from '../../../Context.js'

export default function Switch({props}) {
    const {
        getDarkMode,
        enableTooltip,
        disableTooltip
    } = React.useContext(Context)
    const switchRef = React.useRef()
    const activity = props.position ? 'on' : 'off'
    const appearance = getDarkMode ? 'dark' : 'light'

    return (
        <div
            className={`Switch ${appearance}`}
            ref={switchRef}
            onClick={props.callback}
            onMouseOver={() => enableTooltip('Dark mode', switchRef.current.getBoundingClientRect())}
            onMouseOut={() => disableTooltip()}>
            <div className={`Switch-thumb ${appearance} ${activity}`}/>
        </div>
    )
}
