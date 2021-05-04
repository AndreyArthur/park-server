import { ParkingLot } from '@/core/entities';
import { CreateParkingLot, CreateParkingLotCredentials } from '@/core/useCases';
import {
  Controller, HttpRequest, HttpResponse,
} from '@/presentation/protocols';

export class CreateParkingLotController implements Controller {
  private createParkingLot: CreateParkingLot;

  constructor(createParkingLot: CreateParkingLot) {
    this.createParkingLot = createParkingLot;
  }

  public async handle(
    httpRequest: HttpRequest<CreateParkingLotCredentials>,
  ): Promise<HttpResponse<Omit<ParkingLot, 'password'>>> {
    const {
      password,
      ...parkingLot
    } = await this.createParkingLot.execute(httpRequest.body);

    return {
      status: 201,
      body: parkingLot,
    };
  }
}
