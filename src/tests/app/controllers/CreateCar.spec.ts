import { randomCarPlate } from '@/tests/helpers/generators';
import { CreateCarController } from '@/presentation/controllers';
import { CreateCarUseCase } from '@/application/useCases';
import { CarRepositoryMemory } from '@/infra/repositories';

function makeSut(): CreateCarController {
  const carRepositoryMemory = new CarRepositoryMemory();
  const createCarUseCase = new CreateCarUseCase(carRepositoryMemory);

  return new CreateCarController(createCarUseCase);
}

describe('CreateCar Controller', () => {
  it('should return status 201 and a Car in body', async () => {
    const sut = makeSut();
    const { status, body } = await sut.handle({
      body: {
        plate: randomCarPlate(),
      },
    });

    expect(status).toBe(201);
    expect(body.id).toHaveLength(36);
    expect(body.plate.match(/[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}/)).toBeTruthy();
    expect(typeof body.createdAt).toBe('object');
    expect(typeof body.createdAt).toBe('object');
  });
});
