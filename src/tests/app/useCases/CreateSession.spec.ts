import { AuthenticationError } from '@/application/exceptions';
import {
  CreateSessionUseCase,
  CreateParkingLotUseCase,
} from '@/application/useCases';
import { ParkingLotRepositoryMemory } from '@/infra/repositories';
import { randomString } from '@/tests/helpers/generators';

type SutTypes = {
  sut: CreateSessionUseCase;
  parkingLotRepository: ParkingLotRepositoryMemory
};

function makeSut(): SutTypes {
  const parkingLotRepository = new ParkingLotRepositoryMemory();
  const sut = new CreateSessionUseCase(parkingLotRepository);

  return {
    sut,
    parkingLotRepository,
  };
}

describe('CreateSession UseCase', () => {
  it('should create a session', async () => {
    const { sut, parkingLotRepository } = makeSut();
    const createParkingLot = new CreateParkingLotUseCase(
      parkingLotRepository,
    );
    const parkingLotPassword = randomString(8);
    const { name } = await createParkingLot.execute({
      name: randomString(10),
      password: parkingLotPassword,
    });
    const { token, parkingLot } = await sut.execute({
      name,
      password: parkingLotPassword,
    });

    expect(token.split('.')).toHaveLength(3);
    expect(parkingLot.password).toHaveLength(60);
    expect(parkingLot.id).toHaveLength(36);
    expect(parkingLot.name).toHaveLength(10);
    expect(typeof parkingLot.createdAt).toBe('object');
    expect(typeof parkingLot.updatedAt).toBe('object');
  });

  it('should throw an error bacause ParkingLot does not exist', async () => {
    const { sut } = makeSut();

    try {
      await sut.execute({
        name: randomString(10),
        password: randomString(10),
      });
    } catch (err) {
      expect(err).toEqual(
        new AuthenticationError('invalid name/password combination'),
      );
    }
  });

  it('should throw an error because ParkingLot password is wrong', async () => {
    const { sut, parkingLotRepository } = makeSut();
    const createParkingLot = new CreateParkingLotUseCase(
      parkingLotRepository,
    );
    const { name } = await createParkingLot.execute({
      name: randomString(10),
      password: randomString(10),
    });

    try {
      await sut.execute({
        name,
        password: randomString(10),
      });
    } catch (err) {
      expect(err).toEqual(
        new AuthenticationError('invalid name/password combination'),
      );
    }
  });
});
