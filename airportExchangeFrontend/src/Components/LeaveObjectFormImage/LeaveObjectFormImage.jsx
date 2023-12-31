import { Button, Grid, Typography, alpha, makeStyles } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import classNames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import { BasicTable } from '../../Components'
import Uploader from '../ImageUploader/ImageUploader'

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

function createData(key, value) {
	return [key, value]
}

const LeaveObjectFormImage = () => {
	const { name, description, location, airportId, signedUrl } = useSelector(
		(state) => state.leave
	)

	const rows = [
		createData('Name', name),
		createData('Description', description),
		createData('Location', location),
		createData('Airport ID', airportId),
	]

	const classes = useStyles()
	return (
		<Grid container className={classes.container}>
			<Grid className={classNames(classes.longItem)} item xs={12} sm={6}>
				<Typography
					className={classNames(classes.text)}
					color='initial'
					variant='h4'>
					Provide an image for the object
				</Typography>
			</Grid>
			<Grid className={classNames(classes.longItem)} item xs={12} sm={6}>
				<BasicTable rows={rows} headRow={[]} />
			</Grid>
			<Grid className={classNames(classes.longItem)} item xs={12} sm={6}>
				<Uploader className={classNames(classes.imageUploader)} />
			</Grid>
			<Grid
				className={classNames(classes.longItem, classes.centerChild)}
				item
				xs={12}
				sm={6}>
				<Button className={classNames(classes.flexAndCenterColumn)}>
					<ArrowBack />
				</Button>
			</Grid>
		</Grid>
	)
}

export default LeaveObjectFormImage
