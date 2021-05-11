export class AuthenticationError {
  private readonly message: string;

  private readonly name: string;

  constructor(message: string) {
    this.message = `Authentication Error: ${message}`;

    this.name = 'AuthenticationError';
  }
}
