import { ParkingLot } from '@/core/entities';

export type CreateParkingLotCredentials = {
  name: string;
  password: string;
};

export interface CreateParkingLot {
  execute: (credentials: CreateParkingLotCredentials) => Promise<ParkingLot>;
}
