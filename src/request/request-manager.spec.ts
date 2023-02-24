import ImageFileParseException from './../exception/image-file-parse-exception';
import { ImageUtils } from './../utils/image-utils';
import { RequestManager } from './request-manager';

describe('request-manager', () => {
  const FILE = 'FILE_CONTENT';

  const EVENT = {
    body: FILE,
  } as any;

  const EVENT_ERROR = {} as any;

  beforeEach(() => tearUp());
  afterEach(() => tearDown());

  describe('getImageBuffer', () => {
    it('should return a Buffer', () => {
      const response = RequestManager.getImageBuffer(EVENT);

      expect(response).toEqual(Buffer.from(FILE.replace(/^data:image\/\w+;base64,/, ''), 'base64'));
    });

    it('it should throw an exception if no file is present', () => {
      try {
        RequestManager.getImageBuffer(EVENT_ERROR);
      } catch (e) {
        expect(e.message).toBe(getMissingExceptionMessage());
      }
    });

    it('it should throw an exception if file is not an image', () => {
      jest.spyOn(ImageUtils, 'isJpg').mockReturnValue(false);
      jest.spyOn(ImageUtils, 'isPng').mockReturnValue(false);
      expect(() => RequestManager.getImageBuffer(EVENT)).toThrow(ImageFileParseException);
    });

    it('it should throw an exception if conversion fails', () => {
      jest.spyOn(Buffer, 'from').mockImplementation(() => {
        throw new Error('Exception');
      });

      try {
        RequestManager.getImageBuffer(EVENT);
      } catch (e) {
        expect(e.message).toBe(getParseExceptionMessage());
      }
    });

    function getParseExceptionMessage(): string {
      return 'Unable to parse file';
    }

    function getMissingExceptionMessage(): string {
      return 'Missing file in the body of the request';
    }
  });

  function tearUp(): void {
    createMocks();
  }

  function tearDown(): void {
    jest.resetAllMocks();
  }

  function createMocks(): void {
    jest.spyOn(ImageUtils, 'isJpg').mockReturnValue(true);
    jest.spyOn(ImageUtils, 'isPng').mockReturnValue(false);
  }
});
