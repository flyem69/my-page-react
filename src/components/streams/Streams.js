import React from 'react'
import './Streams.css'
import { Context } from '../../Context.js'
import Refresh from '../../images/refresh.svg'

export default function Streams() {
    const {getDarkMode, isSocketConnected, registerStream} = React.useContext(Context)
    const [getStreams, setStreams] = React.useState([])
    const [isRefreshing, setRefreshing] = React.useState(false)
    const appearance = getDarkMode ? 'dark' : 'light'
    const availableStreams = isSocketConnected ? 0 : 'No service'
    const animation = isRefreshing ? 'rotating' : 'still'
    const streamList = getStreams.map(stream => {
      return (<div key={stream}>
        {stream}
      </div>)
    })

    React.useEffect(() => {
      if (isSocketConnected)
        fetchStreams()
    }, [isSocketConnected])

    function fetchStreams() {
      const startTime = Date.now()
      setRefreshing(true)
      fetch(window.location.protocol + '//' + window.location.host + '/api/streams')
        .then(res => {
          const remainingAnimationTime = 1000 - ((Date.now() - startTime) % 1000)
          setTimeout(() => {
            setRefreshing(false)
          }, remainingAnimationTime)
          return res.json()
        })
        .then(data => {
          setStreams(data)
        }, err => {
          console.log(err)
        })
    }

    function refresh() {
      if (isSocketConnected && !isRefreshing)
        fetchStreams()
    }

    return (
        <div className='Streams-grid'>
            <div className='Streams-header'>Streams</div>
            <div className={`Streams-separator ${appearance}`}></div>
            <div
              className={`button ${appearance}`}
              onClick={registerStream}>
                Start stream
            </div>
            <div className='Streams-available'>
              Available streams: {availableStreams}
              <img 
                src={Refresh}
                className={`Streams-refresh ${animation} ${appearance}`}
                alt='refresh'
                onClick={refresh}
              />
            </div>
            <div className='Streams-available-grid'>{streamList}</div>
        </div>
    )
}
