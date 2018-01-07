import React, { Component } from 'react';

class EventList extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  generateRows(){
  	let data = [['my Event', 'Jan 2'], ['Party', 'Feb 20']]
  	let rows = [];
  	data.map((i)=> {
  		rows.push(<EventRow eventName={i[0]} eventDate={i[1]}></EventRow>);
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
			<div>{this.props.eventName} {this.props.eventDate}</div>
			)
	}
}

export default EventList;