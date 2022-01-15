import React from 'react'
import './Header.css'
import Switch from './switch/Switch.js'
import Tooltip from './tooltip/Tooltip.js'
import { Link } from 'react-router-dom'
import { Context } from '../../Context.js'
import { getHorizontalOffsets } from '../../helpers/getHorizontalOffsets.js'

export default function Header() {
    const [getTooltipText, setTooltipText] = React.useState('')
    const [getTooltipVisibility, setTooltipVisibility] = React.useState(false)
    const [getToolOffsets, setToolOffsets] = React.useState([0, 0]) // [offsetLeft, offsetRight]
    const { getDarkMode, setDarkMode } = React.useContext(Context)
    const appearance = getDarkMode ? 'dark' : 'light'
    const homeRef = React.useRef()
    const headerIconsRef = React.useRef()
    const switchProps = {
        position: getDarkMode,
        callback: () => {
            setDarkMode(darkMode => !darkMode)
        },
        setTooltipText: setTooltipText,
        setTooltipVisibility: setTooltipVisibility,
        setToolOffsets: setToolOffsets
    }
    const tooltipProps = {
        text: getTooltipText,
        visibility: getTooltipVisibility,
        toolOffsets: getToolOffsets
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

    function enableHomeTooltip() {
        const horizontalOffsets = getHorizontalOffsets(homeRef.current.getBoundingClientRect())
        setTooltipText('Home')
        setToolOffsets(horizontalOffsets)
        setTooltipVisibility(true)
    }

    function disableHomeTooltip() {
        setTooltipVisibility(false)
    }

    return (
        <div className={`Header ${appearance}`}>
            <div className='Header-content'>
                <Link to='/'>
                    <div 
                        className={`Header-home ${appearance}`}
                        ref={homeRef}
                        onMouseOver={enableHomeTooltip}
                        onMouseOut={disableHomeTooltip}/>
                </Link>
                <div className='Header-gap'/>
                <div className='Header-icons' ref={headerIconsRef}>
                    <Switch props={switchProps}/>
                </div>
                <div className='Header-gap'/>
            </div>
            <Tooltip props={tooltipProps}/>
        </div>
    )
}
