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

		const requiredFileSize = input.imageBytes
		if (!requiredFileSize || isFileSizeTooBig(requiredFileSize)) {
			throw new Error('Did not specify file size or size too big')
		}

		const currentIndex = DbHandler.getCurrentIndex()
		DbHandler.incrementCurrentIndex()

		const imageS3Key = input.name + JSON.stringify(currentIndex)

		const dbResponse = DbHandler.leaveObject({
			name: input.name,
			description: input.description,
			location: input.location,
			imageS3Key,
		})

		const signedUrl = await SignedUrlGenerator.getSignedUrlPut(
			imageS3Key,
			requiredFileSize
		)

		return {
			signedUrl,
		}
	}
}
