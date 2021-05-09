import { CarAdapter, IdGenerator } from '@/infra/adapters';
import { utc } from '@/infra/helpers/date';
import { randomCarPlate } from '@/tests/helpers/generators';

describe('Car Adapter', () => {
  it('should create an instance of CarAdapter', () => {
    const carAdapter = new CarAdapter();

    expect(carAdapter).toBeInstanceOf(CarAdapter);
  });

  it('should adapt CarData', () => {
    const carData = {
      id: IdGenerator.uuid(),
      plate: randomCarPlate(),
      created_at: utc(),
      updated_at: utc(),
    };

    const car = CarAdapter.create(carData);

    expect(car.id).toHaveLength(36);
    expect(car.plate.match(/[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}/)).toBeTruthy();
    expect(typeof car.createdAt).toBe('object');
    expect(typeof car.updatedAt).toBe('object');
  });
});
