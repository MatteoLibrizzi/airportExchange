import {
	Button,
	Grid,
	TextField,
	Typography,
	alpha,
	makeStyles,
} from '@material-ui/core'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleButtonClickInTextForm } from '../../Redux/leaveSlice'

const useStyles = makeStyles((theme) => ({
	container: {
		height: 'auto',
		alignItems: 'center',
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(10),
		},
		display: 'flex',
		flexDirection: 'column',
	},
	item: {
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

const LeaveObjectFormText = () => {
	const {
		name: nameRedux,
		description: descriptionRedux,
		location: locationRedux,
		airportId: airportIdRedux
	} = useSelector((state) => state.leave)

	const navigate = useNavigate()

	const classes = useStyles()
	const [name, setName] = useState(nameRedux)
	const [description, setDescription] = useState(descriptionRedux)
	const [location, setLocation] = useState(locationRedux)
	const [airportId, setAirportId] = useState(airportIdRedux)

	const dispatch = useDispatch()
	const handleClick = () => {
		dispatch(
			handleButtonClickInTextForm({
				name,
				description,
				location,
				airportId,
			})
		)
		navigate('/leaveImageForm')
	}
	return (
		<Grid container className={classes.container}>
			<Grid className={classNames(classes.longItem, classes.item)} item xs={12} sm={6}>
				<Typography
					className={classNames(classes.text)}
					color='initial'
					variant='h4'>
					Provide information on the object you are leaving
				</Typography>
			</Grid>
			<Grid className={classNames(classes.shortItem,classes.item)} item xs={12} sm={6}>
				<TextField
					classNames={classes.marginTopTwo}
					id='outlined-basic'
					label='Name'
					variant='outlined'
					fullWidth
					onChange={(event) => {
						setName(event.target.value)
					}}
					value={name}
				/>
			</Grid>
			<Grid className={classNames(classes.longItem, classes.item)} item xs={15}>
				<TextField
					className={classNames(
						classes.paleText,
						classes.marginTopTwo
					)}
					id='outlined-basic'
					label='Description'
					variant='outlined'
					fullWidth
					multiline
					onChange={(event) => {
						setDescription(event.target.value)
					}}
					value={description}
				/>
			</Grid>
			<Grid className={classNames(classes.longItem, classes.item)} item xs={15}>
				<TextField
					className={classNames(
						classes.paleText,
						classes.marginTopTwo
					)}
					id='outlined-basic'
					label='Location'
					variant='outlined'
					fullWidth
					multiline
					onChange={(event) => {
						setLocation(event.target.value)
					}}
					value={location}
				/>
			</Grid>
			<Grid className={classNames(classes.shortItem, classes.item)} item xs={15} sm={6}>
				<TextField
					classNames={classNames(classes.paleText,classes.marginTopTwo)}
					id='outlined-basic'
					label='Airport Code'
					variant='outlined'
					fullWidth
					onChange={(event) => {
						setAirportId(event.target.value)
					}}
					value={airportId}
				/>
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
					disabled={
						name === '' || description === '' || location === ''
					}
					onClick={handleClick}>
					Proceed
				</Button>
			</Grid>
		</Grid>
	)
}

export default LeaveObjectFormText
