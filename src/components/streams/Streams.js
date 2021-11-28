import React from 'react'
import { Link } from 'react-router-dom'
import './Streams.css'
import { Context } from '../../Context.js'
import Refresh from '../../images/refresh.svg'

export default function Streams() {
    const { getDarkMode, isStreamService, startStream } = React.useContext(Context)
    const [getStreamList, setStreamList] = React.useState([])
    const [isRefreshing, setRefreshing] = React.useState(false)
    const appearance = getDarkMode ? 'dark' : 'light'
    const availableStreams = isStreamService ? getStreamList.length : 'No service'
    const animation = isRefreshing ? 'rotating' : 'still'
    const streamList = getStreamList.map(streamId => {
      return (
        <Link to={`/stream/${streamId}`}>
          <div key={streamId}>
            {streamId}
          </div>
        </Link>
      )
    })

    React.useEffect(() => {
      if (isStreamService)
        fetchStreams()
    }, [isStreamService])

    function refresh() {
      if (isStreamService && !isRefreshing)
        fetchStreams()
    }

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
        .then(array => {
          setStreamList(array)
        }, err => {
          console.log(err)
        })
    }

    function setupStream() {
      if (isStreamService) {
        navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        }).then(stream => {
          startStream(stream)
        }, err => {
          console.log(err)
        })
      }
    }

    return (
        <div className='Streams-grid'>
            <div className='Streams-header'>Streams</div>
            <div className={`Streams-separator ${appearance}`}></div>
            <div
              className={`button ${appearance}`}
              onClick={setupStream}>
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
