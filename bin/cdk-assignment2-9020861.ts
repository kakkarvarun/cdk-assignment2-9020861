#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkAssignment22020861Stack } from '../lib/cdk-assignment2-9020861-stack';

const app = new cdk.App();
new CdkAssignment22020861Stack(app, 'CdkAssignment22020861Stack', {
  /* If want a specific env, uncomment:
  env: { account: 'YOUR_ACCOUNT_ID', region: 'us-east-1' },
  */
});
