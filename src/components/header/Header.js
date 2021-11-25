import React from 'react'
import Switch from '../switch/Switch.js'
import './Header.css'
import { Context } from '../../Context.js'

export default function Header() {
    const {getDarkMode, setDarkMode} = React.useContext(Context)
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
                <Switch props={switchProps}/>
            </div>
            <div className='Header-switchLabel'>
                Dark mode
            </div>
        </div>
    )
}
