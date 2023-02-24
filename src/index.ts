import { APIGatewayProxyEvent } from 'aws-lambda';
import { ExceptionHandlerService } from './exception/exception-handler-service';
import { HttpResponse } from './http/http-response';
import { RequestManager } from './request/request-manager';
import { ImageService } from './service/image-service';
import { S3Service } from './service/s3-service';

export const handler = async (event: APIGatewayProxyEvent): Promise<HttpResponse> => {
  try {
    const buffer = RequestManager.getImageBuffer(event);

    const imageService = ImageService.create();
    const bufferResize = await imageService.resize(buffer);

    const s3Service = S3Service.create();
    await s3Service.upload(bufferResize);

    return HttpResponse.ok('OK');
  } catch (e) {
    return ExceptionHandlerService.handleException(e);
  }
};
