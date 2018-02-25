import React, { Component } from 'react';
import EventCard from './EventCard.js';

class EventList extends Component {
  constructor(props){
    super(props);
    this.state = {
    	events: []
    };
  }

  componentDidMount(){
  	fetch('https://ro5psc7sm7.execute-api.us-east-1.amazonaws.com/dev/events').then( d => {
  		d.json().then(res=>{
  			console.log(res.data.Items)
  			this.setState((prevState, props) => {
  				res.data.Items.map(i => {
  					let date = new Date(i.date);
  					let dateRE = /\w+\s+\d+\s+\d+/;
  					let dateREturn = dateRE.exec(date.toDateString());
  					console.log(dateREturn)
	  				console.log('adding element row', i.name, i.description, i.date)
	  				prevState.events.push([i.name, i.description, dateREturn[0]]);
  				})
				  return {events: prevState.events};
				});
  			console.log(this.state.events)		
  		});
  	})
  }

  generateRows(){
  	let data = [['Unicorn Herders Conference', 'A gathering of the brightest minds in mythological husbandry', 'Jan 21'],
  							['Quantum Wormhole Ice Cream Social', 'Gathering of Friends of the Society for Advanced Physical Systems. No Ultimate Frisbee this time.', 'Feb 20'],
  							['Ubiquitous Presence Roundtable', 'An unconference for teleheads, pundits, and social misfits', 'Oct 22'],
  							['Omnidirectional Antennae Dialectic', 'Twice yearly multi-threaded conversation on the nature of being in a universe that listens.', 'March 4']]
  	let rows = [];

  	data.map((i)=> {
  		rows.push(<EventRow eventName={i[0]} eventDescription={i[1]} eventDate={i[2]}></EventRow>);
  	})
  	this.state.events.map(i => {
  		rows.push(<EventRow eventName={i[0]} eventDescription={i[1]} eventDate={i[2]}></EventRow>)
  	})
  	

  	// 	console.log(JSON.stringify(d.body));
  	
  	return rows;
  	
  }

	render() {
		return (
			<div>
				{this.generateRows()}
			</div>
		)
	}
}



class EventRow extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	componentWillMount(){
		console.log(this.props)
	}

	render(){
		return (
			<EventCard eventName={this.props.eventName} eventDescription={this.props.eventDescription} eventDate={this.props.eventDate} />
			)
	}
}

export default EventList;