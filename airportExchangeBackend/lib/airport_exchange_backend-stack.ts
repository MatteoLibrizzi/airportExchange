import {
	CorsHttpMethod,
	HttpApi,
	HttpMethod,
} from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'
import path = require('path')

export class AirportExchangeBackendStack extends cdk.Stack {
	apiHandlerLambda: lambda.IFunction
	userImagesBucket: cdk.aws_s3.Bucket
	lambdaLayerNodeJSS3SignedURLGenerator: lambda.ILayerVersion

	initLambdaLayers = () => {
		this.lambdaLayerNodeJSS3SignedURLGenerator = new lambda.LayerVersion(
			this,
			'lambda-Layer-NodeJS-S3-SignedURL-Generator',
			{
				removalPolicy: cdk.RemovalPolicy.RETAIN,
				code: lambda.Code.fromAsset(
					path.join(__dirname, 'lambdaLayers')
				),
				compatibleArchitectures: [
					lambda.Architecture.X86_64,
					lambda.Architecture.ARM_64,
				],
			}
		)
	}

	createUserImagesS3Bucket = () => {
		const userImagesBucket = new s3.Bucket(this, 'userImagesBucket', {
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
			bucketName: 'userimagesbucket-airportexchange',
			cors: [
				{
					allowedMethods: [
						s3.HttpMethods.GET,
						s3.HttpMethods.POST,
						s3.HttpMethods.PUT,
					],
					allowedOrigins: ['http://localhost:3000'],
					allowedHeaders: ['*'],
				},
			],
		})

		this.userImagesBucket = userImagesBucket
	}

	createLambdaAPIHandler = () => {
		const apiHandlerLambdaRole = new Role(this, 'apiHandlerRole', {
			assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
			roleName: 'LambdaAPIHandlerRole',
		})

		const s3PolicyStatement = new iam.PolicyStatement({
			effect: iam.Effect.ALLOW,
			actions: ['s3:*'],
			resources: [
				`arn:aws:s3:::${this.userImagesBucket.bucketName}`,
				`arn:aws:s3:::${this.userImagesBucket.bucketName}/*`,
			],
		})
		apiHandlerLambdaRole.addToPolicy(s3PolicyStatement)

		// assign basic role too
		apiHandlerLambdaRole.addManagedPolicy(
			ManagedPolicy.fromAwsManagedPolicyName(
				'service-role/AWSLambdaBasicExecutionRole'
			)
		)

		const apiHandlerLambda = new lambda.Function(this, 'apiHandlerLambda', {
			runtime: lambda.Runtime.NODEJS_18_X,
			handler: 'index.handler',
			code: lambda.Code.fromAsset('build/lib/apiHandlerLambda'),
			environment: {
				USER_IMAGES_BUCKET_NAME: this.userImagesBucket.bucketName,
			},
			role: apiHandlerLambdaRole,
			layers: [this.lambdaLayerNodeJSS3SignedURLGenerator],
		})

		this.apiHandlerLambda = apiHandlerLambda
	}

	createAPIGateway = () => {
		const httpAPI = new HttpApi(this, 'airportExchangeAPI', {
			description: 'PUBLIC api endpoint for the website',
			corsPreflight: {
				allowHeaders: [
					'Content-Type',
					'X-Amz-Date',
					'Authorization',
					'X-Api-Key',
					'*',
				],
				exposeHeaders: ['Date', 'x-api-id'],
				allowMethods: [CorsHttpMethod.OPTIONS, CorsHttpMethod.POST],
				allowOrigins: ['http://localhost:3000'],
			},
		})

		httpAPI.addRoutes({
			path: '/api',
			methods: [HttpMethod.POST],
			integration: new HttpLambdaIntegration(
				'lambda_intergration',
				this.apiHandlerLambda
			),
		})
	}

	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		this.initLambdaLayers()
		this.createUserImagesS3Bucket()
		this.createLambdaAPIHandler()
		this.createAPIGateway()
	}
}
