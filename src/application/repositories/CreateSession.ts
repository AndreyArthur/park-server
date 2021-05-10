import { ParkingLot } from '@/core/entities';

export interface CreateSessionRepository {
  findByName: (name: string) => Promise<ParkingLot | undefined>;
}
