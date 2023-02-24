import { ImageUtils } from './../utils/image-utils';
import { APIGatewayProxyEvent } from 'aws-lambda';
import ImageFileParseException from './../exception/image-file-parse-exception';
import MissingFileException from './../exception/missing-file-exception';

export class RequestManager {
  static getImageBuffer(event: APIGatewayProxyEvent): Buffer {
    if (!event.body) {
      throw new MissingFileException();
    }
    return this.encodeImageFile(event.body);
  }

  private static encodeImageFile(file: string): Buffer {
    try {
      const base64File = file;
      const buffer = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      this.validateImage(buffer);
      return buffer;
    } catch (e) {
      throw new ImageFileParseException();
    }
  }

  private static validateImage(buffer: Buffer) {
    if (!ImageUtils.isJpg(buffer) && !ImageUtils.isPng(buffer)) {
      throw new Error('Not a jpg or png');
    }
  }
}
