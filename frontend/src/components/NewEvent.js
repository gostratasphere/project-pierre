
import React, { Component } from 'react';

const EVENT_SERVICE = 'https://twmzjfszkj.execute-api.us-east-1.amazonaws.com/dev/events';

class NewEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    this.setState({value: "green"});

  }

  handleChange(event) {
    console.log(event);
    this.setState({value: event.target.value});
  }
  
  createEvent(e){
    alert('making event');
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(EVENT_SERVICE, {
      method:"POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({
              'tableName': 'events',  
              'Item': {
                "owner": "sburns@gds.org", //this will come from the login -- should be uuid of user
                "name": "asdasde",
                "description": "asdasd",
                "date": new Date("jan 2, 2018").getTime()
              }
            })
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  }

  render() {
    return (<div className="new-event-form">
        <label>Name:</label>
        <input name="event-name" value={this.state.value} onChange={this.handleChange}></input>
        <label>Description:</label>
        <textarea type="text" name="event-description" maxLength="256"></textarea>
        <label>Date:</label>
        <input type="date" name="event-date"></input>
        <button name="new-event-button" onClick={this.createEvent}>Create Event</button>
      </div>)
  }
}

export default NewEvent;