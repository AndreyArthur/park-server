import { InvalidParamError, MissingParamError } from '@/application/exceptions';

export class CreateCarValidator {
  public static validate(plate: string): void {
    if (!plate) throw new MissingParamError('plate');
    if (!plate.match(/^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/)) {
      throw new InvalidParamError('plate must match with "XXX0X00"');
    }
  }
}
