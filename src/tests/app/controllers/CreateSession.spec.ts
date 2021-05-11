import {
  CreateParkingLotUseCase, CreateSessionUseCase,
} from '@/application/useCases';
import { ParkingLotRepositoryMemory } from '@/infra/repositories';
import { CreateSessionController } from '@/presentation/controllers';
import { randomString } from '@/tests/helpers/generators';

type SutTypes = {
  sut: CreateSessionController;
  parkingLotRepository: ParkingLotRepositoryMemory;
};

function makeSut(): SutTypes {
  const parkingLotRepository = new ParkingLotRepositoryMemory();
  const createSession = new CreateSessionUseCase(parkingLotRepository);

  return {
    sut: new CreateSessionController(createSession),
    parkingLotRepository,
  };
}

describe('CreateParkingLot Controller', () => {
  it('should return status 200, a ParkingLot and Token in body', async () => {
    const { sut, parkingLotRepository } = makeSut();
    const parkingLotPassword = randomString(8);
    const { name } = await new CreateParkingLotUseCase(parkingLotRepository)
      .execute({
        name: randomString(10),
        password: parkingLotPassword,
      });

    const { body, status } = await sut.handle({
      body: {
        name,
        password: parkingLotPassword,
      },
    });

    expect(status).toBe(200);
    expect(body.token.split('.')).toHaveLength(3);
    expect((body.parkingLot as any).password).toBe(undefined);
    expect(body.parkingLot.id).toHaveLength(36);
    expect(body.parkingLot.name).toHaveLength(10);
    expect(typeof body.parkingLot.createdAt).toBe('object');
    expect(typeof body.parkingLot.updatedAt).toBe('object');
  });
});
