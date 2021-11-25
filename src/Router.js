import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/home/Home.js'
import Fuel from './components/fuel/Fuel.js'
import Streams from './components/streams/Streams.js'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/fuel'>
                    <Fuel />
                </Route>
                <Route exact path='/streams'>
                    <Streams />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
