import { CreateParkingLotRepository } from '@/application/repositories';
import { ParkingLot } from '@/core/entities';
import { CreateParkingLotCredentials } from '@/core/useCases';
import { ParkingLotAdapter, ParkingLotData } from '@/infra/adapters';
import { utc } from '@/infra/helpers/date';
import { IdGenerator } from '../adapters';
import { Database } from '../database';

export class ParkingLotRepositorySQL implements CreateParkingLotRepository {
  public create({ name, password }: CreateParkingLotCredentials): ParkingLot {
    return {
      id: IdGenerator.uuid(),
      name,
      password,
      createdAt: utc(),
      updatedAt: utc(),
    };
  }

  public async save(parkingLot: ParkingLot): Promise<void> {
    await Database.query(`
      INSERT INTO parking_lots (
        id,
        name,
        password,
        created_at,
        updated_at
      ) VALUES ( ?, ?, ?, ?, ? )
    `, [
      parkingLot.id,
      parkingLot.name,
      parkingLot.password,
      parkingLot.createdAt,
      parkingLot.updatedAt,
    ]);
  }

  public async findByName(name: string): Promise<ParkingLot | undefined> {
    const [parkingLot] = (await Database.query<ParkingLotData[]>(
      'SELECT * FROM parking_lots WHERE name = ?', [name],
    ));

    if (!parkingLot) return undefined;

    return ParkingLotAdapter.create(parkingLot);
  }
}
