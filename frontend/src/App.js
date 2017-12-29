import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NewEvent name="sheamus" />
      </div>
    );
  }
}

class NewEvent extends Component {

  comp = <div className="new-event-form">
        <label>Name:</label>
        <input name="event-name" value="What is your event called?"></input>
        <label>Description:</label>
        <textarea type="text" name="event-description" maxlength="256"></textarea>
        <label>Date:</label>
        <input type="date" name="event-date"></input>
        <button name="new-event-button" onClick={this.createEvent}>Create Event</button>
      </div>
  
  createEvent(e){
    alert('making event');
    let headers = new Headers();
    headers.append("content-type", "application/json");
    fetch('https://6fdx529m30.execute-api.us-east-1.amazonaws.com/dev/event', {
      method:"GET",
      //mode: "cors",
      headers: headers
      // body: JSON.stringify({'operation': 'create',
      //         'tableName': 'Events',
      //         'payload': {
      //           'Item': {
      //             "ID": "asudiadasd",
      //             "Owner": "mucinex",
      //             "Name": "A conference"
      //           }
      //         }
      //       })
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  }

  render() {
    
    return this.comp;
  }
}


export default App;
