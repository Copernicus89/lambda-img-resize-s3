import { S3Factory } from '../s3/s3-factory';
import { S3Service } from './s3-service';

jest.mock('../s3/s3-factory');

describe('s3-service', () => {
  const S3_BUCKET_NAME = 'S3_BUCKET_NAME';
  const FILE = Buffer.from('FILE', 'base64');

  const S3_FOLDER = 'S3FolderName';
  const S3_FILE_NAME = 'S3FileName';

  let s3Service: S3Service;

  let s3ClientPutObjectMock: any;
  let s3ClientMock: any;

  beforeEach(() => tearUp());
  afterEach(() => tearDown());

  describe('The instance', () => {
    it('should be a singleton', () => {
      s3Service = S3Service.create();
      const s3Service2 = S3Service.create();
      // @ts-ignore
      expect(s3Service).toEqual(s3Service2);
    });
  });

  describe('should successfully upload an image', () => {
    beforeEach(async () => {
      await s3Service.upload(FILE);
    });

    it('should call the upload method on the s3 client', () => {
      expect(s3ClientMock.upload).toHaveBeenCalledWith({
        Bucket: S3_BUCKET_NAME,
        Key: `${S3_FOLDER}/${S3_FILE_NAME}`,
        Body: FILE,
      });
    });
  });

  describe('should throw exception', () => {
    it('exception when upload returns an error', async () => {
      jest.spyOn(s3ClientMock, 'upload').mockImplementation(() => {
        throw new Error('Exception');
      });

      try {
        await s3Service.upload(FILE);
      } catch (e) {
        expect(e.message).toBe(getExceptionMessage());
      }
    });

    function getExceptionMessage(): string {
      return 'Unable to upload file';
    }
  });

  function tearUp(): void {
    createMocks();
  }

  function tearDown(): void {
    // @ts-ignore
    S3Service.instance = null;
    jest.resetAllMocks();
  }

  function createMocks(): void {
    process.env.S3_BUCKET_NAME = S3_BUCKET_NAME;

    s3ClientPutObjectMock = {
      promise: () => Promise.resolve(),
    };

    s3ClientMock = {
      upload: jest.fn().mockReturnValue(s3ClientPutObjectMock),
    };
    jest.spyOn(S3Factory, 'createS3Client').mockReturnValue(s3ClientMock);

    s3Service = S3Service.create();
  }
});
