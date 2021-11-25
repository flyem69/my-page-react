import React from 'react'
import './Home.css'
import FuelImage from '../../images/fuel_canister.svg'
import Gamepad from '../../images/gamepad.svg'
import { Link } from 'react-router-dom'
import {Context} from '../../Context.js'

export default function Home() {
    const {getDarkMode} = React.useContext(Context)
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
