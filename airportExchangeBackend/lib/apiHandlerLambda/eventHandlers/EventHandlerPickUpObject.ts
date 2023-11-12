import { EventHandler } from './EventHandler.interface'
import { EventPickUpObject } from './EventTypes/EventPickUpObject'
import { EventResponsePickUpObject } from './ResponseTypes/EventResponsePickUpObject'
import { DbHandler } from './dbHandler/DbHandler'

export class EventHandlerPickUpObject
	implements
		EventHandler<EventPickUpObject, Promise<EventResponsePickUpObject>>
{
	handleEvent = async (input: EventPickUpObject) => {
		console.log({ input })

        let response
		try {
			response = await DbHandler.pickUpObject(
				input.imageS3Key,
				input.airportId
			)
		} catch (e) {
            console.error(e)
			return { successful: false }
		}
		return response
	}
}
