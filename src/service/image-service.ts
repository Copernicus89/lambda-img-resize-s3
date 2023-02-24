import sharp from 'sharp';

export class ImageService {
  static instance: ImageService;

  static create(): ImageService {
    if (!this.instance) {
      this.instance = new ImageService();
    }
    return this.instance;
  }

  async resize(image: Buffer): Promise<Buffer> {
    const sharpImage = sharp(image);

    return sharpImage.resize({ width: 100 }).png({ palette: true }).toBuffer();
  }
}
