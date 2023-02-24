import { S3Factory } from './../s3/s3-factory';
import { S3 } from 'aws-sdk';
import S3UploadException from './../exception/s3-upload-exception';

const S3_FOLDER_NAME = 'S3FolderName';
const S3_FILE_NAME = 'S3FileName';

export class S3Service {
  static instance: S3Service;

  static create(): S3Service {
    if (!this.instance) {
      this.instance = new S3Service();
    }

    return this.instance;
  }

  private s3Client: S3;

  private constructor() {
    this.s3Client = S3Factory.createS3Client();
  }

  async upload(file: Buffer | string): Promise<void> {
    const params = this.getPutObjectRequestParams(file);
    await this.uploadFile(params);
  }

  private async uploadFile(params: S3.Types.PutObjectRequest): Promise<void> {
    try {
      await this.s3Client.upload(params).promise();
    } catch (e) {
      throw new S3UploadException();
    }
  }

  private getPutObjectRequestParams(file: Buffer | string): S3.Types.PutObjectRequest {
    return {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${S3_FOLDER_NAME}/${S3_FILE_NAME}`,
      Body: file,
    } as S3.Types.PutObjectRequest;
  }
}
