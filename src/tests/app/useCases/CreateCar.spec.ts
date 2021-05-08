import { CreateCarUseCase } from '@/application/useCases';
import { randomCarPlate } from '@/tests/helpers/generators';

describe('CreateCar useCase', () => {
  it('should create a Car successfully', async () => {
    const sut = new CreateCarUseCase();
    const car = await sut.execute(randomCarPlate());

    expect(car.id).toHaveLength(36);
    expect(car.plate.match(/[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}/)).toBeTruthy();
    expect(typeof car.createdAt).toBe('object');
    expect(typeof car.updatedAt).toBe('object');
  });
});
