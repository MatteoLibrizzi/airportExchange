import { EventResponse } from './EventResponse.interface'

export interface EventHandler<EventType> {
	handleEvent: (input: EventType) => EventResponse<EventType>
}
