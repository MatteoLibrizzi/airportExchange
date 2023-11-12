import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
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
	const { key } = useParams()
	const [pending, setPending] = useState(true)

	const classes = useStyles()

	const dispatch = useDispatch()
	useEffect(() => {
		setPending(false)
	})
	return (
		<>
			{!pending ? (
				<Object />
			) : (
				<Grid className={classes.container} container>
					<CircularProgress size='5rem' />
				</Grid>
			)}
		</>
	)
}

export default SingleObjectPage
