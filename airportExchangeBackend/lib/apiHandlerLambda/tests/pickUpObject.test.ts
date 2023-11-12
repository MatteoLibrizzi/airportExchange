import { EventHandlerPickUpObject } from '../eventHandlers/EventHandlerPickUpObject'
import { DbHandler } from '../eventHandlers/dbHandler/DbHandler'
import { expectedAirportId, expectedImageS3Key, pickUpObjectEvent } from './resources/pickUpObjectEvent'

test('Pick up object returns correct response', async () => {
	const eventHandler = new EventHandlerPickUpObject()

	jest.spyOn(DbHandler, 'pickUpObject').mockImplementation(
		async (imageS3Key: string, airportId: string) => ({ successful: true })
	)

	const response = await eventHandler.handleEvent(pickUpObjectEvent)

	expect(response).toEqual({ successful: true })
})

test('DDB api handler is called with the correct input', async () => {
    const eventHandler = new EventHandlerPickUpObject()

	jest.spyOn(DbHandler, 'pickUpObject').mockImplementation(
		async (imageS3Key: string, airportId: string) => ({ successful: true })
	)

	const response = await eventHandler.handleEvent(pickUpObjectEvent)

	expect(DbHandler.pickUpObject).toHaveBeenCalledWith(expectedImageS3Key, expectedAirportId)
})
