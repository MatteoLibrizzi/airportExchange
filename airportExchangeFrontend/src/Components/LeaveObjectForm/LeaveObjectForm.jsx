import React, { useState } from 'react'

import { Button, Grid, TextField, alpha, makeStyles } from '@material-ui/core'
import classNames from 'classnames'

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
	// TODO make the links work
	// button must redirect to next page where user can upload image
	return (
		<Grid container className={classes.container}>
			<Grid className={classNames(classes.shortItem)} item xs={12} sm={6}>
				<TextField
					classNames={classes.marginTopTwo}
					id='outlined-basic'
					label='Title'
					variant='outlined'
					fullWidth
				/>
			</Grid>
			<Grid className={classNames(classes.longItem)} item xs={15}>
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
				/>
			</Grid>
			<Grid className={classNames(classes.longItem)} item xs={15}>
				<TextField
					className={classNames(
						classes.paleText,
						classes.marginTopTwo
					)}
					id='outlined-basic'
					label='Where to find it'
					variant='outlined'
					fullWidth
					multiline
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
					disabled={pending}
					onClick={handleClick}>
					Proceed
				</Button>
			</Grid>
		</Grid>
	)
}

/*

				
*/

export default LeaveObjectFormText
