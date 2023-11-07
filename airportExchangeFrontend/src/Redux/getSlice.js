import { createSlice } from '@reduxjs/toolkit'

export const getSlice = createSlice({
	name: 'get',
	initialState: {
		searchValue: '',
		searchResult: [],
	},
	reducers: {
		setSearchValueGlobal: (state, action) => {
			const { searchValue } = action.payload
			state.searchValue = searchValue
		},
		setSearchResult: (state, action) => {
			const { searchResult } = action.payload
			state.searchResult = searchResult
		},
	},
	extraReducers: {},
})

export const { setSearchValueGlobal, setSearchResult } = getSlice.actions

export default getSlice.reducer
