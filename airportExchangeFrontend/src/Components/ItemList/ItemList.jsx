import React, { useEffect, useState } from 'react'
import SingleItem from '../SingleItem/SingleItem'
import {
	CircularProgress,
	makeStyles,
	Grid,
	Button,
	Typography,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getCategories, getItems } from '../../Redux/appSlice'

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
					xs={10}
					sm={8}>
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
