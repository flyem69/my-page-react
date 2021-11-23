import React from 'react'
import './Home.css'
import FuelImage from '../../images/fuel_canister.svg'
import Gamepad from '../../images/gamepad.svg'
import { Link } from 'react-router-dom'

export default function Home({props}) {
    const getDarkMode = props.darkModeState[0]
    const appearance = getDarkMode ? 'dark' : 'light'
    return (
        <div className='Home'>
            <Link to='/fuel'>
                <img
                    src={FuelImage}
                    className={`Home-item ${appearance}`}
                    alt='fuelImage'
                />
            </Link>
            <img
                src={Gamepad}
                className={`Home-item ${appearance}`}
                alt='gamepad'
            />
        </div>
    )
}
