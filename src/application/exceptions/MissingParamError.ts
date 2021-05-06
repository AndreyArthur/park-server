export class MissingParamError {
  public readonly message: string;

  public readonly name: string;

  constructor(param: string) {
    this.message = `Missing param: ${param}`;
    this.name = 'MissingParamError';
  }
}
