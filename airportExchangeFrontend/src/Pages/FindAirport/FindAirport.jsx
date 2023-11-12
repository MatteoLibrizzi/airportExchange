import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, ItemList, ScrollBtn } from '../../Components'
import { setSearchResult } from '../../Redux/getSlice'
import { searchObjectsInAirport } from '../../api/searchObjectsInAirport'

const FindAirport = () => {
	const dispatch = useDispatch()
	const { searchResult } = useSelector((state) => state.get)
	let pending = false

	const handleSearch = async (value) => {
		pending = true
		const { searchResult } = await searchObjectsInAirport(value)

		dispatch(setSearchResult({ searchResult }))
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
