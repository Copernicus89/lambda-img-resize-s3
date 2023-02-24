import { HttpStatusCode } from './http-status-code';

const EMPTY_BODY = '';

export class HttpResponse {
  static CORS_HEADERS = { 'Access-Control-Allow-Origin': '*' };

  statusCode: number;
  body: string;
  headers: any;

  constructor(statusCode: number, body: any, headers?: any) {
    this.statusCode = statusCode;
    this.body = body ? this.stringify(body) : EMPTY_BODY;
    this.headers = { ...HttpResponse.CORS_HEADERS, ...headers };
  }

  static ok(body: any) {
    return new HttpResponse(HttpStatusCode.OK, body);
  }

  static badRequest(body: any) {
    return new HttpResponse(HttpStatusCode.BAD_REQUEST, body);
  }

  static internalServerError(body: any) {
    return new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, body);
  }

  static notFound(body: any) {
    return new HttpResponse(HttpStatusCode.NOT_FOUND, body);
  }

  private stringify(whatever: any): string {
    return JSON.stringify(whatever);
  }
}
