import { ParkingLot } from '@/core/entities';
import { ParkingLotRepositoryMemory } from '@/infra/repositories';
import { randomString } from '@/tests/helpers/generators';

function makeSut(): ParkingLotRepositoryMemory {
  return new ParkingLotRepositoryMemory();
}

describe('ParkingLotsMemory Repository', () => {
  it('should return a ParkingLot', () => {
    const sut = makeSut();
    const parkingLot = sut.create({
      name: randomString(10),
      password: randomString(8),
    });

    expect(parkingLot.id).toHaveLength(36);
    expect(parkingLot.name).toHaveLength(10);
    expect(parkingLot.password).toHaveLength(8);
    expect(typeof parkingLot.createdAt).toBe('object');
    expect(typeof parkingLot.updatedAt).toBe('object');
  });

  it('should find a ParkingLot by name', async () => {
    const sut = makeSut();
    const parkingLotName = randomString(10);

    await sut.save(sut.create({
      name: parkingLotName,
      password: randomString(8),
    }));

    const parkingLot = await sut.findByName(parkingLotName) as ParkingLot;

    expect(parkingLot.id).toHaveLength(36);
    expect(parkingLot.name).toHaveLength(10);
    expect(parkingLot.password).toHaveLength(8);
    expect(typeof parkingLot.createdAt).toBe('object');
    expect(typeof parkingLot.updatedAt).toBe('object');
  });

  it('should return undefined because ParkingLot does not exist', async () => {
    const sut = makeSut();

    const parkingLot = await sut.findByName(randomString(10));

    expect(parkingLot).toBe(undefined);
  });

  it('should return undefined because ParkingLot was not found', async () => {
    const sut = makeSut();
    const parkingLot = await sut.findByName(randomString(8));

    expect(parkingLot).toBe(undefined);
  });

  it('should save 3 ParkingLots', async () => {
    const sut = makeSut();

    async function saveParkingLot(): Promise<ParkingLot> {
      const parkingLot = sut.create({
        name: randomString(10),
        password: randomString(8),
      });

      await sut.save(parkingLot);

      return parkingLot;
    }

    const savedParkingLots: ParkingLot[] = [];

    savedParkingLots.push(await saveParkingLot());
    savedParkingLots.push(await saveParkingLot());
    savedParkingLots.push(await saveParkingLot());

    expect(savedParkingLots[2].id).toHaveLength(36);
    expect(savedParkingLots[2].name).toHaveLength(10);
    expect(savedParkingLots[2].password).toHaveLength(8);
    expect(typeof savedParkingLots[2].createdAt).toBe('object');
    expect(typeof savedParkingLots[2].updatedAt).toBe('object');
  });
});
