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
	const { name, description, location, airportId } = useSelector((state) => state.leave)
	const navigate = useNavigate()
	//TODO https://react-dropzone-uploader.js.org/docs/s3
	// handle frontend when image is uploaded (store name, show image ecc)
	const getUploadParams = async ({ file }) => {
		const url = await apiCaller.leaveObject(
			name,
			description,
			location,
			airportId,
			file.size
		)

		navigate('/leaveCompleteForm')

		return { url, method: 'PUT', body: file }
	}

	return (
		<Dropzone
			classNames={classNames(classes.uploader)}
			getUploadParams={getUploadParams}
			onChangeStatus={({ meta, file }, status) => {}}
			maxSizeBytes={5_000_000}
			accept='image/*'
			onSubmit={true}
		/>
	)
}

export default Uploader
