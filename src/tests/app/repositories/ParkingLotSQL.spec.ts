import { ParkingLot } from '@/core/entities';
import { Database } from '@/infra/database';
import { ParkingLotRepositorySQL } from '@/infra/repositories';
import { randomString } from '@/tests/helpers/generators';

function makeSut(): ParkingLotRepositorySQL {
  return new ParkingLotRepositorySQL();
}

describe('ParkinkLotSQL Repository', () => {
  beforeAll(async () => {
    await Database.migrate();

    await Database.query('DELETE FROM parking_lots');
  });
  afterEach(async () => {
    await Database.query('DELETE FROM parking_lots');
  });
  afterAll(() => Database.close());

  it('should create a ParkingLot', () => {
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
