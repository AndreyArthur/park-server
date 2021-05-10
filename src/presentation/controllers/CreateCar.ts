import { CreateCarUseCase } from '@/application/useCases';
import { Car } from '@/core/entities';
import { CarRepositoryMemory } from '@/infra/repositories';
import {
  Controller,
  HttpResponse,
  HttpRequest,
} from '@/presentation/protocols';

export class CreateCarController implements Controller {
  public async handle(
    httpRequest: HttpRequest<{ plate: string }>,
  ): Promise<HttpResponse<Car>> {
    const car = await new CreateCarUseCase(new CarRepositoryMemory())
      .execute(httpRequest.body.plate);

    return {
      status: 201,
      body: car,
    };
  }
}
