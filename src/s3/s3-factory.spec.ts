import { S3 } from 'aws-sdk';

import { S3Factory } from './s3-factory';

describe('S3Factory', () => {
  it('should return a new S3 instance', () => {
    const expected = new S3({ apiVersion: '2012-10-17' });
    const s3Client = S3Factory.createS3Client();

    expect(s3Client instanceof S3).toBeTruthy();
    expect(s3Client.apiVersions).toEqual(expected.apiVersions);
  });
});
