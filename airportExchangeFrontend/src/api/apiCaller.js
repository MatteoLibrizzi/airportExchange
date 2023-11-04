import axios from 'axios'
import { API_ENDPOINT } from '../contants'
import { GetSignedUrlMethodEnum } from './getSignedUrl'
export const ApiEventType = {
	GetSignedUrl: 'getSignedUrl',
}

class ApiCaller {
	getSignedUrl = async (objectKey, method, contentLength) => {
		let eventObject
		let event
		switch (method) {
			case GetSignedUrlMethodEnum.PUT:
				eventObject = `{"objectKey": "${objectKey}","method":"${GetSignedUrlMethodEnum.PUT}","contentLength":${contentLength ?? 0}}`
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
		console.log(response)
		const url = response.data.signedUrl

		return url
	}
}

const apiCaller = new ApiCaller()
export default apiCaller
