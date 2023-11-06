import React, { useEffect } from 'react'

import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	Footer,
	Header,
	ItemList,
} from '../../Components'
import { getCategories, getItems } from '../../Redux/appSlice'

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

const GetObjects = () => {
	const { airportId } = useParams()

	const classes = useStyles()
	const { pending, items } = useSelector((state) => state.app)


	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCategories())
		dispatch(getItems())
	}, [dispatch])
	return (
		<>
			<Header />
			{!pending ? (
				<ItemList items={items} pending={pending} />
			) : (
				<Grid className={classes.container} container>
					<CircularProgress size='5rem' />
				</Grid>
			)}
			<Footer />
		</>
	)
}

export default GetObjects
