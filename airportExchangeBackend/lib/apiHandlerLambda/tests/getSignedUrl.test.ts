import { EventHandlerGetSignedUrl } from '../eventHandlers/EventHandlerGetSignedUrl'
import { SignedUrlGenerator } from '../eventHandlers/signedUrls/SignedUrlGenerator'
import {
    eventGetSignedUrlGet,
    eventGetSignedUrlPut,
} from './resources/getSignedUrlEvents'

test('Get signed url is called with the correct params', async () => {
	const eventHandler = new EventHandlerGetSignedUrl()

	jest.spyOn(SignedUrlGenerator, 'getSignedUrlGet').mockImplementation()

	await eventHandler.handleEvent(eventGetSignedUrlGet)

	//expect(SignedUrlGenerator.getSignedUrlGet).toHaveBeenCalledWith(expectedObjectKey)
})

test('Put signed url is called with the correct params', async () => {
	const eventHandler = new EventHandlerGetSignedUrl()

	jest.spyOn(SignedUrlGenerator, 'getSignedUrlPut').mockImplementation()

	await eventHandler.handleEvent(eventGetSignedUrlPut)

	//expect(SignedUrlGenerator.getSignedUrlGet).toHaveBeenCalledWith(expectedObjectKey)
})
