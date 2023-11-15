import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getUserLocation = createAsyncThunk(
	'leave/getUserLocation',
	async () => {
		
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log({ position })
				userLat = position.coords.latitude
				userLng = position.coords.longitude
			},
			(err) => {
				console.log({ err })
			}
		)
	}
)

export const leaveSlice = createSlice({
	name: 'leave',
	initialState: {
		title: '',
		description: '',
		location: '',
		signedUrl: '',
		airportId: '',
		locationLat: 0.0,
		locationLng: 0.0,
	},
	reducers: {
		handleButtonClickInTextForm: (state, action) => {
			const { name, description, location, airportId } = action.payload
			state.name = name
			state.description = description
			state.location = location
			state.airportId = airportId
		},
		setLocation: (state, action) => {
			console.log('dispatched')
			const { locationLat, locationLng } = action.payload
			state.locationLat = locationLat
			state.locationLng = locationLng
		},
	},
	extraReducers(builder) {
		builder.addCase(getUserLocation.fulfilled, (state, action) => {
			return action.payload
		})
	},
})

export const { handleButtonClickInTextForm, setLocation } = leaveSlice.actions

export default leaveSlice.reducer
