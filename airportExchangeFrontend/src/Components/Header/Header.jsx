import {
	AppBar,
	Button,
	Fade,
	Grid,
	IconButton,
	Toolbar,
	Typography,
	makeStyles
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { closeMenu, openMenu } from '../../Redux/appSlice'
import { fetchCartItems, resetCart } from '../../Redux/cartSlice'
import { logOut } from '../../Redux/userSlice'
import Menu from '../Menu/Menu'

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up('lg')]: {
			paddingLeft: 96,
			paddingRight: 96,
		},
		overflow: 'hidden',
		position: 'relative',
	},
	logo: {
		fontFamily: 'Meow Script, cursive',
	},
	btnContainer: {
		display: 'flex',
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		color: '#fff',
	},
	menuButton: {
		marginRight: theme.spacing(0.5),

		[theme.breakpoints.up('md')]: {
			marginRight: theme.spacing(2),
			display: 'none',
		},
	},
	link: {
		color: '#fff',
		textDecoration: 'none',
		cursor: 'pointer',
	},
	flex: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	flexEnd: {
		justifyContent: 'flex-end',
	},
	spaceAround: {
		justifyContent: 'space-around',
	},

	marginLeftOne: {
		marginLeft: theme.spacing(1),
	},

	marginRightThree: {
		marginRight: theme.spacing(3),
	},
	marginRightFour: {
		marginRight: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			marginRight: theme.spacing(4),
		},
	},
	marginRightTen: {
		marginRight: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			marginRight: theme.spacing(10),
		},
	},
	letterSpace: {
		letterSpacing: 2,
	},
	letterSpace2: {
		letterSpacing: 1.2,
	},
	whiteText: {
		color: '#fff',
	},
	hideMobile: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	hideMini: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
	transition: {
		transition: '0.3s all ease-out',
		'&:hover': {
			transform: 'Scale(1.1)',
		},
	},
}))

const Header = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isMenuOpen } = useSelector((state) => state.app)
	const { cartLength } = useSelector((state) => state.cart)
	const { user } = useSelector((state) => state.user)

	const handleLogout = () => {
		dispatch(logOut())
		dispatch(resetCart())
	}

	useEffect(() => {
		dispatch(fetchCartItems())
	}, [dispatch])

	return (
		<>
			<AppBar position="static" color="primary">
				<Toolbar className={classes.root} id="back-to-top-anchor">
					{isMenuOpen ? (
						<IconButton
							onClick={() => dispatch(closeMenu())}
							edge="start"
							className={classNames(
								classes.transition,
								classes.menuButton
							)}
							color="inherit"
						>
							<CloseIcon className={classes.whiteText} />
						</IconButton>
					) : (
						<IconButton
							edge="start"
							className={classNames(
								classes.transition,
								classes.menuButton
							)}
							color="inherit"
							onClick={() => dispatch(openMenu())}
						>
							<MenuIcon />
						</IconButton>
					)}

					<Typography
						className={classNames(
							classes.logo,
							classes.letterSpace,
							classes.link
						)}
						variant="h4"
						component="h1"
						translate="no"
						onClick={() => {
							//TODO change font of this
							dispatch(closeMenu())
							navigate('/')
						}}
					>
                  AirportExchange
					</Typography>

					<Grid
						container
						spacing={10}
						className={classNames(classes.flex, classes.flexEnd)}
					>
						<Grid
							item
							className={classNames(
								classes.marginRightThree,
								classes.hideMobile
							)}
						>
							<Button
								variant="text"
								onClick={() => {
									navigate('/findObjectInAirport')
								}}
								className={classNames(classes.transition, classes.marginRightFour)}
							>
								<Typography
									variant="body1"
									className={classNames(
										classes.whiteText,
										classes.letterSpace
									)}
								>
                           Get Objects
								</Typography>
							</Button>
							<Button
								variant="text"
								onClick={() => {
									navigate('/leaveTextForm')
								}}
								className={classes.transition}
							>
								<Typography
									variant="body1"
									className={classNames(
										classes.whiteText,
										classes.letterSpace
									)}
								>
                           Leave Objects
								</Typography>
							</Button>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			{isMenuOpen && (
				<Fade in={isMenuOpen}>
					<Menu />
				</Fade>
			)}
		</>
	)
}

export default Header
