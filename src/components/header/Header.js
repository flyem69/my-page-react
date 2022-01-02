import React from 'react'
import Switch from './switch/Switch.js'
import './Header.css'
import { Link } from 'react-router-dom'
import { Context } from '../../Context.js'

export default function Header() {
    const {getDarkMode, setDarkMode} = React.useContext(Context)
    const appearance = getDarkMode ? 'dark' : 'light'
    const headerRef = React.useRef()
    const switchProps = {
        switchPosition: getDarkMode,
        switchCallback: () => {
            setDarkMode(darkMode => !darkMode)
        }
    }

    React.useEffect(() => {
        function wheelScrollEvent(e) {
            e.preventDefault()
            headerRef.current.scrollLeft -= e.deltaY
        }
        headerRef.current.addEventListener('wheel', wheelScrollEvent)
        return () => {
            headerRef.current.removeEventListener('wheel', wheelScrollEvent)
        }
    }, [])

    return (
        <div className={`Header ${appearance}`}>
            <Link to='/'>
                <div className={`Header-home ${appearance}`}/>
            </Link>
            <div className='Header-gap'/>
            <div className='Header-icons' ref={headerRef}>
                <Switch props={switchProps}/>
            </div>
            <div className='Header-gap'/>
        </div>
    )
}
