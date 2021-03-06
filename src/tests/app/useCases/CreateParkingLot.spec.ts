import { randomString } from '@/tests/helpers/generators';
import { Encrypter } from '@/application/adapters';
import { CreateParkingLotUseCase } from '@/application/useCases';
import { ParkingLotRepositoryMemory } from '@/infra/repositories';
import { CreateParkingLot } from '@/core/useCases';
import { NameInUseError } from '@/application/exceptions';

function makeSut(): CreateParkingLot {
  const parkingLotRepository = new ParkingLotRepositoryMemory();
  const sut = new CreateParkingLotUseCase(parkingLotRepository);

  return sut;
}

describe('CreateParkingLot UseCase', () => {
  it('should create a parking lot successfully', async () => {
    const sut = makeSut();
    const parkingLotPassword = randomString(8);
    const parkingLot = await sut.execute({
      name: randomString(12),
      password: parkingLotPassword,
    });

    expect(parkingLot.id).toHaveLength(36);
    expect(parkingLot.name).toHaveLength(12);
    expect(typeof parkingLot.createdAt).toBe('object');
    expect(typeof parkingLot.updatedAt).toBe('object');
    expect(parkingLot.password).toHaveLength(60);
    expect(await Encrypter.compare(parkingLotPassword, parkingLot.password))
      .toBe(true);
  });

  it(
    'should throw an AlreadyExistsError because Parking Lot already exists',
    async () => {
      const sut = makeSut();

      const parkingLotName = randomString(8);

      await sut.execute({
        name: parkingLotName,
        password: randomString(10),
      });

      try {
        await sut.execute({
          name: parkingLotName,
          password: randomString(10),
        });
      } catch (err) {
        expect(err).toEqual(new NameInUseError());
      }
    },
  );
});
