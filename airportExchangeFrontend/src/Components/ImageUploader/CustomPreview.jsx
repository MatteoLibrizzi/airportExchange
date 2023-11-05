import { Button, Card, CardMedia, Grid, alpha, makeStyles } from '@material-ui/core'

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
		flexDirection: 'row',
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
		height: '100%',
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
	root: {
		maxWidth: 500,
		[theme.breakpoints.up('sm')]: {
			maxHeight: 400,
		},
	},
}))

// TODO watch how it's done here https://github.com/fortana-co/react-dropzone-uploader/blob/master/src/Preview.tsx
export const customPreview = (props) => {
	const {
		className,
		imageClassName,
		style,
		imageStyle,
		fileWithMeta: { cancel, remove, restart },
		meta: {
			name = '',
			percent = 0,
			size = 0,
			previewUrl,
			status,
			duration,
			validationError,
		},
		isUpload,
		canCancel,
		canRemove,
		canRestart,
		extra: { minSizeBytes },
	} = props

	const classes = useStyles()

	return (
		<>
			<Grid container className={classes.container}>
				<Grid
					className={classNames()}
					item
					xs={12}
					sm={6}>
					<Card className={classes.root}>
						<CardMedia
							className={classes.media}
							src={previewUrl}
							title={'Preview'}
							component='img'
							loading='lazy'
						/>
					</Card>
				</Grid>
				<Grid
					className={classNames(classes.longItem)}
					item
					xs={12}
					sm={6}>
                        <Button>aa</Button>
                    </Grid>
			</Grid>
		</>
	)
}
