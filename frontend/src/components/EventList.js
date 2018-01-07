import React, { Component } from 'react';
import EventCard from './EventCard.js';

class EventList extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  generateRows(){
  	let data = [['Unicorn Herders Conference', 'A gathering of the brightest minds in mythological husbandry', 'Jan 21'], ['Quantum Wormhole Ice Cream Social', 'Gathering of Friends of the Society for Advanced Physical Systems. No Ultimate Frisbee this time.', 'Feb 20']]
  	let rows = [];

  	data.map((i)=> {
  		rows.push(<EventRow eventName={i[0]} eventDescription={i[1]} eventDate={i[2]}></EventRow>);
  	})
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