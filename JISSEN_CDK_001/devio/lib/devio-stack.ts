import { Vpc } from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';

export class DevioStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new Vpc(this, 'Vpc');
  }
}
