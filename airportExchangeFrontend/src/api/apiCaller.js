import axios from 'axios'
import { API_ENDPOINT } from '../contants'
import { GetSignedUrlMethodEnum } from './getSignedUrl'
export const ApiEventType = {
	GetSignedUrl: 'getSignedUrl',
	LeaveObject: 'leaveObject',
	GetObjectsInAirport: 'getObjectsInAirport',
	PickUpObject: 'pickUpObject',
}

class ApiCaller {
	pickUpObject = async (imageS3Key, airportId) => {
		const eventObject = `{"airportId":"${airportId}","imageS3Key":"${imageS3Key}"}`
		const event = {
			eventType: ApiEventType.PickUpObject,
			eventObject
		}
		const response = await axios.post(API_ENDPOINT, event, {
			headers: { 'Content-Type': 'application/json' },
		})
		if (!response.data || !response.data.successful) {
			throw new Error('Something went wrong')
		}

		return response.data
	}

	getObjectsInAirport = async (airportId) => {
		const eventObject = `{"airportId":"${airportId}"}`
		const event = {
			eventType: ApiEventType.GetObjectsInAirport,
			eventObject
		}


		const response = await axios.post(API_ENDPOINT, event, {
			headers: { 'Content-Type': 'application/json' },
		})
		if (!response.data || !response.data.objects) {
			throw new Error('Something went wrong')
		}

		return response.data.objects
	}

	leaveObject = async (name, description, location, airportId, imageBytes) => {
		const eventObject = `{"name": "${name}","description": "${description}","location": "${location}","imageBytes": ${imageBytes},"airportId":"${airportId}"}`
		const event = {
			eventType: ApiEventType.LeaveObject,
			eventObject
		}
		const response = await axios.post(API_ENDPOINT, event, {
			headers: { 'Content-Type': 'application/json' },
		})
		if (!response.data || !response.data.signedUrl) {
			throw new Error('Something went wrong')
		}
		const url = response.data.signedUrl

		return url
	}

	getSignedUrl = async (objectKey, method, contentLength) => {
		let eventObject
		let event
		switch (method) {
			case GetSignedUrlMethodEnum.PUT:
				eventObject = `{"objectKey": "${objectKey}","method":"${
					GetSignedUrlMethodEnum.PUT
				}","contentLength":${contentLength ?? 0}}`
				event = {
					eventType: ApiEventType.GetSignedUrl,
					eventObject,
				}
				break
			case GetSignedUrlMethodEnum.GET:
				eventObject = `{"objectKey": "${objectKey}","method":"${GetSignedUrlMethodEnum.GET}"}`
				event = {
					eventType: ApiEventType.GetSignedUrl,
					eventObject,
				}
				break
			default:
				break
		}

		const response = await axios.post(API_ENDPOINT, event, {
			headers: { 'Content-Type': 'application/json' },
		})
		const url = response.data.signedUrl

		return url
	}
}

const apiCaller = new ApiCaller()
export default apiCaller
