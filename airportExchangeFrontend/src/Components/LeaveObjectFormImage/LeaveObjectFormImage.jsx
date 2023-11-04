import { Button, Grid, Typography, alpha, makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BasicTable } from '../../Components'
import ImageUploader from '../ImageUploader/ImageUploader'

const useStyles = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(4),
		height: 'auto',
		alignItems: 'center',
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(10),
		},
		display: 'flex',
		flexDirection: 'column',
	},
	text: {
		textAlign: 'center',
		paddingBottom: '20px',
	},
	longItem: {
		width: '60%',
	},
	shortItem: {
		width: '20%',
	},
	imgContainer: {
		width: '100%',
		height: 'auto',
		boxShadow: theme.shadows[3],
	},
	img: {
		width: '100%',
		height: 'auto',
	},
	marginTopTwo: {
		marginTop: theme.spacing(2),
	},
	paleText: {
		color: alpha('#333', 0.8),
	},
	letterSpace: {
		letterSpacing: 2.5,
	},
}))

function createData(key, value) {
	return [key, value]
}

const LeaveObjectFormImage = () => {
	const { name, description, location, airportId } = useSelector(
		(state) => state.leave
	)

	const rows = [
		createData('Name', name),
		createData('Description', description),
		createData('Location', location),
		createData('Airport ID', airportId),
	]

	const navigate = useNavigate()

	const classes = useStyles()

	const dispatch = useDispatch()
	const handleClick = () => {}
	// TODO make the links work
	// button must redirect to next page where user can upload image
	return (
		<Grid container className={classes.container}>
			<Grid className={classNames(classes.longItem)} item xs={12} sm={6}>
				<Typography
					className={classNames(classes.text)}
					color='initial'
					variant='h4'>
					Provide necessary images for the following object
				</Typography>
			</Grid>
			<Grid className={classNames(classes.longItem)} item xs={12} sm={6}>
				<BasicTable rows={rows} headRow={[]} />
			</Grid>
			<Grid className={classNames(classes.longItem)} item xs={12} sm={6}>
				<ImageUploader />
			</Grid>
			<Grid className={classNames(classes.shortItem)} item xs={12} sm={6}>
				<Button
					className={classNames(
						classes.letterSpace,
						classes.marginTopTwo
					)}
					fullWidth
					variant='contained'
					color='primary'
					onClick={() => {}}>
					Leave Object
				</Button>
			</Grid>
		</Grid>
	)
}

export default LeaveObjectFormImage
