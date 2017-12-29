'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
	const timestamp = new Date().getTime();
	console.log(event.body);
	const data = JSON.parse(event.body);

	if (typeof data.text !== 'string') {
		console.error('Validation Failed');
		callback(new Error('Couldn\'t create the event'));
		return; 
	}
	const params = {
		TableName: 'events',
		Item: {
			id: uuid.v1(),
			text: data.text,
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
			body: JSON.stringify(result).my = 'hllo'
		}
		callback(null, response);
	})
}