export default class S3UploadException extends Error {
  constructor() {
    super(`Unable to upload file`);
  }
}
