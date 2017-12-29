'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
	const timestamp = new Date().getTime();
	console.log(event.body);
	const data = JSON.parse(event.body);

	// validations
	
	if (typeof data.Item.name !== 'string' || typeof data.Item.description !== 'string' ||
		typeof data.Item.date !== 'number' || typeof data.Item.owner !== 'string') {
		console.error('Validation Failed - wrong type for submitted data');
		callback(new Error('Invalid data type'));
		return; 
	}

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

	dynamoDb.put(params, (error, result) => {
		if (error) {
			console.error(error);
			callback(new Error('Couldn\'t create the event'));
			return;
		}

		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Item)
		}
		callback(null, response);
	})
}