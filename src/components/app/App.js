import React from 'react';
import './App.css';
import Header from '../header/Header.js'
import Router from '../../Router.js';
import { Context } from '../../Context.js'

function App() {
  const {getDarkMode} = React.useContext(Context)
  const appearance = getDarkMode ? 'dark' : 'light'
  return (
    <div className='App'>
      <Header/>
      <div className={`App-content ${appearance}`}>
        <Router/>
      </div>
    </div>
  );
}

export default App;
