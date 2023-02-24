import { S3 } from 'aws-sdk';

export class S3Factory {
  static createS3Client(): S3 {
    return new S3({ apiVersion: '2012-10-17' });
  }
}
