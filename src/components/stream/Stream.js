import React from 'react'
import { useParams } from 'react-router'
import './Stream.css'
import { Context } from '../../Context.js'

export default function Stream() {
    const { joinStream, leaveStream, isStreamService } = React.useContext(Context)
    const [isStreamRunning, setStreamRunning] = React.useState(false)
    const { id } = useParams()
    const videoRef = React.useRef()

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

    return (
        <video
            className='player'
            ref={videoRef}
            autoPlay
            controls
            playsInline
            muted
        >
        </video>
    )
}
