import { Car } from '@/core/entities';
import { CreateCar } from '@/core/useCases';

export class CreateCarUseCase implements CreateCar {
  public async execute(plate: string): Promise<Car> {
    return {
      id: '49907187-7e4e-4c73-aaf3-6a28eb9a21a4',
      plate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
