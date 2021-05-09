import { CarAlreadyRegisteredError } from '@/application/exceptions';
import { CreateCarUseCase } from '@/application/useCases';
import { CarRepositoryMemory } from '@/infra/repositories';
import { randomCarPlate } from '@/tests/helpers/generators';

describe('CreateCar useCase', () => {
  it('should create a Car successfully', async () => {
    const sut = new CreateCarUseCase(new CarRepositoryMemory());
    const car = await sut.execute(randomCarPlate());

    expect(car.id).toHaveLength(36);
    expect(car.plate.match(/[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}/)).toBeTruthy();
    expect(typeof car.createdAt).toBe('object');
    expect(typeof car.updatedAt).toBe('object');
  });

  it('should throw an error because Car is already registered', async () => {
    const sut = new CreateCarUseCase(new CarRepositoryMemory());
    const carPlate = randomCarPlate();

    await sut.execute(carPlate);

    try {
      await sut.execute(carPlate);
    } catch (err) {
      expect(err).toEqual(new CarAlreadyRegisteredError());
    }
  });
});
