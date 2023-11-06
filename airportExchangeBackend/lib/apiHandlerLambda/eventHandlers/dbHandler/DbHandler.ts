import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'

import { DDB_CLIENT, LEFT_OBJECTS_TABLE_NAME, PK_CURRENT_INDEX } from '../../constants'

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
		const getCommand = new GetItemCommand({
			TableName: LEFT_OBJECTS_TABLE_NAME,
			Key: {
				pk: { S: PK_CURRENT_INDEX },
			},
		})
		const response = await DDB_CLIENT.send(getCommand)

		if (!response.Item) {
			const Item = {
				pk: { S: PK_CURRENT_INDEX },
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
		} else {
			return Number(response.Item['value']['N'])
		}
	}

	static incrementCurrentIndex = async () => {
		let nextIndex = ((await this.getCurrentIndex()) ?? 0) + 1

		console.log({ nextIndex })

        const Item = {
            pk: { S: PK_CURRENT_INDEX },
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
