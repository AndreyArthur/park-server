import { CreateParkingLotUseCase } from '@/application/useCases';
import { ParkingLot } from '@/core/entities';
import { CreateParkingLotCredentials } from '@/core/useCases';
import { ParkingLotRepositoryMemory } from '@/infra/repositories';
import {
  Controller, HttpRequest, HttpResponse,
} from '@/presentation/protocols';

export class CreateParkingLotController implements Controller {
  public async handle(
    httpRequest: HttpRequest<CreateParkingLotCredentials>,
  ): Promise<HttpResponse<Omit<ParkingLot, 'password'>>> {
    const parkingLotRepository = new ParkingLotRepositoryMemory();
    const createParkingLot = new CreateParkingLotUseCase(parkingLotRepository);
    const {
      password,
      ...parkingLot
    } = await createParkingLot.execute(httpRequest.body);

    return {
      status: 201,
      body: parkingLot,
    };
  }
}
