import React from 'react'
import './Header.css'
import Switch from './switch/Switch.js'
import Tooltip from './tooltip/Tooltip.js'
import { Link } from 'react-router-dom'
import { Context } from '../../Context.js'

export default function Header() {
    const { 
        getDarkMode,
        setDarkMode,
        enableTooltip,
        disableTooltip
    } = React.useContext(Context)
    const appearance = getDarkMode ? 'dark' : 'light'
    const homeRef = React.useRef()
    const headerIconsRef = React.useRef()
    const switchProps = {
        position: getDarkMode,
        callback: () => {
            setDarkMode(darkMode => !darkMode)
        }
    }

    React.useEffect(() => {
        function wheelScrollEvent(e) {
            e.preventDefault()
            headerIconsRef.current.scrollLeft += e.deltaY
        }
        headerIconsRef.current.addEventListener('wheel', wheelScrollEvent)
        return () => {
            headerIconsRef.current.removeEventListener('wheel', wheelScrollEvent)
        }
    }, [])

    return (
        <div className={`Header ${appearance}`}>
            <div className='Header-content'>
                <Link to='/'>
                    <div 
                        className={`Header-home ${appearance}`}
                        ref={homeRef}
                        onMouseOver={() => enableTooltip('Home', homeRef.current.getBoundingClientRect())}
                        onMouseOut={() => disableTooltip()}/>
                </Link>
                <div className='Header-gap'/>
                <div className='Header-icons' ref={headerIconsRef}>
                    <Switch props={switchProps}/>
                </div>
                <div className='Header-gap'/>
            </div>
            <Tooltip/>
        </div>
    )
}
