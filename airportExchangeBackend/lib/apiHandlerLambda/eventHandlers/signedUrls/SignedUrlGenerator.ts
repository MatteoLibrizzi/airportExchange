import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3_CLIENT, USER_IMAGES_BUCKET_NAME } from '../../constants'

export class SignedUrlGenerator {
	static getSignedUrlPut = async (objectKey: string, ContentLength: number) => {
		const command = new PutObjectCommand({
			Bucket: USER_IMAGES_BUCKET_NAME,
			Key: objectKey,
			ContentLength,
		})
		const url = await getSignedUrl(S3_CLIENT, command, { expiresIn: 3600 })

		return url
	}

	static getSignedUrlGet = async (objectKey: string) => {
		const command = new GetObjectCommand({
			Bucket: USER_IMAGES_BUCKET_NAME,
			Key: objectKey,
		})
		const url = await getSignedUrl(S3_CLIENT, command, { expiresIn: 3600 })

		return url
	}
}
