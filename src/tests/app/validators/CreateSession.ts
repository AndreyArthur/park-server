import { CreateSessionValidator } from '@/application/validators';
import { InvalidParamError, MissingParamError } from '@/application/exceptions';
import { randomString } from '@/tests/helpers/generators';

describe('CreateSession Validator', () => {
  it('should create a CreateSessionValidator instance', () => {
    const createSessionValidator = new CreateSessionValidator();

    expect(createSessionValidator).toBeInstanceOf(CreateSessionValidator);
  });

  it('should throw an error because no name is given', () => {
    try {
      CreateSessionValidator.validate({
        name: randomString(0),
        password: randomString(12),
      });
    } catch (err) {
      expect(err).toEqual(new MissingParamError('name'));
    }
  });

  it('should throw an error because no password is given', () => {
    try {
      CreateSessionValidator.validate({
        name: randomString(10),
        password: randomString(0),
      });
    } catch (err) {
      expect(err).toEqual(new MissingParamError('password'));
    }
  });

  it('should throw an error because name length is invalid', () => {
    try {
      CreateSessionValidator.validate({
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
      CreateSessionValidator.validate({
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
      CreateSessionValidator.validate({
        name: randomString(10),
        password: randomString(5),
      });
    } catch (err) {
      expect(err).toEqual(
        new InvalidParamError('password must have 6-36 characters'),
      );
    }

    try {
      CreateSessionValidator.validate({
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
