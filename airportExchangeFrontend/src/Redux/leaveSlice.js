import { createSlice } from '@reduxjs/toolkit'


export const leaveSlice = createSlice({
	name: 'leave',
	initialState: {
		title: '',
		description: '',
		location: '',
		signedUrl: '',
		airportId: '',
	},
	reducers: {
		handleButtonClickInTextForm: (state, action) => {
			const { name, description, location, airportId } = action.payload
			state.name = name
			state.description = description
			state.location = location
			state.airportId = airportId
		},
	},
	extraReducers: {},
})

export const { handleButtonClickInTextForm } = leaveSlice.actions

export default leaveSlice.reducer
