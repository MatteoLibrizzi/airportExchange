import { createSlice } from '@reduxjs/toolkit'

export const getSlice = createSlice({
	name: 'get',
	initialState: {
		searchValue: '',
		searchResult: [],
		itemsByKey: {},
	},
	reducers: {
		setSearchValueGlobal: (state, action) => {
			const { searchValue } = action.payload
			state.searchValue = searchValue
		},
		setSearchResult: (state, action) => {
			const { searchResult } = action.payload
			state.searchResult = searchResult
			state.searchResult.forEach(item => {
				state.itemsByKey[item.key] = item
			})
		},
	},
	extraReducers: {},
})

export const { setSearchValueGlobal, setSearchResult, setImagesByKey } = getSlice.actions

export default getSlice.reducer
