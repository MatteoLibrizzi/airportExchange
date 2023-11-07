import { EventHandler } from './EventHandler.interface'
import { EventGetObjectsInAirport } from './EventTypes/EventGetObjectsInAirport'
import { EventResponseGetObjectsInAirport } from './ResponseTypes/EventResponseGetObjectsInAirport'

export class EventHandlerGetObjectsInAirport
	implements
		EventHandler<EventGetObjectsInAirport, Promise<EventResponseGetObjectsInAirport>>
{
	handleEvent = async (input: EventGetObjectsInAirport) => {
        const airportId = input.airportId


        return {}
	}
}
