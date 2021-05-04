import { CreateParkingLotUseCase } from '@/application/useCases';
import { ParkingLotRepositoryMemory } from '@/infra/repositories';
import { CreateParkingLotController } from '@/presentation/controllers';
import { randomString } from '@/tests/helpers/generators';

function makeSut(): CreateParkingLotController {
  const parkingLotRepository = new ParkingLotRepositoryMemory();
  const createParkingLot = new CreateParkingLotUseCase(parkingLotRepository);

  return new CreateParkingLotController(createParkingLot);
}

describe('CreateParkingLot Controller', () => {
  it('should return status 201 and a ParkingLot in body', async () => {
    const sut = makeSut();

    const httpResponse = await sut.handle({
      body: {
        name: randomString(10),
        password: randomString(8),
      },
    });

    expect(httpResponse.status).toBe(201);
    expect((httpResponse.body as any).password).toBe(undefined);
    expect(httpResponse.body.id).toHaveLength(36);
    expect(httpResponse.body.name).toHaveLength(10);
    expect(typeof httpResponse.body.createdAt).toBe('object');
    expect(typeof httpResponse.body.updatedAt).toBe('object');
  });
});
