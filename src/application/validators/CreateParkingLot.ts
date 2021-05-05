import { MissingParamError, InvalidParamError } from '@/application/exceptions';
import { CreateParkingLotCredentials } from '@/core/useCases';

export class CreateParkingLotValidator {
  public static validate(
    { name, password }: CreateParkingLotCredentials,
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
