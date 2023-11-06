import { Grid, Typography, alpha, makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'

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
	centerChild: {
		display: 'flex',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		paddingBottom: '20px',
	},
	longItem: {
		width: '60%',
		paddingTop: '10px'
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
	imageUploader: {},
	flexAndCenterColumn: {
		display:'flex',
		justifyContent: 'center',
		flexDirection: 'column'
	}
}))

const LeaveObjectFormComplete = () => {
	const classes = useStyles()
	return (
		<Grid container className={classes.container}>
			<Grid className={classNames(classes.longItem)} item xs={12} sm={6}>
				<Typography
					className={classNames(classes.text)}
					color='initial'
					variant='h4'>
					Thank you for leaving an object. A fellow traveler will find it helpful!
				</Typography>
			</Grid>
			
		</Grid>
	)
}

export default LeaveObjectFormComplete
