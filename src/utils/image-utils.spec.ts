import { ImageUtils } from './image-utils';

describe('ImageUtils', () => {
  describe('isJpg', () => {
    let image: Buffer;
    it('should return true if file is a jpg', () => {
      image = createJpg();
      const result = ImageUtils.isJpg(image);

      expect(result).toEqual(true);
    });

    it('should return false if file is not a jpg', () => {
      image = createPng();
      const result = ImageUtils.isJpg(image);

      expect(result).toEqual(false);
    });

    it('should return false if file less than 3 bytes', () => {
      image = Buffer.alloc(2);
      const result = ImageUtils.isJpg(image);

      expect(result).toEqual(false);
    });
  });

  describe('isPng', () => {
    let image: Buffer;
    it('should return true if file is a png', () => {
      image = createPng();
      const result = ImageUtils.isPng(image);

      expect(result).toEqual(true);
    });

    it('should return false if file is not a png', () => {
      image = createJpg();
      const result = ImageUtils.isPng(image);

      expect(result).toEqual(false);
    });

    it('should return false if file less than 8 bytes', () => {
      image = Buffer.alloc(7);
      const result = ImageUtils.isPng(image);

      expect(result).toEqual(false);
    });
  });

  function createJpg(): Buffer {
    const buffer = Buffer.alloc(3);
    buffer[0] = 255;
    buffer[1] = 216;
    buffer[2] = 255;
    return buffer;
  }

  function createPng(): Buffer {
    const buffer = Buffer.alloc(8);
    buffer[0] = 0x89;
    buffer[1] = 0x50;
    buffer[2] = 0x4e;
    buffer[3] = 0x47;
    buffer[4] = 0x0d;
    buffer[5] = 0x0a;
    buffer[6] = 0x1a;
    buffer[7] = 0x0a;
    return buffer;
  }
});
