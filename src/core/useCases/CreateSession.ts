import { ParkingLot } from '@/core/entities';

export type CreateSessionCredentials = {
  name: string;
  password: string;
};

export type CreateSessionReturnType = {
  token: string;
  parkingLot: ParkingLot;
};

export interface CreateSession {
  execute: (
    { name, password }: CreateSessionCredentials
  ) => Promise<CreateSessionReturnType>;
}
