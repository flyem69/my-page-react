import React from 'react'
import Home from '../../images/home.svg'
import Switch from './switch/Switch.js'
import './Header.css'
import { Link } from 'react-router-dom'
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
            <Link to='/'>
                <img 
                    src={Home}
                    className={`Header-home ${appearance}`}
                    alt='Home'
                />
            </Link>
            <div></div>
            <Switch props={switchProps}/>
        </div>
    )
}
