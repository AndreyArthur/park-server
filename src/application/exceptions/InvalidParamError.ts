export class InvalidParamError {
  public readonly message: string;

  public readonly name: string;

  constructor(message: string) {
    this.message = `Invalid param: ${message}`;
    this.name = 'InvalidParamError';
  }
}
