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
  const sut = new CreateSessionUseCase();

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
});
