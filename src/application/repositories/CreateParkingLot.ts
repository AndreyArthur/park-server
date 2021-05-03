import { ParkingLot } from '@/core/entities';
import { CreateParkingLotCredentials } from '@/core/useCases';

export interface CreateParkingLotRepository {
  create: (credentials: CreateParkingLotCredentials) => ParkingLot;
  save: (parkingLot: ParkingLot) => Promise<void>;
  findByName: (name: string) => Promise<ParkingLot | undefined>;
}
