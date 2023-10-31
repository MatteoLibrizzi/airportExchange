import {
	CorsHttpMethod,
	HttpApi,
	HttpMethod,
} from '@aws-cdk/aws-apigatewayv2-alpha'
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha'
import * as cdk from 'aws-cdk-lib'
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

export class AirportExchangeBackendStack extends cdk.Stack {
	createLambdaAPIHandler = () => {
		const apiHandlerRole = new Role(this, 'apiHandlerRole', {
			assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
			roleName: 'LambdaAPIHandlerRole',
		})

		/*
    create policies to assign to the role
		const s3PolicyStatement = new iam.PolicyStatement({
			effect: iam.Effect.ALLOW,
			actions: ['s3:ListBucket', 's3:GetObject'],
			resources: [
				`arn:aws:s3:::${postsS3Bucket.bucketName}`,
				`arn:aws:s3:::${postsS3Bucket.bucketName}/*`,
				`arn:aws:s3:::${imagesS3Bucket.bucketName}`,
				`arn:aws:s3:::${imagesS3Bucket.bucketName}/*`,
			],
		})
    postGetterLambdaRole.addToPolicy(s3PolicyStatement)

    */
		// assign basic role too
		apiHandlerRole.addManagedPolicy(
			ManagedPolicy.fromAwsManagedPolicyName(
				'service-role/AWSLambdaBasicExecutionRole'
			)
		)

		const postsGetterLambda = new lambda.Function(this, 'apiHandlerLambda', {
			runtime: lambda.Runtime.NODEJS_18_X,
			handler: 'index.handler',
			code: lambda.Code.fromAsset('build/lib/apiHandlerLambda'),
			environment: {},
			role: apiHandlerRole,
			layers: [],
		})

		return postsGetterLambda
	}

	createAPIGateway = (apiHandlerLambda: lambda.IFunction) => {
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
			path: '/test',
			methods: [HttpMethod.POST],
			integration: new HttpLambdaIntegration(
				'lambda_intergration',
				apiHandlerLambda
			),
		})
	}

	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

    const apiHandlerLambda = this.createLambdaAPIHandler()
    this.createAPIGateway(apiHandlerLambda)
	}
}
