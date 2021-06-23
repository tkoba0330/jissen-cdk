import { expect , countResources, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../lib/devio-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Devio.DevioStack(app, 'DevioStack');
    // THEN
    expect(stack).to(countResources('AWS::EC2::VPC', 1));
    expect(stack).to(haveResource('AWS::EC2::VPC', {
      CidrBlock: '10.0.0.0/16',
      Tags: [{ 'Key': 'Name', 'Value': 'devio-stg-vpc'}]
    }));

});
