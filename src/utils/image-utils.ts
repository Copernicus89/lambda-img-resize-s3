export class ImageUtils {
  static isJpg(file: Buffer): boolean {
    if (!file || file.length < 3) {
      return false;
    }

    return file[0] === 255 && file[1] === 216 && file[2] === 255;
  }

  static isPng(file: Buffer) {
    if (!file || file.length < 8) {
      return false;
    }

    return (
      file[0] === 0x89 &&
      file[1] === 0x50 &&
      file[2] === 0x4e &&
      file[3] === 0x47 &&
      file[4] === 0x0d &&
      file[5] === 0x0a &&
      file[6] === 0x1a &&
      file[7] === 0x0a
    );
  }
}
