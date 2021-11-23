import React from 'react'
import Switch from '../switch/Switch.js'
import './Header.css'

export default function Header({props}) {
    const [getDarkMode, setDarkMode] = props.darkModeState
    const appearance = getDarkMode ? 'dark' : 'light'
    const switchProps = {
        switchPosition: getDarkMode,
        switchCallback: () => {
            setDarkMode(darkMode => !darkMode)
        }
    }
    return (
        <div className={`Header ${appearance}`}>
            <div className='Header-switch'>
                <Switch globalProps={props} localProps={switchProps}/>
            </div>
            <div className='Header-switchLabel'>
                Dark mode
            </div>
        </div>
    )
}
