import React from 'react'
import { useParams } from 'react-router'
import './Stream.css'
import { Context } from '../../Context.js'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

export default function Stream() {
    const { joinStream, leaveStream, isStreamService } = React.useContext(Context)
    const [isStreamInitialized, setStreamInitialized] = React.useState(false)
    const [getPlayState, setPlayState] = React.useState(false)
    const playMode = getPlayState ? 'playing' : 'paused'
    const [getScreenState, setScreenState] = React.useState(false)
    const screenMode = getScreenState ? 'full' : 'window'
    const { id } = useParams()
    const videoRef = React.useRef()
    const fullScreenHandle = useFullScreenHandle()

    React.useEffect(() => {
        if (isStreamService && !isStreamInitialized) {
            joinStream(id, stream => {
                videoRef.current.srcObject = stream
            })
            setStreamInitialized(true)
        }
        return () => {
            if (isStreamInitialized) {
                leaveStream(id)
            }
        }
    }, [isStreamService, isStreamInitialized])

    const screenModeChanged = React.useCallback((state, handle) => {
        setScreenState(state)
    }, [fullScreenHandle])

    function playModeChanged(state) {
        setPlayState(state)
    }

    function togglePlay() {
        if (videoRef.current.paused || videoRef.current.ended) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }

    function toggleScreen() {
        if (fullScreenHandle.active) {
            fullScreenHandle.exit()
        } else {
            fullScreenHandle.enter()
        }
    }

    return (
        <FullScreen className='Stream-wrapper' handle={fullScreenHandle} onChange={screenModeChanged}> 
            <video
                className='Stream-player'
                ref={videoRef}
                autoPlay
                playsInline
                muted
                onPlay={() => playModeChanged(true)}
                onPause={() => playModeChanged(false)}
            >
            </video>
            <div className='Stream-controls'>
                <div className={`Stream-control Stream-play ${playMode}`} onClick={togglePlay}></div>
                <div></div>
                <div></div>
                <div className={`Stream-control Stream-full-screen ${screenMode}`} onClick={toggleScreen}></div>
            </div>
        </FullScreen>
    )
}
