import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import apiCaller from '../../api/apiCaller'
import { GetSignedUrlMethodEnum } from '../../api/getSignedUrl'

const ImageUploader = (props) => {
	//TODO https://react-dropzone-uploader.js.org/docs/s3
	// handle frontend when image is uploaded (store name, show image ecc)
	const getUploadParams = async ({ meta: { name }, file }) => {
		const url = await apiCaller.getSignedUrl(
			'testKey',
			GetSignedUrlMethodEnum.PUT,
			file.size
		)
		return { url, method: 'PUT', body: file }
	}
	return (
		<Dropzone
			getUploadParams={getUploadParams}
			onChangeStatus={({ meta, file }, status) => {}}
			maxSizeBytes={5_000_000}
			accept='image/*'
		/>
	)
}

export default ImageUploader
