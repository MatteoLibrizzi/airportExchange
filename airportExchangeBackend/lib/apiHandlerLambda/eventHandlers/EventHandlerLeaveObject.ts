import { Md5 } from 'ts-md5'
import { EventHandler } from './EventHandler.interface'
import { EventLeaveObject } from './EventTypes/EventLeaveObject'
import { EventResponseLeaveObject } from './ResponseTypes/EventResponseLeaveObject'
import { DbHandler } from './dbHandler/DbHandler'
import { SignedUrlGenerator } from './signedUrls/SignedUrlGenerator'
import { isFileSizeTooBig } from './utils'

export class EventHandlerLeaveObject
	implements
		EventHandler<EventLeaveObject, Promise<EventResponseLeaveObject>>
{
	handleEvent = async (input: EventLeaveObject) => {
		console.log(
			`Handling event Leave Object with input ${JSON.stringify(input)}`
		)

		const randomNumber = Math.ceil(Math.random() * 1_000_000)

		const imageS3Key = Md5.hashStr(
			input.name +
				input.description +
				input.location +
				JSON.stringify(randomNumber)
		)

		const dbResponse = DbHandler.leaveObject({
			name: input.name,
			description: input.description,
			location: input.location,
			randomNumber,
			imageS3Key,
		})

		const requiredFileSize = input.imageBytes
		if (!requiredFileSize || isFileSizeTooBig(requiredFileSize)) {
			throw new Error('Did not specify file size or size too big')
		}

		const signedUrl = await SignedUrlGenerator.getSignedUrlPut(
			imageS3Key,
			requiredFileSize
		)

		return {
			signedUrl,
		}
	}
}
