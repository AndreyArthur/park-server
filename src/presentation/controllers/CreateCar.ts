import { Car } from '@/core/entities';
import {
  Controller,
  HttpResponse,
  HttpRequest,
} from '@/presentation/protocols';

export class CreateCarController implements Controller {
  public async handle(
    httpRequest: HttpRequest<{ plate: string }>,
  ): Promise<HttpResponse<Car>> {
    return {
      status: 201,
      body: {
        id: '9b05a590-318e-44ce-9b2c-df9b231de406',
        plate: httpRequest.body.plate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }
}
