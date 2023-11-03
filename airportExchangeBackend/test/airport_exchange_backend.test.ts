import * as cdk from 'aws-cdk-lib'
import { Match, Template } from 'aws-cdk-lib/assertions'
import * as AirportExchangeBackend from '../lib/airport_exchange_backend-stack'

test('API handler lambda was created', () => {
	const app = new cdk.App()
	const stack = new AirportExchangeBackend.AirportExchangeBackendStack(
		app,
		'MyTestStack'
	)

	const template = Template.fromStack(stack)

	template.hasResourceProperties('AWS::Lambda::Function', {
		Handler: 'index.handler',
		Runtime: 'nodejs18.x',
	})
})

test('s3 bucket for user images was created', () => {
	const app = new cdk.App()
	const stack = new AirportExchangeBackend.AirportExchangeBackendStack(
		app,
		'MyTestStack'
	)

	const template = Template.fromStack(stack)

	template.hasResourceProperties(
		'AWS::S3::Bucket',
		Match.objectLike({
			BucketName: 'userimagesbucket-airportexchange',
		})
	)
})
