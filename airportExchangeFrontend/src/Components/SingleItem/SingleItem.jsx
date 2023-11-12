import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	makeStyles,
} from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 400,
		[theme.breakpoints.up('sm')]: {
			maxHeight: 400,
		},
	},
	media: {
		height: 'auto',
		width: 'auto',
		[theme.breakpoints.up('sm')]: {
			height: 200,
		},
	},
}))

const SingleItem = ({ item }) => {
	const classes = useStyles()
	const { name, image, airportId, key } = item

	console.log({item})
	
	const navigate = useNavigate()
	return (
		<Grid item xs={4} sm={4} lg={3}>
			<Card className={classes.root}>
				<CardActionArea onClick={() => navigate(`/object/${airportId}/${key}`)}>
					<CardMedia
						className={classes.media}
						src={image}
						title={name}
						component='img'
						loading='lazy'
						
					/>
					<CardContent>
						<Typography gutterBottom variant='body1' component='h4'>
							{name.substring(0, 20)}
						</Typography>
						<Typography
							variant='body2'
							color='textSecondary'
							component='p'>
							{airportId}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	)
}

export default SingleItem
