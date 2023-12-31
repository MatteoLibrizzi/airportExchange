import { makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import apiCaller from '../../api/apiCaller'

const useStyles = makeStyles((theme) => ({
	uploader: {},
}))

const Uploader = (props) => {
	const classes = useStyles()
	const { name, description, location, airportId } = useSelector(
		(state) => state.leave
	)
	const navigate = useNavigate()
	const getUploadParams = async ({ file }) => {
		console.log(name, description, location, airportId, file.size)
		let url
		try {
			url = await apiCaller.leaveObject(
				name,
				description,
				location,
				airportId,
				file.size
			)
			navigate('/leaveCompleteForm')
		} catch (e) {
			console.log(e)
		}

		return { url, method: 'PUT', body: file, }
	}

	return (
		<Dropzone
			classNames={classNames(classes.uploader)}
			getUploadParams={getUploadParams}
			onChangeStatus={({ meta, file }, status) => {}}
			maxSizeBytes={5_000_000}
			accept='image/*'
		/>
	)
}

export default Uploader
