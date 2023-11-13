import {
	Box,
	Button,
	Grid,
	Modal,
	Typography,
	alpha,
	makeStyles,
} from '@material-ui/core'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import classNames from 'classnames'
import React, { useState } from 'react'
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
	modal: {
		display: 'flex',
		flexDirection: 'column',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		backgroundColor: 'white',
		boxShadow: 24,
		padding: '5%',
	},
	imageAndMessage: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	message: {
		padding: '10px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	messageComponent: {
		padding: '10px',
	},
}))

const Object = ({ item }) => {
	const [modalOpen, setModalOpen] = React.useState(false)
	const handleOpenModal = () => setModalOpen(true)
	const handleCloseModal = () => setModalOpen(false)
	const [pickedUp, setPickedUp] = useState(false)

	const { name, description, location, image, key, airportId } = item

	const classes = useStyles()

	const handlePickUpClick = async () => {
		await apiCaller.pickUpObject(key, airportId)
		handleCloseModal()
		setPickedUp(true)
	}

	return (
		<Grid container className={classes.container}>
			<Grid
				item
				className={classNames(classes.imageAndMessage)}
				xs={12}
				sm={4}>
				{pickedUp && (
					<>
						<Box className={classNames(classes.message)}>
							<DoneAllIcon
								color='primary'
								className={classNames(classes.messageComponent)}
							/>
							<Typography
								className={classNames(
									classes.messageComponent
								)}>
								Object has been picked up
							</Typography>
							<DoneAllIcon
								color='primary'
								className={classNames(classes.messageComponent)}
							/>
						</Box>
					</>
				)}
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
							disabled={pickedUp}
							className={classNames(
								classes.letterSpace,
								classes.marginTopTwo
							)}
							fullWidth
							variant='contained'
							color='primary'
							onClick={handleOpenModal}>
							Pick Up
						</Button>
						<Modal
							open={modalOpen}
							onClose={handleCloseModal}
							aria-labelledby='modal-modal-title'
							aria-describedby='modal-modal-description'>
							<Box className={classNames(classes.modal)}>
								<Typography
									id='modal-modal-title'
									variant='h6'
									component='h2'>
									Are you sure you want to pick up this
									object?
								</Typography>
								<Button
									className={classNames(
										classes.letterSpace,
										classes.marginTopTwo
									)}
									fullWidth
									variant='contained'
									color='primary'
									onClick={handlePickUpClick}>
									Confirm
								</Button>
							</Box>
						</Modal>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Object
