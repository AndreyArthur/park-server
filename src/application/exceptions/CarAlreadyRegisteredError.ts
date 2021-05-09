export class CarAlreadyRegisteredError {
  private readonly message: string;

  constructor() {
    this.message = 'Car already registered';
  }
}
