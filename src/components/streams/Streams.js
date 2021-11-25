import React from 'react'
import './Streams.css'
import { Context } from '../../Context.js'

export default function Streams() {
    const {getDarkMode, isSocketConnected} = React.useContext(Context)
    const appearance = getDarkMode ? 'dark' : 'light'
    const availableStreams = isSocketConnected ? 0 : 'No service'

    React.useEffect(() => {
        if (isSocketConnected) {
            fetch(window.location.protocol + '//' + window.location.host + '/api/streams')
                .then(res => res.json())
                .then(data => console.log('success'), err => console.log('fail'))
        }
    }, [isSocketConnected])

    return (
        <div className='Streams-grid'>
            <div className='Streams-header'>Streams</div>
            <div className={`Streams-separator ${appearance}`}></div>
            <div className={`button ${appearance}`}>Start stream</div>
            <div className='Streams-available'>Available streams: {availableStreams}</div>
            <div className='Streams-available-grid'></div>
        </div>
    )
}
