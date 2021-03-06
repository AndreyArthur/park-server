import { Car } from '@/core/entities';
import { CreateCar } from '@/core/useCases';
import { CreateCarRepository } from '@/application/repositories';
import { CarAlreadyRegisteredError } from '@/application/exceptions';
import { CreateCarValidator } from '@/application/validators';

export class CreateCarUseCase implements CreateCar {
  private createCarRepository: CreateCarRepository;

  constructor(createCarRepository: CreateCarRepository) {
    this.createCarRepository = createCarRepository;
  }

  public async execute(plate: string): Promise<Car> {
    CreateCarValidator.validate(plate);

    const carExists = await this.createCarRepository.findByPlate(plate);

    if (carExists) throw new CarAlreadyRegisteredError();

    const car = this.createCarRepository.create(plate);

    await this.createCarRepository.save(car);
    return car;
  }
}
