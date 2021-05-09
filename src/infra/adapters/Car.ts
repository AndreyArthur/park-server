import { Car } from '@/core/entities';

export type CarData = {
  id: string;
  plate: string;
  created_at: Date;
  updated_at: Date;
};

export class CarAdapter {
  public static create(carData: CarData): Car {
    const { created_at, updated_at, ...car } = carData;

    return {
      ...car,
      createdAt: created_at,
      updatedAt: updated_at,
    };
  }
}
