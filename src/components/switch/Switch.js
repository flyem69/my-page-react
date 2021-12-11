import React from 'react'
import './Switch.css'
import { Context } from '../../Context.js'

export default function Switch({props}) {
    const {getDarkMode} = React.useContext(Context)
    const callback = props.switchCallback
    const appearance = getDarkMode ? 'dark' : 'light'
    const activity = props.switchPosition ? 'on' : 'off'
    return (
        <div className={`Switch ${appearance}`} onClick={callback}>
            <div className={`Switch-thumb ${appearance} ${activity}`}/>
        </div>
    )
}
