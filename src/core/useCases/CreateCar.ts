import { Car } from '../entities';

export interface CreateCar {
  execute: (plate: string) => Promise<Car>;
}
