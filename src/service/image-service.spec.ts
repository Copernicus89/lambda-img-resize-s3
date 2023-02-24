import sharp from 'sharp';
import { ImageService } from './image-service';

jest.mock('sharp');

describe('image-service', () => {
  let imageService: ImageService;
  let sharpImageMock: any;

  const IMAGE = Buffer.from('');

  beforeEach(() => tearUp());
  afterEach(() => tearDown());

  describe('The instance', () => {
    it('should be a singleton', () => {
      imageService = ImageService.create();
      const imageService2 = ImageService.create();
      // @ts-ignore
      expect(imageService).toEqual(imageService2);
    });
  });

  describe('resize', () => {
    it('should resize image', async () => {
      await imageService.resize(IMAGE);
      expect(sharp).toHaveBeenCalledWith(IMAGE);
      expect(sharpImageMock.resize).toHaveBeenCalledWith({ width: 100 });
      expect(sharpImageMock.png).toHaveBeenCalledWith({ palette: true });
      expect(sharpImageMock.toBuffer).toHaveBeenCalled();
    });
  });

  function tearUp(): void {
    createMocks();
  }

  function tearDown(): void {
    // @ts-ignore
    ImageService.instance = null;
    jest.resetAllMocks();
  }

  function createMocks(): void {
    imageService = ImageService.create();

    sharpImageMock = {
      resize: jest.fn().mockReturnThis(),
      png: jest.fn().mockReturnThis(),
      toBuffer: jest.fn().mockReturnThis(),
    };

    // @ts-ignore
    sharp.mockImplementation(() => sharpImageMock);
  }
});
