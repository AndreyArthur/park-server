import { ParkingLot } from '@/core/entities';

export type ParkingLotData = {
  id: string;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export class ParkingLotAdapter {
  public static create(data: ParkingLotData): ParkingLot {
    const { created_at, updated_at, ...parkingLot } = data;

    return {
      ...parkingLot,
      createdAt: created_at,
      updatedAt: updated_at,
    };
  }
}
