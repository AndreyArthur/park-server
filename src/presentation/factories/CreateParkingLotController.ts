import { CreateParkingLotUseCase } from '@/application/useCases';
import { ParkingLotRepositorySQL } from '@/infra/repositories';
import { CreateParkingLotController } from '@/presentation/controllers';

export class CreateParkingLotControllerFactory {
  public static create(): CreateParkingLotController {
    const parkingLotRepository = new ParkingLotRepositorySQL();
    const createParkingLotUseCase = new CreateParkingLotUseCase(
      parkingLotRepository,
    );

    return new CreateParkingLotController(createParkingLotUseCase);
  }
}
