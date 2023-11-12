import { EventResponse } from './EventResponse.interface'

export interface EventResponseGetObjectsInAirport extends EventResponse {
	objects: Array<{
		name: string
		description: string
		location: string
		airportId: string
		pickedUp: boolean
		signedUrl?: string
	}>
}
