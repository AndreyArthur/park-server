import { InvalidParamError, MissingParamError } from '@/application/exceptions';
import { CreateCarValidator } from '@/application/validators';
import { randomCarPlate } from '@/tests/helpers/generators';

describe('CreateCar Validator', () => {
  it('should create an instance of CreateCarValidator', () => {
    const createCarValidator = new CreateCarValidator();

    expect(createCarValidator).toBeInstanceOf(CreateCarValidator);
  });

  it('should throw an error because plate has no content', () => {
    try {
      CreateCarValidator.validate('');
    } catch (err) {
      expect(err).toEqual(new MissingParamError('plate'));
    }
  });

  it('should throw an error because plate has incorrect syntax', () => {
    try {
      CreateCarValidator.validate(`${randomCarPlate()}A`);
    } catch (err) {
      expect(err).toEqual(
        new InvalidParamError('plate must match with "XXX0X00"'),
      );
    }
  });
});
