import { Car } from '@/core/entities';
import { Database } from '@/infra/database';
import { CarRepositorySQL } from '@/infra/repositories';
import { randomCarPlate } from '@/tests/helpers/generators';

function makeSut(): CarRepositorySQL {
  return new CarRepositorySQL();
}

describe('CarSQL Repository', () => {
  beforeAll(async () => {
    await Database.migrate();

    await Database.query('DELETE FROM cars');
  });
  afterEach(async () => {
    await Database.query('DELETE FROM cars');
  });
  afterAll(() => Database.close());

  it('should create a Car', () => {
    const sut = makeSut();
    const car = sut.create(randomCarPlate());

    expect(car.id).toHaveLength(36);
    expect(car.plate.match(/[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}/)).toBeTruthy();
    expect(typeof car.createdAt).toBe('object');
    expect(typeof car.updatedAt).toBe('object');
  });

  it('should find a Car', async () => {
    const sut = makeSut();
    const carPlate = randomCarPlate();

    await sut.save(sut.create(carPlate));

    const car = await sut.findByPlate(carPlate) as Car;

    expect(car.id).toHaveLength(36);
    expect(car.plate.match(/[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}/)).toBeTruthy();
    expect(typeof car.createdAt).toBe('object');
    expect(typeof car.updatedAt).toBe('object');
  });

  it('should save a 3 Cars', async () => {
    const sut = makeSut();

    async function saveCar(): Promise<Car> {
      const car = sut.create(randomCarPlate());

      await sut.save(car);

      return car;
    }

    const savedCars: Car[] = [];

    savedCars.push(await saveCar());
    savedCars.push(await saveCar());
    savedCars.push(await saveCar());

    expect(savedCars[2].id).toHaveLength(36);
    expect(
      savedCars[2].plate.match(/[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}/),
    ).toBeTruthy();
    expect(typeof savedCars[2].createdAt).toBe('object');
    expect(typeof savedCars[2].updatedAt).toBe('object');
  });
});
