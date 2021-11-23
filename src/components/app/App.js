import React from 'react';
import './App.css';
import Header from '../header/Header.js'
import Router from '../../Router.js';

function App() {
  const [getDarkMode, setDarkMode] = React.useState(true)
  const props = {
      darkModeState: [getDarkMode, setDarkMode]
  }
  const appearance = getDarkMode ? 'dark' : 'light'
  return (
    <>
      <Header props={props}/>
      <div className={`App-content ${appearance}`}>
        <Router props={props}/>
      </div>
    </>
  );
}

export default App;
