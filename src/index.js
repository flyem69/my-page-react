import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App.js'
import { ContextProvider } from './Context.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <ContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ContextProvider>, 
    document.getElementById('root')
)
