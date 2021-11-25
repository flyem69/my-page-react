import { createContext, useState } from 'react'
import { io } from 'socket.io-client'

const Context = createContext()

const ContextProvider = ({children}) => {
    const [getDarkMode, setDarkMode] = useState(true)
    const initializeSocket = () => {
        const socket = io('http://localhost:8080', {
            path: '/streams'
        })
        socket.on('connect', () => {
            console.log(socket.id)
        })
    }
    return (
        <Context.Provider value={{
            getDarkMode,
            setDarkMode
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }