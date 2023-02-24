import { HttpResponse } from '../http/http-response';
import MissingFileException from './missing-file-exception';
import { ExceptionHandlerService } from './exception-handler-service';

describe('ExceptionHandlerService', () => {
  describe('when an exception is launched', () => {
    const BAD_REQUEST_CODE = 400;
    const INTERNAL_ERROR_CODE = 500;

    it("Should return a 400 if there's no file present in the request", () => {
      const error = new MissingFileException();
      const response: HttpResponse = ExceptionHandlerService.handleException(error);
      expect(response.statusCode).toEqual(BAD_REQUEST_CODE);
    });

    it('Should return a 500 if unhandled exception type', () => {
      const error = new Error();
      const response: HttpResponse = ExceptionHandlerService.handleException(error);
      expect(response.statusCode).toEqual(INTERNAL_ERROR_CODE);
    });
  });
});
