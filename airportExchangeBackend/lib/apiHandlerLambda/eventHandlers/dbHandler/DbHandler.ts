import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'

import { DDB_CLIENT, LEFT_OBJECTS_TABLE_NAME } from '../../constants'

export interface LeaveObjectDBInput {
	name: string
	description: string
	location: string
	imageS3Key: string
}
export class DbHandler {
	static leaveObject = async ({
		name,
		description,
		location,
		imageS3Key,
	}: LeaveObjectDBInput) => {
		const Item = {
			pk: { S: imageS3Key },
			name: { S: name },
			description: { S: description },
			location: { S: location },
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
		// current index can be stored in the item at pk = '0', if this is not present then it means table is empty and we create the item, and return the value 0
		const getCommand = new GetItemCommand({
			TableName: LEFT_OBJECTS_TABLE_NAME,
			Key: {
				pk: { S: '0' },
			},
		})
		const response = await DDB_CLIENT.send(getCommand)

		if (!response.Item) {
			const Item = {
				pk: { S: '0' },
				value: { N: '0' },
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
		} else {// TODO possibly add cast
            //TODO delete item from ddb otherwise state is inconsistent
			return response.Item['value']['N']
		}
	}

	static incrementCurrentIndex = async () => {
		let nextIndex = (await this.getCurrentIndex()) ?? 0 + 1

		console.log({ nextIndex })

        const Item = {
            pk: { S: '0' },
            value: { N: `${nextIndex}` },
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
