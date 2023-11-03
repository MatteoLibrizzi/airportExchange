import { S3Client } from "@aws-sdk/client-s3"

export const USER_IMAGES_BUCKET_NAME = process.env.USER_IMAGES_BUCKET_NAME || ''
export const REGION = process.env.REGION || 'eu-west-1'
export const S3_CLIENT = new S3Client({ region: REGION })