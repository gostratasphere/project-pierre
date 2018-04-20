import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.js';
import NewEvent from './components/Event/NewEvent.js';
import EventList from './components/Event/EventList.js';
import EventCard from './components/Event/EventCard.js';
import NavBar from './components/gNavBar.js';
import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Login}/>
          <Route exact path="/new-event" component={NewEvent}/>
          <Route path="/events" component={EventList}/>
          <Route path="/event/:id" component={EventCard}/>
        </div>
      </Router>
    );
  }
}



export default App;
