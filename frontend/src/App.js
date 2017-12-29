import React, { Component } from 'react';
import './App.css';
import NewEvent from './components/NewEvent.js';


// eventually move these service consts to Lambda Environment variables
// that load into the js before html gets sent to the browser

class App extends Component {
  render() {
    return (
      <div className="App">
        <NewEvent name="sheamus" />
      </div>
    );
  }
}


export default App;
