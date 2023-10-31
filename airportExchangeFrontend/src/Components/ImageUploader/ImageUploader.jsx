import React from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const ImageUploader = (props) => {
	const uploadURL = props.uploadURL

	//TODO mock api service to get signed url to S3, then use tutorial to upload to s3 https://react-dropzone-uploader.js.org/docs/s3
	const getUploadParams = ({ file, meta }) => {
		const body = new FormData()
		body.append('fileField', file)
		return { url: uploadURL, body }
	}
	return (
		<Dropzone
			getUploadParams={getUploadParams} // specify upload params and url for your files
			onChangeStatus={({ meta, file }, status) => {
				console.log(status, meta, file)
			}}
			onSubmit={(files) => {
				console.log(files.map((f) => f.meta))
			}}
			accept='image/*'
		/>
	)
}

export default ImageUploader
