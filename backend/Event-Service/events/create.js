'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
// const moment = require('moment');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
	const timestamp = new Date().getTime();
	console.log(typeof event);
	console.log(event);
	const data = (typeof event.body == 'string') ? JSON.parse(event.body) : event.body; // actual requests from API gateway come in as strings -- tests from the lambda dashboard come in as objects. This prevents an error if you use either.

	// validations
	


	if (typeof data.Item.name !== 'string' || typeof data.Item.description !== 'string' ||
		typeof data.Item.date !== 'string' || typeof data.Item.owner !== 'string') {
		console.error('Server-side validation failed - wrong type for submitted data');
		callback(new Error('Invalid data type'));
		return; 
	}

		// // if (data.Item.date && data.Item.date_isAMomentObject) {
		// data.Item.date = moment(data.Item.date);
		// // }
		// console.log(typeof data.Item.date);


	const params = {
		TableName: 'events',
		Item: {
			id: uuid.v1(),
			name: data.Item.name,
			description: data.Item.description,
			date: data.Item.date,
			owner: data.Item.owner,
			checked: false,
			createdAt: timestamp,
			updatedAt: timestamp
		}
	}

	dynamoDb.put(params, (error, data) => {
		if (error) {
			console.error(error);
			callback(new Error('Couldn\'t create the event'));
			return;
		}
		console.log(data);

		const response = {
			statusCode: 200,
			 headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
        //"Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
			body: JSON.stringify({'message': 'You did it!', 'data': data})
		}
		callback(null, response);
	})
}