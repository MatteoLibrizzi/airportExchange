import {
	Button,
	CircularProgress,
	Grid,
	Typography,
	makeStyles,
} from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SingleItem from '../SingleItem/SingleItem'

const mapThroughItems = (items) => {
	return items.map((item, idx) => {
		return <SingleItem key={idx} item={item} />
	})
}

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(10),
	},
	progress: {
		padding: theme.spacing(10),
	},
	marginTopTwo: {
		marginTop: theme.spacing(2),
	},
}))

const ItemList = (props) => {
	const dispatch = useDispatch()
	const pending = props.pending
	const items = props.items
	const classes = useStyles()

	const navigate = useNavigate()
	return (
		<>
			{!pending && items.length > 0 ? (
				<Grid
					className={classes.container}
					container
					spacing={4}
					>
					{mapThroughItems(items)}
				</Grid>
			) : !pending && items.length === 0 ? (
				<Grid
					className={classes.container}
					direction='column'
					alignItems='center'
					container
					item>
					<Typography variant='h4' color='initial'>
						No Items Found
					</Typography>
					<Button
						color='primary'
						onClick={() => navigate('/')}
						variant='contained'
						className={classes.marginTopTwo}>
						Back to home
					</Button>
				</Grid>
			) : (
				<Grid
					className={classNames(classes.progress, classes.container)}
					container>
					<CircularProgress size='5rem' />
				</Grid>
			)}
		</>
	)
}

export default ItemList
