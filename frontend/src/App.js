import React, { Component } from 'react';
import './App.css';
import NewEvent from './components/NewEvent.js';
import EventList from './components/EventList.js';

import { BrowserRouter as Router, Route } from 'react-router-dom'


// eventually move these service consts to Lambda Environment variables
// that load into the js before html gets sent to the browser

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={NewEvent}/>
          <Route path="/list" component={EventList}/>
        </div>
      </Router>
    );
  }
}


export default App;
