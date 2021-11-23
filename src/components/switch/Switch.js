import React from 'react'
import './Switch.css'

export default function Switch({globalProps, localProps}) {
    const getDarkMode = globalProps.darkModeState[0]
    const position = localProps.switchPosition
    const callback = localProps.switchCallback
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
