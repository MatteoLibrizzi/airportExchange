import { EventResponse } from './EventResponseInterface'

export interface EventHandler<EventType> {
	handleEvent: (input: EventType) => EventResponse<EventType>
}
