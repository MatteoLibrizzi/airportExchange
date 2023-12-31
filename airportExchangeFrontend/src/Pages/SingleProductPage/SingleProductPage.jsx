import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SingleProduct } from '../../Components'
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

const SingleProductPage = () => {
	const { id } = useParams()
	const { pending } = useSelector((state) => state.app)
	const classes = useStyles()

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getSingleItem(id))
	}, [id, dispatch])
	return (
		<>
			{!pending ? (
				<SingleProduct />
			) : (
				<Grid className={classes.container} container>
					<CircularProgress size='5rem' />
				</Grid>
			)}
		</>
	)
}

export default SingleProductPage
