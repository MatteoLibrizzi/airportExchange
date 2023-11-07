import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, ItemList, ScrollBtn } from '../../Components'
import { setSearchResult } from '../../Redux/getSlice'
import apiCaller from '../../api/apiCaller'

const FindAirport = () => {
	const dispatch = useDispatch()
	const getObjectsFlag = window.location.href.split('?')[1] === 'get'
	const leaveObjectsFlag = !getObjectsFlag
	const { searchValue, searchResult } = useSelector((state) => state.get)
	let pending = false

	console.log({ searchValue, searchResult })

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

	return (
		<>
			<Input handleSearch={handleSearch} />
			<ItemList items={searchResult} pending={pending} />
			<ScrollBtn />
		</>
	)
}

export default FindAirport
