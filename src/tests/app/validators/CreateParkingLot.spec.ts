import {
  CreateParkingLotValidator,
} from '@/application/validators';
import { InvalidParamError, MissingParamError } from '@/application/exceptions';
import { randomString } from '@/tests/helpers/generators';

describe('CreateParkingLot Validator', () => {
  // To avoid jest coverage bugs with static methods
  it('should create a CreateParkingLotValidator instance', () => {
    const createParkingLotValidator = new CreateParkingLotValidator();

    expect(createParkingLotValidator).toBeInstanceOf(CreateParkingLotValidator);
  });

  it('should throw an error because no name is given', () => {
    try {
      CreateParkingLotValidator.validate({
        name: randomString(0),
        password: randomString(12),
      });
    } catch (err) {
      expect(err).toEqual(new MissingParamError('name'));
    }
  });

  it('should throw an error because no password is given', () => {
    try {
      CreateParkingLotValidator.validate({
        name: randomString(10),
        password: randomString(0),
      });
    } catch (err) {
      expect(err).toEqual(new MissingParamError('password'));
    }
  });

  it('should throw an error because name length is invalid', () => {
    try {
      CreateParkingLotValidator.validate({
        name: randomString(33),
        password: randomString(12),
      });
    } catch (err) {
      expect(err).toEqual(
        new InvalidParamError('name must have 4-32 characters'),
      );
      expect(err.name).toBe('InvalidParamError');
    }

    try {
      CreateParkingLotValidator.validate({
        name: randomString(3),
        password: randomString(12),
      });
    } catch (err) {
      expect(err).toEqual(
        new InvalidParamError('name must have 4-32 characters'),
      );
    }
  });

  it('should throw an error because password length is invalid', () => {
    try {
      CreateParkingLotValidator.validate({
        name: randomString(10),
        password: randomString(5),
      });
    } catch (err) {
      expect(err).toEqual(
        new InvalidParamError('password must have 6-36 characters'),
      );
    }

    try {
      CreateParkingLotValidator.validate({
        name: randomString(10),
        password: randomString(32),
      });
    } catch (err) {
      expect(err).toEqual(
        new InvalidParamError('password must have 6-36 characters'),
      );
    }
  });
});
