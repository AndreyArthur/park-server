import { CreateParkingLotUseCase } from '@/application/useCases';
import { ParkingLotRepositorySQL } from '@/infra/repositories';
import { CreateParkingLotController } from '@/presentation/controllers';

export class CreateParkingLotControllerFactory {
  public static create(): CreateParkingLotController {
    const parkingLotsRepository = new ParkingLotRepositorySQL();
    const createParkingLotUseCase = new CreateParkingLotUseCase(
      parkingLotsRepository,
    );

    return new CreateParkingLotController(createParkingLotUseCase);
  }
}
