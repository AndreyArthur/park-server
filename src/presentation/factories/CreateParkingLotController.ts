import { CreateParkingLotUseCase } from '@/application/useCases';
import { ParkingLotRepositoryMemory } from '@/infra/repositories';
import { CreateParkingLotController } from '@/presentation/controllers';

export class CreateParkingLotControllerFactory {
  public static create(): CreateParkingLotController {
    const parkingLotsRepository = new ParkingLotRepositoryMemory();
    const createParkingLotUseCase = new CreateParkingLotUseCase(
      parkingLotsRepository,
    );

    return new CreateParkingLotController(createParkingLotUseCase);
  }
}
