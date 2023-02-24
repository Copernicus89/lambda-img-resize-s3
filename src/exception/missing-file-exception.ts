export default class MissingFileException extends Error {
  constructor() {
    super('Missing file in the body of the request');
  }
}
