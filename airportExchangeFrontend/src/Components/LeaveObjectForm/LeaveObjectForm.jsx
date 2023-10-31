import React, { useEffect, useState } from 'react'

import { getCategories, getItems } from '../../Redux/appSlice'
import { Footer, Header, ImageUploader } from '../../Components'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
	Grid,
	Typography,
	makeStyles,
	Button,
	alpha,
	Chip,
} from '@material-ui/core'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { getSingleItem } from '../../Redux/appSlice'

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
}))

const LeaveObjectForm = () => {
	const hasUploadedImage = useState(true)
	const uploadedImageURL = useState('')
	const handleImageUpload = () => {}
	const classes = useStyles()
	const title = 'title'
	const description = ''
	const category = ''
	const price = 3
	const pending = false
	const handleClick = () => {}
	const image = ''

	return (
		<Grid container className={classes.container}>
			<Grid item xs={12} sm={4}>
				<div className={classes.imgContainer}>
					{hasUploadedImage ? (
						<ImageUploader uploadURL='https://5k3fdtvru2.execute-api.eu-west-1.amazonaws.com/getPosts'/>
					) : (
						<Button onClick={handleImageUpload}>
							<Typography>Upload Image</Typography>
						</Button>
					)}
				</div>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography className={classes.marginTopTwo} variant='h4'>
					{'enter title'}
				</Typography>

				<Chip
					label={category}
					variant='outlined'
					className={classes.marginTopTwo}
				/>
				<Typography
					className={classNames(
						classes.paleText,
						classes.marginTopTwo,
					)}
					variant='body1'>
					{'enter description '}
				</Typography>
				<Typography
					className={classNames(
						classes.paleText,
						classes.marginTopTwo,
					)}
					variant='body1'>
					{'enter where to find it '}
				</Typography>

				<Button
					className={classNames(
						classes.letterSpace,
						classes.marginTopTwo,
					)}
					fullWidth
					variant='contained'
					color='primary'
					disabled={pending}
					onClick={handleClick}>
					Leave Object
				</Button>
			</Grid>
		</Grid>
	)
}

export default LeaveObjectForm
