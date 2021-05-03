import { IdGenerator } from '@/infra/adapters/IdGenerator';
import { ParkingLot } from '@/core/entities';
import { CreateParkingLotCredentials } from '@/core/useCases';
import { CreateParkingLotRepository } from '@/application/repositories';
import { utc } from '@/infra/helpers/date';

export class ParkingLotRepositoryMemory implements CreateParkingLotRepository {
  private parkingLots: ParkingLot[] = [];

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
    Promise.resolve(this.parkingLots.push(parkingLot));
  }

  public async findByName(name: string): Promise<ParkingLot | undefined> {
    const parkingLot = this.parkingLots.find(
      ({ name: parkingLotName }) => parkingLotName === name,
    );

    return Promise.resolve(parkingLot);
  }
}
