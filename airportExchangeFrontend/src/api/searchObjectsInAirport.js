import apiCaller from './apiCaller'

export const searchObjectsInAirport = async (value) => {
	const response = await apiCaller.getObjectsInAirport(value)
	const searchResult = response.map((res) => {
		res.image = res.signedUrl
		return res
	})
	return { searchResult }
}
