import { CreateCarRepository } from '@/application/repositories';
import { Car } from '@/core/entities';
import { CarAdapter, CarData, IdGenerator } from '@/infra/adapters';
import { Database } from '@/infra/database';
import { utc } from '@/infra/helpers/date';

export class CarRepositorySQL implements CreateCarRepository {
  public create(plate: string): Car {
    return {
      id: IdGenerator.uuid(),
      plate,
      createdAt: utc(),
      updatedAt: utc(),
    };
  }

  public async findByPlate(plate: string): Promise<Car | undefined> {
    const [car] = await Database.query<CarData[]>(
      'SELECT * FROM cars WHERE plate = ?', [plate],
    );

    if (!car) return undefined;

    return CarAdapter.create(car);
  }

  public async save(car: Car): Promise<void> {
    await Database.query(`
      INSERT INTO cars (
        id,
        plate,
        created_at,
        updated_at
      ) VALUES ( ?, ?, ?, ? )
    `, [
      car.id,
      car.plate,
      car.createdAt,
      car.updatedAt,
    ]);
  }
}
