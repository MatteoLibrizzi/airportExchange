import { EventHandlerGetSignedUrl } from './eventHandlers/EventHandlerGetSignedUrl'
import { EventHandlerLeaveObject } from './eventHandlers/EventHandlerLeaveObject'
import { EventType } from './eventHandlers/EventTypes/Event.interface'
import { getEventObject, getEventType } from './utils'

exports.handler = async function (event: any) {
	let eventHandler
	let response
	let eventObject
	try {
		const eventType = getEventType(event)

		eventObject = getEventObject(event)

		switch (eventType) {
			case EventType.GetSignedUrl:
				eventHandler = new EventHandlerGetSignedUrl()
				break
			case EventType.LeaveObject:
				eventHandler = new EventHandlerLeaveObject()
				break
			default:
				throw new Error('No event handler found')
		}
	} catch (e) {
		console.error('Error during parsing of the event', e)
	}

	try {
		if (!eventHandler) {
			throw new Error()
		}
		response = await eventHandler.handleEvent(eventObject)

		if (!response) {
			throw new Error()
		}
	} catch (e) {
		console.error('Error during the handling of the event', e)
	}

	return response
}
