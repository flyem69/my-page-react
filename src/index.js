import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App.js'
import { ContextProvider } from './Context.js'

ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>, 
    document.getElementById('root')
)
