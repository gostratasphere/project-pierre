
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './NewEvent.css';
import { Form, Segment, Grid } from 'semantic-ui-react';


// eventually move these service consts to Lambda Environment variables
// that load into the js before html gets sent to the browser
const EVENT_SERVICE = 'https://ro5psc7sm7.execute-api.us-east-1.amazonaws.com/dev/events';
const OWNER = 'Pierre';

class NewEvent extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  componentWillMount(){
    this.setState({
      name: '',
      owner: OWNER,
      description: '',
      date: moment()
    });

  }

  handleChange(event) {
    console.log(event);
    if (event.target) {
      if (event.target.name === 'event-name') {
        this.setState({name: event.target.value});
      } else if (event.target.name === 'event-description') {
        this.setState({description: event.target.value});
      }  
    } else if (event._isAMomentObject) {
      this.setState({date:event});
    }
    
  }

  componentDidUpdate(){
    console.log(this.state);
  }

  validateFormEntry(obj) {
    for (let i of Object.entries(obj)){
      if (i[1] === null || i[1] === '') {
        console.log(i);
        return false;
      }
    }
    return true;
  }

  createEvent(e){
    if (this.validateFormEntry({owner: this.state.owner, name:this.state.name, description:this.state.description, date:this.state.date})) { 
      console.log('making event');
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      fetch(EVENT_SERVICE, {
        method:"POST",
        mode: "cors",
        headers: headers,
        body: JSON.stringify({
                'tableName': 'events',  
                'Item': {
                  "owner": this.state.owner, //this will come from the login -- should be uuid of user
                  "name": this.state.name,
                  "description": this.state.description,
                  "date": this.state.date
                }
              })
      }).then(res => {
        if (res.ok) {
          res.json().then(json => {
            console.log(json);
          });
        }
        // should redirect to list of events? 
        this.setState({name: '', owner: '', description: '', date: null})
      }).catch(err => {
        console.error(err);
      })
    } else {
      // add UI validation errors
      console.error('must submit all fields');
    }
  }

  render() {
    return (
      <Grid centered>
        <Segment basic>
          <Form className="new-event-form">
            <Form.Input label="Name" name="event-name" value={this.state.name} onChange={this.handleChange}></Form.Input>
            <Form.TextArea label="Description" type="text" name="event-description" value={this.state.description} maxLength="256" onChange={this.handleChange}></Form.TextArea>
            <DatePicker label="Date" className='dpicker' selected={this.state.date} onChange={this.handleChange} />
            <Form.Button className="new-event-button" name="new-event-button" onClick={this.createEvent}>Create Event</Form.Button>
          </Form>
        </Segment>
      </Grid>
    )
  }
}

export default NewEvent;