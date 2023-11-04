import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import apiCaller from '../../api/apiCaller'
import { GetSignedUrlMethodEnum } from '../../api/getSignedUrl'

const ImageUploader = (props) => {

	//TODO https://react-dropzone-uploader.js.org/docs/s3
	// find a way to prevent ddos
	// handle frontend when image is uploaded (store name, show image ecc)
	const getUploadParams = async ({ meta: {name}, file }) => {
		const url = await apiCaller.getSignedUrl('testKey', GetSignedUrlMethodEnum.PUT)
		return { url, method:'PUT', body: file }
	}
	return (
		<Dropzone
			getUploadParams={getUploadParams} // specify upload params and url for your files
			onChangeStatus={({ meta, file }, status) => {
				console.log(status, meta, file)
			}}
			onSubmit={(files, allFiles) => {
				console.log(files.map((f) => f.meta))
				allFiles.forEach((f) => f.remove())
			}}
			accept='image/*'
		/>
	)
}

export default ImageUploader
