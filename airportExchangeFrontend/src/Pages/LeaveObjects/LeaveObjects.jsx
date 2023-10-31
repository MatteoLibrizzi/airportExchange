import React, { useEffect } from 'react'

import { getCategories, getItems } from '../../Redux/appSlice'
import { Footer, Header, LeaveObjectForm } from '../../Components'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CircularProgress, makeStyles, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
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
	const { pending, items } = useSelector((state) => state.app)

	console.log(airportId)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSingleItem(airportId))
	}, [airportId, dispatch])

	return (
		<>
			<Header />

			<LeaveObjectForm />
			<Footer />
		</>
	)
}

export default LeaveObjects
