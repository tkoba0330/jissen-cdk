import { expect , countResources, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../lib/devio-stack';

test('Empty Stack', () => {
    const app = new cdk.App({
      context: {
        'systemName': 'starwars',
        'envType': 'prd'
      }
    });
    // WHEN
    const stack = new Devio.DevioStack(app, 'DevioStack');
    // THEN
    expect(stack).to(countResources('AWS::EC2::VPC', 1));
    expect(stack).to(haveResource('AWS::EC2::VPC', {
      CidrBlock: '10.0.0.0/16',
      Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-vpc'}]
    }));

    const subnetparams = [
      {cidr: '11', az: '1a', subname: 'public'},
      {cidr: '12', az: '1c', subname: 'public'},
      {cidr: '21', az: '1a', subname: 'app'},
      {cidr: '22', az: '1c', subname: 'app'},
      {cidr: '31', az: '1a', subname: 'db'},
      {cidr: '32', az: '1c', subname: 'db'},
    ]

    expect(stack).to(countResources('AWS::EC2::Subnet', 1));
    expect(stack).to(haveResource('AWS::EC2::Subnet', {
      CidrBlock: '10.0.11.0/24',
      AvailabilityZone: 'ap-northeast-1a',
      Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-public-1a' }]
    }));
    
});
