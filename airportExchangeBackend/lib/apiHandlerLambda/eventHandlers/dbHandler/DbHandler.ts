import { GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'

import {
	DDB_CLIENT,
	LEFT_OBJECTS_TABLE_NAME,
	PK_CURRENT_INDEX,
	SK_CURRENT_INDEX,
} from '../../constants'

export interface LeaveObjectDBInput {
	name: string
	description: string
	location: string
	airportId: string
	imageS3Key: string
}
export class DbHandler {
	static getObjectsInAirport = async (airportId: string) => {
		const ExpressionAttributeValues = {
			':v1': {
				S: airportId
			}
		}
		const KeyConditionExpression = `airportId = :v1`
		const queryCommand = new QueryCommand({
			TableName: LEFT_OBJECTS_TABLE_NAME,
			KeyConditionExpression,
			ExpressionAttributeValues,
		})

		const response = await DDB_CLIENT.send(queryCommand)

		if (!response.Items) {
			return []
		}

		return response.Items
	}

	static leaveObject = async ({
		name,
		description,
		location,
		airportId,
		imageS3Key,
	}: LeaveObjectDBInput) => {
		const Item = {
			name: { S: name },
			description: { S: description },
			location: { S: location },
			airportId: { S: airportId },
			imageS3Key: { S: imageS3Key },
		}
		const putCommand = new PutItemCommand({
			TableName: LEFT_OBJECTS_TABLE_NAME,
			Item,
		})

		const response = await DDB_CLIENT.send(putCommand)

		if (response.$metadata.httpStatusCode !== 200) {
			throw new Error('Write to db was not successful')
		}
	}

	static getCurrentIndex = async () => {
		const getCommand = new GetItemCommand({
			TableName: LEFT_OBJECTS_TABLE_NAME,
			Key: {
				imageS3Key: { S: SK_CURRENT_INDEX },
				airportId: { S: PK_CURRENT_INDEX },
			},
		})
		const response = await DDB_CLIENT.send(getCommand)

		if (!response.Item) {
			const Item = {
				imageS3Key: { S: SK_CURRENT_INDEX },
				value: { N: '0' },
				airportId: { S: PK_CURRENT_INDEX },
			}
			const putCommand = new PutItemCommand({
				TableName: LEFT_OBJECTS_TABLE_NAME,
				Item,
			})

			const response = await DDB_CLIENT.send(putCommand)

			if (response.$metadata.httpStatusCode !== 200) {
				throw new Error('Write to db was not successful')
			}

			return 0
		} else {
			return Number(response.Item['value']['N'])
		}
	}

	static incrementCurrentIndex = async () => {
		let nextIndex = ((await this.getCurrentIndex()) ?? 0) + 1

		console.log({ nextIndex })

		const Item = {
			imageS3Key: { S: SK_CURRENT_INDEX },
			value: { N: `${nextIndex}` },
			airportId: { S: PK_CURRENT_INDEX },
		}
		const putCommand = new PutItemCommand({
			TableName: LEFT_OBJECTS_TABLE_NAME,
			Item,
		})

		const response = await DDB_CLIENT.send(putCommand)

		if (response.$metadata.httpStatusCode !== 200) {
			throw new Error('Write to db was not successful')
		}
	}
}
