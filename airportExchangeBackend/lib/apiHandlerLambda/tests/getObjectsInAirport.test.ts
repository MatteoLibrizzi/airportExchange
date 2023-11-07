import { EventHandlerGetObjectsInAirport } from '../eventHandlers/EventHandlerGetObjectsInAirport'
import { DbHandler } from '../eventHandlers/dbHandler/DbHandler'
import {
    getObjectsInAirportEvent,
    getObjectsInAirportEventWithoutAirportId,
} from './resources/getObjectsInAirportEvent'
import { expectedAirportId } from './resources/leaveObjectEvent'

test('DbHandler is called with correct parametres', async () => {
	const eventHandler = new EventHandlerGetObjectsInAirport()

	jest.spyOn(DbHandler, 'getObjectsInAirport').mockImplementation(
		async () => []
	)

	await eventHandler.handleEvent(getObjectsInAirportEvent)

	expect(DbHandler.getObjectsInAirport).toHaveBeenCalledWith(
		expectedAirportId
	)
})

test('Should throw if airportId is not provided', async () => {
	const eventHandler = new EventHandlerGetObjectsInAirport()

	jest.spyOn(DbHandler, 'getObjectsInAirport').mockImplementation(
		async () => []
	)

	const result = await eventHandler.handleEvent(
		getObjectsInAirportEventWithoutAirportId
	)

	expect(result).toEqual({ error: 'airportId was not provided', objects: [] })
})
