export class NameInUseError {
  public readonly message: string;

  public readonly name: string;

  constructor() {
    this.message = 'The received name is already in use';
    this.name = 'EmailInUseError';
  }
}
