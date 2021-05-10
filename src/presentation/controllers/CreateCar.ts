import { Car } from '@/core/entities';
import { CreateCar } from '@/core/useCases';
import {
  Controller,
  HttpResponse,
  HttpRequest,
} from '@/presentation/protocols';

export class CreateCarController implements Controller {
  private createCar: CreateCar;

  constructor(createCar: CreateCar) {
    this.createCar = createCar;
  }

  public async handle(
    httpRequest: HttpRequest<{ plate: string }>,
  ): Promise<HttpResponse<Car>> {
    const car = await this.createCar.execute(httpRequest.body.plate);

    return {
      status: 201,
      body: car,
    };
  }
}
