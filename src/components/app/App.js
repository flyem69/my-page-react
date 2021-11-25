import React from 'react';
import './App.css';
import Header from '../header/Header.js'
import Router from '../../Router.js';
import { Context } from '../../Context.js'

function App() {
  const {getDarkMode} = React.useContext(Context)
  const appearance = getDarkMode ? 'dark' : 'light'
  return (
    <>
      <Header/>
      <div className={`App-content ${appearance}`}>
        <Router/>
      </div>
    </>
  );
}

export default App;
