import { CreateParkingLotCredentials } from '@/core/useCases';
import {
  Controller, HttpRequest, HttpResponse,
} from '@/presentation/protocols';

export class CreateParkingLotController implements Controller {
  public async handle(
    httpRequest: HttpRequest<CreateParkingLotCredentials>,
  ): Promise<HttpResponse> {
    return Promise.resolve({
      status: 201,
      body: {
        id: '88ca7ea5-4980-4240-b103-69cd5d5a6435',
        name: httpRequest.body.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
