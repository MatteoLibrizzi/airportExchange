import { EventHandler } from './EventHandler.interface'
import {
	EventGetUploadSignedUrl as EventGetSignedUrl,
	SignedURLMethod,
} from './EventTypes/EventGetSingedUrl'
import { EventResponseGetSignedUrl } from './ResponseTypes/EventResponseGetSignedUrl'
import { SignedUrlGenerator } from './signedUrls/SignedUrlGenerator'
import { isFileSizeTooBig } from './utils'

export class EventHandlerGetSignedUrl
	implements
		EventHandler<EventGetSignedUrl, Promise<EventResponseGetSignedUrl>>
{
	handleEvent = async (input: EventGetSignedUrl) => {
		console.log(
			`Handling event GetSignedUrl with input ${JSON.stringify(input)}`
		)
		let url = ''
		switch (input.method) {
			case SignedURLMethod.GET:
				url = await SignedUrlGenerator.getSignedUrlGet(input.objectKey)
				break
			case SignedURLMethod.PUT:
				const requiredFileSize = input.contentLength
				if (!requiredFileSize || isFileSizeTooBig(requiredFileSize)) {
					throw new Error('Did not specify file size')
				}
				url = await SignedUrlGenerator.getSignedUrlPut(
					input.objectKey,
					requiredFileSize!
				)
				break
			default:
				url = ''
				throw new Error('Could not find the method provided')
		}

		const response: EventResponseGetSignedUrl = { signedUrl: url }

		return response
	}
}
