import { EventObject } from './EventTypes/Event.interface'
import { EventResponse } from './ResponseTypes/EventResponse.interface'

export interface EventHandler<T extends EventObject, E extends EventResponse> {
	handleEvent: (input: T) => E
}
