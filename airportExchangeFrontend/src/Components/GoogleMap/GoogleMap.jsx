import React, { useEffect, useState } from 'react'
import {
    GoogleMap,
    Marker,
    withGoogleMap,
    withScriptjs,
} from 'react-google-maps'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation } from '../../Redux/leaveSlice'
const Map = withScriptjs(
	withGoogleMap((props) => {
		const { locationLat, locationLng } = useSelector((state) => state.leave)
		const dispatch = useDispatch()

        const userLat = props.userLat
        const userLng = props.userLng
        console.log({props})

		const [lat, setLat] = useState(userLat)
		const [lng, setLng] = useState(userLng)
		useEffect(() => {
			
		})
		console.log({ lat, lng })
		return (
			<GoogleMap
				onClick={(event) => {
					setLat(event.latLng.lat())
					setLng(event.latLng.lng())
					dispatch(
						setLocation({
							locationLat: event.latLng.lat(),
							locationLng: event.latLng.lng(),
						})
					)
				}}
				defaultZoom={14}
				defaultCenter={{ lat, lng }}>
				{props.isMarkerShown && <Marker position={{ lat, lng }} />}
			</GoogleMap>
		)
	})
)
export default Map
