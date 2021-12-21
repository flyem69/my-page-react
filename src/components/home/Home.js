import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { Context } from '../../Context.js'

export default function Home() {
    const {getDarkMode} = React.useContext(Context)
    const appearance = getDarkMode ? 'dark' : 'light'
    return (
        <div className='Home-grid'>
            <Link to='/fuel'>
                <div className={`Home-item Home-fuel ${appearance}`}/>
            </Link>
            <div className={`Home-item Home-gamepad ${appearance}`}/>
            <Link to='/streams'>
                <div className={`Home-item Home-streaming ${appearance}`}/>
            </Link>
        </div>
    )
}
