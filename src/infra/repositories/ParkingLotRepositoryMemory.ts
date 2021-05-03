import crypto from 'crypto';

import { ParkingLot } from '@/core/entities';
import { CreateParkingLotCredentials } from '@/core/useCases';
import { CreateParkingLotRepository } from '@/application/repositories';

export class ParkingLotRepositoryMemory implements CreateParkingLotRepository {
  private parkingLots: ParkingLot[] = [];

  public create({ name, password }: CreateParkingLotCredentials): ParkingLot {
    return {
      id: crypto.randomBytes(16).toString('hex'),
      name,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
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
