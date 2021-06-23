import * as cdk from '@aws-cdk/core';
import { CfnSubnet, CfnVPC, Vpc } from '@aws-cdk/aws-ec2';

export class DevioStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const systemName = this.node.tryGetContext('systemName');
    const envType = this.node.tryGetContext('envType');

    // The code that defines your stack goes here
    const vpc = new CfnVPC(this, 'Vpc', {
      cidrBlock: '10.0.0.0/16',
      tags: [{ key: 'Name', value: `${systemName}-${envType}-vpc` }]
    });

    const subnetparams = [
      {cidr: '11', az: '1a', subname: 'public'},
      {cidr: '12', az: '1c', subname: 'public'},
      {cidr: '21', az: '1a', subname: 'app'},
      {cidr: '22', az: '1c', subname: 'app'},
      {cidr: '31', az: '1a', subname: 'db'},
      {cidr: '32', az: '1c', subname: 'db'},
    ]

    subnetparams.forEach(e => {
      new CfnSubnet(this, `Subnet${e.subname.substring(0, 1).toUpperCase() + e.subname.substring(1)}${e.az}`, {
        cidrBlock: `10.0.${e.cidr}.0/24`,
        vpcId: vpc.ref,
        availabilityZone: `ap-northeast-${e.az}`,
        tags: [{key: 'Name', value: `${systemName}-${envType}-subnet-${e.subname}-${e.az}`}]
      });
    });
  }
}
