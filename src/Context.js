import React from 'react'
import { io } from 'socket.io-client'
import Peer from 'peerjs'

const Context = React.createContext()

const socket = io({
    path: '/socket'
})
const peer = new Peer({
    host: '/',
    port: 443,
    path: '/peer',
    secure: true,
    debug: 3
})

const ContextProvider = ({children}) => {
    const [getDarkMode, setDarkMode] = React.useState(true)
    const [isSocketConn, setSocketConn] = React.useState(false)
    const [isPeerConn, setPeerConn] = React.useState(false)
    const [isStreamService, setStreamService] = React.useState(false)
    const [getStream, setStream] = React.useState(null)

    React.useEffect(() => {
        if (isSocketConn && isPeerConn) {
            setStreamService(true)
        } else {
            setStreamService(false)
        }
    }, [isSocketConn, isPeerConn])

    socket.on('connect', () => {
        setSocketConn(true)
    })
    peer.on('open', id => {
        setPeerConn(true)
    })
    socket.on('disconnect', () => {
        setSocketConn(false)
    })
    peer.on('disconnected', () => {
        setPeerConn(false)
    })

    function startStream(stream) {
        setStream(stream)
        socket.on('viewerJoining', userId => {
            peer.call(userId, stream)
            console.log(`User ${userId} joined`)
        })
        socket.on('viewerLeaving', userId => {
            console.log(`User ${userId} left`)
        })
        socket.emit('registerStream')
        stream.getVideoTracks()[0].addEventListener('ended', () => {
            socket.emit('deregisterStream')
            socket.off('viewerJoining')
            socket.off('viewerLeaving')
            setStream(null)
        })
    }

    function joinStream(streamSocket, streamHandler) {
        if (socket.id === streamSocket) {
            streamHandler(getStream)
        } else {
            socket.on('viewerJoining', userId => {
                console.log(`User ${userId} joined`)
            })
            socket.on('viewerLeaving', userId => {
                console.log(`User ${userId} left`)
            })
            peer.on('call', call => {
                call.answer()
                call.on('stream', remoteStream => {
                    streamHandler(remoteStream)
                })
            })
        }
        socket.emit('joinStream', streamSocket, peer.id)
    }

    function leaveStream(streamSocket) {
        if (socket.id !== streamSocket) {
            socket.off('viewerJoining')
            socket.off('viewerLeaving')
            peer.off('call')
        }
        socket.emit('leaveStream', streamSocket, peer.id)
    }

    return (
        <Context.Provider value={{
            getDarkMode,
            setDarkMode,
            isStreamService,
            startStream,
            joinStream,
            leaveStream
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
