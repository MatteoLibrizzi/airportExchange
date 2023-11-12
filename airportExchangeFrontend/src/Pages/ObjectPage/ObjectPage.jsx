import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSearchResult, setSearchValueGlobal } from '../../Redux/getSlice'
import { searchObjectsInAirport } from '../../api/searchObjectsInAirport'
import Object from '../Object/Object'

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

const SingleObjectPage = () => {
	const { airportId, key } = useParams()
	const { itemsByKey } = useSelector((state) => state.get)

	const [pending, setPending] = useState(true)

	const classes = useStyles()

	const dispatch = useDispatch()

	useEffect(async () => {
		setPending(true)
		if (!itemsByKey[key]) {
			const { searchResult } = await searchObjectsInAirport(airportId)

			dispatch(setSearchResult({ searchResult }))
			dispatch(setSearchValueGlobal({ searchValue: airportId }))
		}
		setPending(false)
	})
	return (
		<>
			{!pending ? (
				<Object item={itemsByKey[key]} />
			) : (
				<Grid className={classes.container} container>
					<CircularProgress size='5rem' />
				</Grid>
			)}
		</>
	)
}

export default SingleObjectPage
