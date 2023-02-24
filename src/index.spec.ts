import { HttpResponse } from './http/http-response';
import { RequestManager } from './request/request-manager';
import { ImageService } from './service/image-service';
import { S3Service } from './service/s3-service';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '.';

describe('handler', () => {
  const HTTP_STATUS = 'OK';
  const FILE = Buffer.from('FILE', 'base64');
  const EVENT: Partial<APIGatewayProxyEvent> = {};

  let s3ServiceMock: any;
  let imageServiceMock: any;
  let promiseMock: any;

  beforeEach(() => tearUp());
  afterEach(() => tearDown());

  describe('check if the service is called correctly', () => {
    let response: any;

    beforeEach(async () => {
      response = await handler(EVENT as APIGatewayProxyEvent);
    });

    it('Resize function has been called with the correct', async () => {
      expect(imageServiceMock.resize).toHaveBeenCalledWith(FILE);
    });

    it('uploadFile function has been called with the correct input', async () => {
      expect(s3ServiceMock.upload).toHaveBeenCalledWith(FILE);
    });

    it('should return HttpResponse.ok when it is successful', async () => {
      expect(response).toEqual(HttpResponse.ok(HTTP_STATUS));
    });
  });

  describe('check if the S3Service service throws an exception', () => {
    const exceptionError = 'Internal server error';

    beforeEach(async () => {
      jest.spyOn(s3ServiceMock, 'upload').mockImplementation(() => {
        throw new Error(exceptionError);
      });
      jest.spyOn(S3Service, 'create').mockReturnValue(s3ServiceMock as S3Service);
    });

    it('throw an exception', async () => {
      await handler(EVENT as APIGatewayProxyEvent);
      expect(s3ServiceMock.upload).toThrowError;
    });

    it('return internalServerError', async () => {
      const response = await handler(EVENT as APIGatewayProxyEvent);
      expect(JSON.stringify(response)).toBe(JSON.stringify(HttpResponse.internalServerError(exceptionError)));
    });
  });

  describe('check if the ImageService service throws an exception', () => {
    const exceptionError = 'Internal server error';

    beforeEach(async () => {
      jest.spyOn(imageServiceMock, 'resize').mockImplementation(() => {
        throw new Error(exceptionError);
      });
      jest.spyOn(ImageService, 'create').mockReturnValue(imageServiceMock as ImageService);
    });

    it('throw an exception', async () => {
      await handler(EVENT as APIGatewayProxyEvent);
      expect(imageServiceMock.resize).toThrowError;
    });

    it('return internalServerError', async () => {
      const response = await handler(EVENT as APIGatewayProxyEvent);
      expect(JSON.stringify(response)).toBe(JSON.stringify(HttpResponse.internalServerError(exceptionError)));
    });
  });

  function tearUp(): void {
    createMocks();
  }

  function tearDown(): void {
    jest.resetAllMocks();
  }

  function createMocks(): void {
    jest.spyOn(RequestManager, 'getImageBuffer').mockReturnValue(FILE);

    s3ServiceMock = {
      upload: jest.fn(() => promiseMock),
    };
    jest.spyOn(S3Service, 'create').mockReturnValue(s3ServiceMock as S3Service);

    imageServiceMock = {
      resize: jest.fn(() => FILE),
    };
    jest.spyOn(ImageService, 'create').mockReturnValue(imageServiceMock as ImageService);
  }
});
