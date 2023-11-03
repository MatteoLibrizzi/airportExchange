import axios from 'axios'
import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

const ImageUploader = (props) => {
	const uploadURL = props.uploadURL

	//TODO https://react-dropzone-uploader.js.org/docs/s3
	// prettify code, find a way to prevent ddos
	// handle frontend when image is uploaded (store name, show image ecc)
	const getUploadParams = async ({ meta: {name}, file }) => {
		const response = await axios.post(
			'https://ru75dbvc9d.execute-api.eu-west-1.amazonaws.com/api',
			{
				eventType: 'getUploadSignedUrl',
				eventObject: '{"objectKey": "exampleKey","method":"put"}',
			},
			{ headers: { 'Content-Type': 'application/json' } }
		)
		console.log(response)
		const url = response.data.signedUrl

		console.log({url})

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
