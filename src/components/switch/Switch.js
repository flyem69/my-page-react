import React from 'react'
import './Switch.css'
import { Context } from '../../Context.js'

export default function Switch({props}) {
    const {getDarkMode} = React.useContext(Context)
    const position = props.switchPosition
    const callback = props.switchCallback
    const appearance = getDarkMode ? 'dark' : 'light'
    const thumbPosition = position ? '50%' : '0%'
    return (
        <div
            className={`Switch ${appearance}`}
            onClick={callback}
        >
            <div
                className='Switch-thumb'
                style={{left: thumbPosition}}
            />
        </div>
    )
}
