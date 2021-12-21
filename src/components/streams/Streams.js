import React from 'react'
import { Link } from 'react-router-dom'
import './Streams.css'
import { Context } from '../../Context.js'

export default function Streams() {
    const { getDarkMode, isStreamService, getStream, startStream } = React.useContext(Context)
    const [getStreamList, setStreamList] = React.useState([])
    const [isRefreshing, setRefreshing] = React.useState(false)
    const appearance = getDarkMode ? 'dark' : 'light'
    const availableStreams = isStreamService ? getStreamList.length : 'No service'
    const refreshVisibility = isStreamService ? 'visible' : 'hidden'
    const startStreamVisibility = isStreamService && getStream == null ? 'visible' : 'hidden'
    const animation = isRefreshing ? 'rotating' : 'still'
    const streamList = getStreamList.map(streamId => {
      return (
        <Link to={`/stream/${streamId}`} key={streamId}>
          <div className={`button ${appearance}`}>
            {streamId}
          </div>
        </Link>
      )
    })

    React.useEffect(() => {
      if (isStreamService)
        fetchStreams()
      else
        setStreamList([])
    }, [isStreamService])

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

    function refresh() {
      if (isStreamService && 
        !isRefreshing && 
        refreshVisibility === 'visible')
        fetchStreams()
    }

    function setupStream() {
      if (isStreamService && startStreamVisibility === 'visible') {
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
              className={`button Streams-start ${appearance} ${startStreamVisibility}`}
              onClick={setupStream}>
                Start stream
            </div>
            <div className='Streams-available'>
              Available streams: {availableStreams}
              <div
                className={`Streams-refresh ${animation} ${appearance} ${refreshVisibility}`}
                onClick={refresh}
              />
            </div>
            <div className='Streams-available-grid'>{streamList}</div>
        </div>
    )
}
