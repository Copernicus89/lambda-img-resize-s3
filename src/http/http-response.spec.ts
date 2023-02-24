import { HttpResponse } from './http-response';
import { HttpStatusCode } from './http-status-code';

describe('HttpResponse', () => {
  const RESPONSE_BODY = { body: 'response-body' };
  const EXPECTED_BODY_STRING = JSON.stringify(RESPONSE_BODY);
  const STRING_BODY = 'string-body';
  const NUMBER_BODY = 123;
  const ACCESS_CONTROL_ALLOW_ORIGIN_KEY = 'Access-Control-Allow-Origin';
  const CUSTOM_HEADER_KEY = 'Custom-Header';
  const CUSTOM_HEADER_VALUE = 'custom_value';

  it('should create a response with empty body', async () => {
    const response = HttpResponse.ok(null);

    expect(response.body).toEqual('');
    verifyCorsHeaders(response.headers);
  });

  it('should create a response with string body', async () => {
    const response = HttpResponse.ok(STRING_BODY);

    expect(response.body).toEqual(JSON.stringify(STRING_BODY));
    verifyCorsHeaders(response.headers);
  });

  it('should create a response with string even body is a number', async () => {
    const response = HttpResponse.ok(NUMBER_BODY);

    expect(response.body).toEqual(JSON.stringify(NUMBER_BODY));
    verifyCorsHeaders(response.headers);
  });

  it('should create an OK http response', async () => {
    const response = HttpResponse.ok(RESPONSE_BODY);

    expect(response.statusCode).toEqual(HttpStatusCode.OK);
    expect(response.body).toEqual(EXPECTED_BODY_STRING);
    verifyCorsHeaders(response.headers);
  });

  it('should create an OK http response with new custom header', async () => {
    const header = { 'Custom-Header': CUSTOM_HEADER_VALUE };

    const response = new HttpResponse(HttpStatusCode.OK, RESPONSE_BODY, header);

    expect(response.statusCode).toEqual(HttpStatusCode.OK);
    expect(response.body).toEqual(EXPECTED_BODY_STRING);
    verifyContainsCorsHeaders(response.headers);
    verifyContainsCustomHeaders(response.headers);
  });

  it('should create a BadRequest http response', async () => {
    const response = HttpResponse.badRequest(STRING_BODY);

    expect(response.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);
    expect(response.body).toEqual(JSON.stringify(STRING_BODY));
    verifyCorsHeaders(response.headers);
  });

  it('should create an InternalServerError http response', async () => {
    const response = HttpResponse.internalServerError(STRING_BODY);

    expect(response.statusCode).toEqual(HttpStatusCode.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual(JSON.stringify(STRING_BODY));
    verifyCorsHeaders(response.headers);
  });

  it('should create a NotFound http response', async () => {
    const response = HttpResponse.notFound(STRING_BODY);

    expect(response.statusCode).toEqual(HttpStatusCode.NOT_FOUND);
    expect(response.body).toEqual(JSON.stringify(STRING_BODY));
    verifyCorsHeaders(response.headers);
  });

  function verifyCorsHeaders(headers: any) {
    expect(headers).toEqual(HttpResponse.CORS_HEADERS);
  }

  function verifyContainsCorsHeaders(headers: any) {
    expect(headers[ACCESS_CONTROL_ALLOW_ORIGIN_KEY]).toEqual(HttpResponse.CORS_HEADERS[ACCESS_CONTROL_ALLOW_ORIGIN_KEY]);
  }

  function verifyContainsCustomHeaders(headers: any) {
    expect(headers[CUSTOM_HEADER_KEY]).toEqual(CUSTOM_HEADER_VALUE);
  }
});
