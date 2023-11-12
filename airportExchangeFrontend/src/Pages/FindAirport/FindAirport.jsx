import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, ItemList, ScrollBtn } from '../../Components'
import { setSearchResult } from '../../Redux/getSlice'
import apiCaller from '../../api/apiCaller'

const FindAirport = () => {
	const dispatch = useDispatch()
	const { searchResult } = useSelector((state) => state.get)
	let pending = false


	const handleSearch = async (value) => {
		pending = true
		const response = await apiCaller.getObjectsInAirport(value)
		const searchResult = response.map(res => {
			res.image = res.signedUrl
			return res
		})
		dispatch(setSearchResult({searchResult}))
		pending = false
	}
	// TODO reuse signed url in the single object page, figure out if it's okay with the timing
	return (
		<>
			<Input handleSearch={handleSearch} />
			<ItemList items={searchResult} pending={pending} />
			<ScrollBtn />
		</>
	)
}

export default FindAirport
