import { CreateSessionUseCase } from '@/application/useCases';
import { ParkingLotRepositorySQL } from '@/infra/repositories';
import { CreateSessionController } from '@/presentation/controllers';

export class CreateSessionControllerFactory {
  public static create(): CreateSessionController {
    const parkingLotRepository = new ParkingLotRepositorySQL();
    const createSession = new CreateSessionUseCase(
      parkingLotRepository,
    );

    return new CreateSessionController(createSession);
  }
}
