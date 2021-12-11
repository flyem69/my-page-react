import React from 'react'
import './Fuel.css'
import Input from './input/Input.js'
import { Context } from '../../Context.js'

export default function Fuel() {
    const {getDarkMode} = React.useContext(Context)
    const appearance = getDarkMode ? 'dark' : 'light'
    const [isBtnLock, setBtnLock] = React.useState(false)
    const [getFuelValue, setFuelValue] = React.useState(0)
    const values = {
        lapTimeMin: React.useState(''),
        lapTimeS: React.useState(''),
        lapTimeMS: React.useState(''),
        fuelPerLap: React.useState(''),
        raceLength: React.useState(''),
        fuelPer100: React.useState(''),
        distance: React.useState(''),
        fuel: React.useState('')
    }
    const validities = {
        lapTime: React.useState(true),
        fuelPerLap: React.useState(true),
        raceLength: React.useState(true),
        fuelPer100: React.useState(true),
        distance: React.useState(true)
    }
    const lapTimeMinProps = {
        'valueState': values.lapTimeMin,
        'validityState': validities.lapTime,
        'placeholder': 'min',
        'onClick': () => {validities.lapTime[1](true)},
        'regex': /^\d{0,2}$/
    }
    const lapTimeSProps = {
        'valueState': values.lapTimeS,
        'validityState': validities.lapTime,
        'placeholder': 's',
        'onClick': () => {validities.lapTime[1](true)},
        'regex': /^[0-5]?[0-9]?$/
    }
    const lapTimeMSProps = {
        'valueState': values.lapTimeMS,
        'validityState': validities.lapTime,
        'placeholder': 'ms',
        'onClick': () => {validities.lapTime[1](true)},
        'regex': /^\d{0,2}$/
    }
    const fuelPerLapProps = {
        'valueState': values.fuelPerLap,
        'validityState': validities.fuelPerLap,
        'placeholder': 'l',
        'onClick': () => {validities.fuelPerLap[1](true)},
        'regex': /^(\d{0,2}|\d{1,2}\.\d?)$/
    }
    const raceLengthProps = {
        'valueState': values.raceLength,
        'validityState': validities.raceLength,
        'placeholder': 'min',
        'onClick': () => {validities.raceLength[1](true)},
        'regex': /^\d{0,4}$/
    }
    const fuelPer100Props = {
        'valueState': values.fuelPer100,
        'validityState': validities.fuelPer100,
        'placeholder': 'l',
        'onClick': () => {validities.fuelPer100[1](true)},
        'regex': /^(\d{0,2}|\d{1,2}\.\d?)$/
    }
    const distanceProps = {
        'valueState': values.distance,
        'validityState': validities.distance,
        'placeholder': 'km',
        'onClick': () => {validities.distance[1](true)},
        'regex': /^\d{0,4}$/
    }

    React.useEffect(() => {
        values.fuel[1](getFuelValue + ' l')
    }, [getFuelValue])

    function calcRaceFuel() {
        if (isBtnLock)
            return
        let lapTime = values.lapTimeMin[0] * 1 * 60000
        lapTime += values.lapTimeS[0] * 1 * 1000
        lapTime += values.lapTimeMS[0] * 1
        const fuelPerLap = values.fuelPerLap[0] * 1
        const raceLength = values.raceLength[0] * 60000

        const setStateCallbacks = []
        if (lapTime === 0) {
            setStateCallbacks.push(validities.lapTime[1])
        }
        if (fuelPerLap === 0) {
            setStateCallbacks.push(validities.fuelPerLap[1])
        }
        if (raceLength === 0) {
            setStateCallbacks.push(validities.raceLength[1])
        }
        if (setStateCallbacks.length > 0) {
            setStateCallbacks.forEach(setStateCallback => {
                setStateCallback(false)
            });
            return
        }

        const laps = raceLength / lapTime
        let newFuelValue = fuelPerLap * laps
        setResultSmoothly(newFuelValue)
    }

    function calcRoadFuel() {
        if (isBtnLock)
            return
        const fuelPer100 = values.fuelPer100[0] * 1
        const distance = values.distance[0] * 1

        const setStateCallbacks = []
        if (fuelPer100 === 0) {
            setStateCallbacks.push(validities.fuelPer100[1])
        }
        if (distance === 0) {
            setStateCallbacks.push(validities.distance[1])
        }
        if (setStateCallbacks.length > 0) {
            setStateCallbacks.forEach(setStateCallback => {
                setStateCallback(false)
            });
            return
        }

        const distancePer100 = distance / 100
        let newFuelValue = fuelPer100 * distancePer100
        setResultSmoothly(newFuelValue)
    }

    function setResultSmoothly(newFuelValue) {
        setBtnLock(true)
        const resultChangeLength = 500
        const numberOfChanges = 50
        const valueGap = (newFuelValue - getFuelValue) / numberOfChanges
        const timeGap = resultChangeLength / numberOfChanges
        const interpolationDataObj = {
            iteration: 0,
            limit: numberOfChanges,
            valueGap: valueGap,
            timeGap: timeGap,
            rawValue: getFuelValue
        }
        interpolateResult(interpolationDataObj)
    }

    function interpolateResult(obj) {
        if (obj.iteration >= obj.limit) {
            setBtnLock(false)
            return
        }
        setTimeout(() => {
            obj.rawValue += obj.valueGap
            setFuelValue(Math.ceil(obj.rawValue))
            obj.iteration++
            interpolateResult(obj)
        }, obj.timeGap)
    }

    return (
        <div className='Fuel-grid'>
            <div className='Fuel-category-grid x0 y0'>
                <div className='x0 y0 align-right'>
                    Lap time
                </div>
                <div className='x1 y0'>
                    <Input props={lapTimeMinProps}/>
                </div>
                <div className='x2 y0'>
                    <Input props={lapTimeSProps}/>
                </div>
                <div className='x3 y0'>
                    <Input props={lapTimeMSProps}/>
                </div>
                <div className='x0 y1 align-right'>
                    Fuel per lap
                </div>
                <div className='x1 y1'>
                    <Input props={fuelPerLapProps}/>
                </div>
                <div className='x0 y2 align-right'>
                    Race length
                </div>
                <div className='x1 y2'>
                    <Input props={raceLengthProps}/>
                </div>
                <div className='x03 y3'>
                    <div className={`button ${appearance}`} onClick={calcRaceFuel}>
                        Calculate race fuel
                    </div>
                </div>
            </div>
            <div className='Fuel-category-grid x1 y0'>
                <div className='x0 y0 align-right'>
                    Fuel per 100 km
                </div>
                <div className='x1 y0'>
                    <Input props={fuelPer100Props}/>
                </div>
                <div className='x0 y1 align-right'>
                    Distance
                </div>
                <div className='x1 y1'>
                    <Input props={distanceProps}/>
                </div>
                <div className='x01 y2'>
                    <div className={`button ${appearance}`} onClick={calcRoadFuel}>
                        Calculate road fuel
                    </div>
                </div>
            </div>
            <div className='Fuel-result x01 y1'>
                {values.fuel[0]}
            </div>
        </div>
    )
}
