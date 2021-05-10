import { CreateCarUseCase } from '@/application/useCases';
import { CarRepositorySQL } from '@/infra/repositories';
import { CreateCarController } from '@/presentation/controllers';

export class CreateCarControllerFactory {
  public static create(): CreateCarController {
    const carRepository = new CarRepositorySQL();
    const createCar = new CreateCarUseCase(carRepository);

    return new CreateCarController(createCar);
  }
}
