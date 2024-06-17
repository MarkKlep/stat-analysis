import React from 'react';
import NavBar from './components/NavBar';
import Router from './providers/Router';
import './App.css';

function App() {

  return(
    <div className='App'>
      
      <NavBar/>
      <Router/>

    </div>
  );
}

export default App;