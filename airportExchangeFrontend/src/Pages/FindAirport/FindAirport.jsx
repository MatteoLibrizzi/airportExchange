import React, { useEffect, useState } from 'react'
import { Input, ItemList, Categories, ScrollBtn } from '../../Components'
import { useDispatch } from 'react-redux'
import { getCategories, getItems } from '../../Redux/appSlice'
import { useSelector } from 'react-redux'

const FindAirport = () => {
	const dispatch = useDispatch()
	const getObjectsFlag = window.location.href.split('?')[1] === 'get'
	const leaveObjectsFlag = !getObjectsFlag
	const { pending, items } = useSelector((state) => state.app)

	useEffect(() => {
		dispatch(getCategories())
		dispatch(getItems())
	}, [dispatch])

	return (
		<>
			<Input />
			<ItemList items={items} pending={pending}/>
			<ScrollBtn />
		</>
	)
}

export default FindAirport
