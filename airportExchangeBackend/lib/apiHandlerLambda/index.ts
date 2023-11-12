import { EventHandlerGetObjectsInAirport } from './eventHandlers/EventHandlerGetObjectsInAirport'
import { EventHandlerGetSignedUrl } from './eventHandlers/EventHandlerGetSignedUrl'
import { EventHandlerLeaveObject } from './eventHandlers/EventHandlerLeaveObject'
import { EventHandlerPickUpObject } from './eventHandlers/EventHandlerPickUpObject'
import { EventType } from './eventHandlers/EventTypes/Event.interface'
import { getEventObject, getEventType } from './utils'

exports.handler = async function (event: any) {
	let eventHandler
	let response
	let eventObject

	const eventType = getEventType(event)

	eventObject = getEventObject(event)

	switch (eventType) {
		//current TODO write endpoint to pickup object
		case EventType.PickUpObject:
			eventHandler = new EventHandlerPickUpObject()
			break
		case EventType.GetSignedUrl:
			eventHandler = new EventHandlerGetSignedUrl()
			break
		case EventType.LeaveObject:
			eventHandler = new EventHandlerLeaveObject()
			break
		case EventType.GetObjectsInAirport:
			eventHandler = new EventHandlerGetObjectsInAirport()
			break
		default:
			throw new Error('No event handler found')
	}

	if (!eventHandler) {
		throw new Error()
	}
	response = await eventHandler.handleEvent(eventObject)

	if (!response) {
		throw new Error()
	}

	return response
}
