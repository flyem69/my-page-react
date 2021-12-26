import React from 'react'
import { useParams } from 'react-router'
import './Stream.css'
import { Context } from '../../Context.js'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

export default function Stream() {
    const { joinStream, leaveStream, isStreamService } = React.useContext(Context)
    const [isStreamRunning, setStreamRunning] = React.useState(false)
    const [getPlayState, setPlayState] = React.useState(false)
    const playState = getPlayState ? 'playing' : 'paused'
    const [getScreenMode, setScreenMode] = React.useState(false)
    const screenMode = getScreenMode ? 'full' : 'window'
    const { id } = useParams()
    const videoRef = React.useRef()
    const fullScreenHandle = useFullScreenHandle()

    const screenModeChanged = React.useCallback((state, handle) => {
        setScreenMode(state)
    }, [fullScreenHandle])

    React.useEffect(() => {
        if (isStreamService && !isStreamRunning) {
            joinStream(id, stream => {
                videoRef.current.srcObject = stream
            })
            setStreamRunning(true)
        }
        return () => {
            if (isStreamRunning) {
                leaveStream(id)
            }
        }
    }, [isStreamService, isStreamRunning])

    function togglePlay() {
        if (videoRef.current.paused || videoRef.current.ended) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }

    function toggleFullScreen() {
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
                src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
                autoPlay
                playsInline
                muted
                onPlay={() => setPlayState(true)}
                onPause={() => setPlayState(false)}
            >
            </video>
            <div className='Stream-controls'>
                <div className={`Stream-control Stream-play ${playState}`} onClick={togglePlay}></div>
                <div className='Stream-control Stream-volume'>volume</div>
                <div></div>
                <div className={`Stream-control Stream-full-screen ${screenMode}`} onClick={toggleFullScreen}></div>
            </div>
        </FullScreen>
    )
}
