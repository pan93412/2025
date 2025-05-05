export class BadServerSideDataException extends Error {
  constructor(message: string) {
    super(message)
    this.name = BadServerSideDataException.name
  }
}
