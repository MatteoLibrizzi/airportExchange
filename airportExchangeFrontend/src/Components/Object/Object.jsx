import { Button, Grid, Typography, alpha, makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'
import apiCaller from '../../api/apiCaller'

const useStyles = makeStyles((theme) => ({
	container: {
		padding: theme.spacing(4),
		justifyContent: 'space-around',
		height: 'auto',
		alignItems: 'center',
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(10),
		},
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
	textOuterContainer: {
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(10),
		},
	},
	textInnerContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '80%',
	},
	textItems: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		padding: '10px',
	},
	bold: {
		fontWeight: 'bold',
	},
}))

const Object = ({ item }) => {
	console.log(item)
	// TODO handle the case when object has been picked up
	const { name, description, location, image, key, airportId } = item

	const classes = useStyles()

	const handleClick = async () => {
		await apiCaller.pickUpObject(key, airportId)
	}

	return (
		<Grid container className={classes.container}>
			<Grid item xs={12} sm={4}>
				<div className={classes.imgContainer}>
					<img src={image} alt={name} className={classes.img} />
				</div>
			</Grid>
			<Grid
				item
				className={classNames(classes.textOuterContainer)}
				xs={12}
				sm={6}>
				<Grid
					container
					className={classNames(classes.textInnerContainer)}>
					<Grid item className={classNames(classes.textItems)}>
						<Typography
							className={classNames(
								classes.text,
								classes.paleText,
								classes.marginTopTwo
							)}
							variant='h4'>
							{'Name:	'}
						</Typography>
						<Typography
							className={classNames(
								classes.text,
								classes.bold,
								classes.marginTopTwo
							)}
							variant='h4'>
							{name}
						</Typography>
					</Grid>
					<Grid item className={classNames(classes.textItems)}>
						<Typography
							className={classNames(
								classes.text,
								classes.paleText,
								classes.marginTopTwo
							)}
							variant='h4'>
							{'Description:'}
						</Typography>
						<Typography
							className={classNames(
								classes.text,
								classes.marginTopTwo
							)}
							variant='body2'>
							{description}
						</Typography>
					</Grid>
					<Grid item className={classNames(classes.textItems)}>
						<Typography
							className={classNames(
								classes.text,
								classes.paleText,
								classes.marginTopTwo
							)}
							variant='h4'>
							{'Location:'}
						</Typography>
						<Typography
							className={classNames(
								classes.text,
								classes.marginTopTwo
							)}
							variant='body2'>
							{location}
						</Typography>
					</Grid>
					<Grid item className={classNames(classes.textItems)}>
						<Button
							className={classNames(
								classes.letterSpace,
								classes.marginTopTwo
							)}
							fullWidth
							variant='contained'
							color='primary'
							// TODO write the api call to pick up the object
							onClick={handleClick}>
							Pick Up
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Object
