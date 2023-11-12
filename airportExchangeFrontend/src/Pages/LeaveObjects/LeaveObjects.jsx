import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	Footer,
	Header,
	LeaveObjectFormComplete,
	LeaveObjectFormImage,
	LeaveObjectFormText,
} from '../../Components'
import { getSingleItem } from '../../Redux/appSlice'

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
		padding: theme.spacing(10),
	},
}))

const LeaveObjects = () => {
	const { airportId } = useParams()

	const formState =
		window.location.href.split('/')[3] === 'leaveTextForm'
			? 'textForm'
			: window.location.href.split('/')[3] === 'leaveImageForm'
			? 'imageForm'
			: 'completionForm'

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSingleItem(airportId))
	}, [airportId, dispatch])

	return (
		<>
			<Header />
			{formState === 'textForm' ? (
				<LeaveObjectFormText />
			) : formState === 'imageForm' ? (
				<LeaveObjectFormImage />
			) : (
				<LeaveObjectFormComplete />
			)}
			<Footer />
		</>
	)
}

export default LeaveObjects
