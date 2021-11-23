import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/home/Home.js'
import Fuel from './components/fuel/Fuel.js'

export default function Content({props}) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Home props={props} />
                </Route>
                <Route exact path='/fuel'>
                    <Fuel props={props} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
