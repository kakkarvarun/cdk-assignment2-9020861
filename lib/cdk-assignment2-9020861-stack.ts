import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';

export class CdkAssignment22020861Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 1) S3 bucket (Free Tier)
    const myBucket = new s3.Bucket(this, 'Bucket9020861', {
      bucketName: 'vk-9020861-cdk-bucket', // must be globally unique; if deploy fails, change slightly
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY, // dev/test only
    });

    // 2) DynamoDB table (Free Tier)
    const myTable = new dynamodb.Table(this, 'Assignment2Table9020861', {
      tableName: 'Assignment2Table_9020861',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY, // dev/test only
    });

    // 3) Lambda function (Free Tier, NodeJS 18)
    const myLambda = new lambda.Function(this, 'MyLambda9020861', {
      functionName: 'assignment2-lambda-9020861',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log('Lambda invoked for student 9020861!', JSON.stringify(event));
          return {
            statusCode: 200,
            body: 'Hello from Lambda for student 9020861!'
          };
        };
      `),
      environment: {
        BUCKET_NAME: myBucket.bucketName,
        TABLE_NAME: myTable.tableName,
      },
    });

    // Grant Lambda permissions to use bucket and table
    myBucket.grantReadWrite(myLambda);
    myTable.grantReadWriteData(myLambda);

    // Optional: Trigger Lambda when a new object is created in the bucket
    myBucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT,
      new s3n.LambdaDestination(myLambda),
    );
  }
}
