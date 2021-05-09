import { CreateCarRepository } from '@/application/repositories';
import { Car } from '@/core/entities';
import { IdGenerator } from '@/infra/adapters';
import { utc } from '@/infra/helpers/date';

export class CarRepositoryMemory implements CreateCarRepository {
  private cars: Car[] = [];

  public create(plate: string): Car {
    return {
      id: IdGenerator.uuid(),
      plate,
      createdAt: utc(),
      updatedAt: utc(),
    };
  }

  public async findByPlate(plate: string): Promise<Car | undefined> {
    return Promise.resolve(this.cars.find((car) => car.plate === plate));
  }

  public async save(car: Car): Promise<void> {
    Promise.resolve(this.cars.push(car));
  }
}
