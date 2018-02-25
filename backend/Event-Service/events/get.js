'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {

	const queryParams = {
		TableName: 'events',
		KeyConditionExpression: "event_owner = :o",
    ExpressionAttributeValues: {
        ":o":"Pierre"
    }
	}

	dynamoDb.query(queryParams, (err, data) => {
		let response;
		if (err) {
			console.log(err)
			response = {
				statusCode: 200,
				headers: {
					"Access-Control-Allow-Origin" : "*"
				},
				body: JSON.stringify({"message": "Unfortunately there was a database error", "error": error})
			}
			callback(new Error('Failed querying database'), response);
		}
		console.log(data)
		response = {
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