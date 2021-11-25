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

    return (
        <Context.Provider value={{
            getDarkMode,
            setDarkMode,
            isSocketConnected
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }