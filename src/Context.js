import React from 'react'
import { io } from 'socket.io-client'

const Context = React.createContext()

const socket = io()

const ContextProvider = ({children}) => {
    const [getDarkMode, setDarkMode] = React.useState(true)
    const [isSocketConnected, setSocketConnected] = React.useState(false)

    socket.on('connect', () => {
        setSocketConnected(true)
    })
    socket.on('disconnect', () => {
        setSocketConnected(false)
    })

    const registerStream = () => {
        socket.emit('registerStream')
    }

    return (
        <Context.Provider value={{
            getDarkMode,
            setDarkMode,
            isSocketConnected,
            registerStream
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
