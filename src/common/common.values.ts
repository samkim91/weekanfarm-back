import * as AWS from 'aws-sdk';

export const imageExtensionsRegex = /[\/.](jpg|jpeg|png|svg)$/;

export const s3 = new AWS.S3();
