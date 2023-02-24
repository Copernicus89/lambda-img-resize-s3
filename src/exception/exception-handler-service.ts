import { HttpResponse } from '../http/http-response';
import MissingFileException from './missing-file-exception';

export class ExceptionHandlerService {
  public static handleException(e: Error): HttpResponse {
    if (e instanceof MissingFileException) {
      return HttpResponse.badRequest('Missing file in the body of the request');
    }

    return HttpResponse.internalServerError(e.message);
  }
}
