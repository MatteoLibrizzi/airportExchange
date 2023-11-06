import { Button, Card, CardMedia, Grid, makeStyles } from '@material-ui/core'

import classNames from 'classnames'
import React from 'react'

const useStyles = makeStyles((theme) => ({
	item: {
		alignItems: 'center',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		padding: '10px',
		width: 'auto',
		height: 'auto',
	},
	button: {
		width: '50%',
		height: '30%',
	},
}))

//TODO fucking CSS
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
		onClick,
	} = props

	const classes = useStyles()

	return (
		<>
			<Grid container className={classNames(classes.row)}>
				<Grid className={classNames(classes.item)} item xs={12} sm={6}>
					<Card className={classNames(classes.image)}>
						<CardMedia
							className={classNames()}
							src={previewUrl}
							title={'Preview'}
							component='img'
							loading='lazy'
						/>
					</Card>
				</Grid>
				<Grid
					className={classNames(classes.item)}
					alignItems='center'
					item
					xs={12}
					sm={6}>
					<Button
						className={classNames(classes.button)}
						onClick={onClick}
						>
						aa
					</Button>
				</Grid>
			</Grid>
		</>
	)
}
