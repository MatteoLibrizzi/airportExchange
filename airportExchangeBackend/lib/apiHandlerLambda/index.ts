import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { REGION, USER_IMAGES_BUCKET_NAME } from './constants'
import { getEventObject, getEventType } from './utils'

exports.handler = async function (event: any) {
	const eventType = getEventType(event)

	console.log({ eventType })

    // TODO verify that this getEventObject works
    // TODO look into developing tests for the lambda, so you don't have to deploy every fucking change
	const eventObject = getEventObject(event)

	console.log({ eventObject })

	const client = new S3Client({ region: REGION })
	const command = new PutObjectCommand({
		Bucket: USER_IMAGES_BUCKET_NAME,
		Key: 'aa',
	})
	const url = await getSignedUrl(client, command, { expiresIn: 3600 })

	return url
}
