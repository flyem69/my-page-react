import React from 'react'
import './Home.css'
import Fuel from '../../images/fuel_canister.svg'
import Gamepad from '../../images/gamepad.svg'
import Streaming from '../../images/streaming.svg'
import { Link } from 'react-router-dom'
import { Context } from '../../Context.js'

export default function Home() {
    const {getDarkMode} = React.useContext(Context)
    const appearance = getDarkMode ? 'dark' : 'light'
    return (
        <div className='Home-grid'>
            <Link to='/fuel'>
                <img
                    src={Fuel}
                    className={`Home-item ${appearance}`}
                    alt='Fuel'
                />
            </Link>
            <img
                src={Gamepad}
                className={`Home-item ${appearance}`}
                alt='Gamepad'
            />
            <Link to='/streams'>
                <img
                    src={Streaming}
                    className={`Home-item ${appearance}`}
                    alt='Streaming'
                />
            </Link>
        </div>
    )
}
