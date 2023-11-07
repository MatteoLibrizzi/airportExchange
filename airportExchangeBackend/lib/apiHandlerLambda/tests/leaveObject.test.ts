import { EventHandlerLeaveObject } from '../eventHandlers/EventHandlerLeaveObject'
import { DbHandler } from '../eventHandlers/dbHandler/DbHandler'
import { SignedUrlGenerator } from '../eventHandlers/signedUrls/SignedUrlGenerator'
import {
    expectedDescription,
    expectedLocation,
    expectedName,
    leaveObjectEvent,
    leaveObjectEventWithBigImage,
} from './resources/leaveObjectEvent'

test('Leave object event handler receives the correct parametres', async () => {
	const eventHandler = new EventHandlerLeaveObject()

	jest.spyOn(DbHandler, 'getCurrentIndex').mockImplementation(async () => 0)
	jest.spyOn(DbHandler, 'incrementCurrentIndex').mockImplementation()
	jest.spyOn(DbHandler, 'leaveObject').mockImplementation()
	jest.spyOn(SignedUrlGenerator, 'getSignedUrlPut').mockImplementation()

	await eventHandler.handleEvent(leaveObjectEvent)

	expect(DbHandler.leaveObject).toHaveBeenCalledWith(
		expect.objectContaining({
			name: expectedName,
			description: expectedDescription,
			location: expectedLocation,
			imageS3Key: expectedName + '0',
		})
	)
})

test('If file is too big an error is thrown', async () => {
	const eventHandler = new EventHandlerLeaveObject()

	jest.spyOn(DbHandler, 'getCurrentIndex').mockImplementation()
	jest.spyOn(DbHandler, 'incrementCurrentIndex').mockImplementation()
	jest.spyOn(DbHandler, 'leaveObject').mockImplementation()
	jest.spyOn(SignedUrlGenerator, 'getSignedUrlPut').mockImplementation()

	let hasThrown = false
	try {
		await eventHandler.handleEvent(leaveObjectEventWithBigImage)
	} catch (e) {
		hasThrown = true
	}
	expect(hasThrown).toEqual(true)
})
