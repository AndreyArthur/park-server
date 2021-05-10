import { MissingParamError, InvalidParamError } from '@/application/exceptions';
import { CreateSessionCredentials } from '@/core/useCases';

export class CreateSessionValidator {
  public static validate(
    { name, password }: CreateSessionCredentials,
  ): void {
    if (!name) throw new MissingParamError('name');
    if (!password) throw new MissingParamError('password');
    if (name.length < 4 || name.length > 32) {
      throw new InvalidParamError('name must have 4-32 characters');
    }
    if (password.length < 6 || password.length > 36) {
      throw new InvalidParamError('password must have 6-36 characters');
    }
  }
}
