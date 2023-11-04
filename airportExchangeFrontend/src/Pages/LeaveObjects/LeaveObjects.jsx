import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Footer, Header, LeaveObjectFormImage, LeaveObjectFormText } from '../../Components'
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

	const classes = useStyles()

	const formState =
		window.location.href.split('/')[3] === 'leaveTextForm'
			? 'textForm'
			: 'imageForm'
	console.log(formState)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSingleItem(airportId))
	}, [airportId, dispatch])

	return (
		<>
			<Header />
			{formState === 'textForm' ? (
				<LeaveObjectFormText airportId={airportId} />
			) : (
				<LeaveObjectFormImage />
			)}
			<Footer />
		</>
	)
}

export default LeaveObjects
