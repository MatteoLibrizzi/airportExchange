import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { S3Client } from '@aws-sdk/client-s3'

export const USER_IMAGES_BUCKET_NAME = process.env.USER_IMAGES_BUCKET_NAME || 'userImages'
export const REGION = process.env.REGION || 'eu-west-1'
export const S3_CLIENT = new S3Client({ region: REGION })
export const FILE_SIZE_LIMIT = 5_000_000
export const DDB_CLIENT = new DynamoDBClient({
	region: 'eu-west-1',
})
export const LEFT_OBJECTS_TABLE_NAME = process.env.LEFT_OBJECTS_TABLE_NAME || 'leftObjects'
