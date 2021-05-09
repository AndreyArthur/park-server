import { Car } from '@/core/entities';

export interface CreateCarRepository {
  findByPlate: (plate: string) => Promise<Car | undefined>;
  create: (plate: string) => Car;
  save: (car: Car) => Promise<void>;
}
