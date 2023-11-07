import { EventHandler } from './EventHandler.interface'
import { EventGetObjectsInAirport } from './EventTypes/EventGetObjectsInAirport'
import { EventResponseGetObjectsInAirport } from './ResponseTypes/EventResponseGetObjectsInAirport'
import { DbHandler } from './dbHandler/DbHandler'
import { SignedUrlGenerator } from './signedUrls/SignedUrlGenerator'

export class EventHandlerGetObjectsInAirport
	implements
		EventHandler<
			EventGetObjectsInAirport,
			Promise<EventResponseGetObjectsInAirport>
		>
{
	handleEvent = async (input: EventGetObjectsInAirport) => {
		const airportId = input.airportId

		if (!airportId) {
			return {
				error: 'airportId was not provided',
				objects: []
			}
		}

		const objectsInAirportResult = await DbHandler.getObjectsInAirport(
			airportId
		)

		const objects = await Promise.all(
			objectsInAirportResult.map(async (result) => {
				let signedUrl = ''
				try {
					if (!result['imageS3Key'] || !result['imageS3Key'].S) {
						throw new Error()
					}
					signedUrl = await SignedUrlGenerator.getSignedUrlGet(
						result['imageS3Key'].S
					)
				} catch (e) {
					signedUrl = ''
				}

				try {
					return {
						name: result.name.S!,
						description: result.description.S!,
						location: result.location.S!,
						airportId: result.airportId.S!,
						signedUrl,
					}
				} catch (e) {
					return {
						name: '',
						description: '',
						location: '',
						airportId: '',
					}
				}
			})
		)

		return {
			objects,
		}
	}
}
