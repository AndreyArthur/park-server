export class AlreadyExistsError {
  public readonly message: string;

  constructor(entity: string) {
    this.message = `${entity} already exists`;
  }
}
