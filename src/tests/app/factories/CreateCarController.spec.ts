import { CreateCarController } from '@/presentation/controllers';
import { CreateCarControllerFactory } from '@/presentation/factories';

describe('CreateCarController Factory', () => {
  it('should create an instance of CreateCarControllerFactory', () => {
    const createCarControllerFactory = new CreateCarControllerFactory();

    expect(createCarControllerFactory).toBeInstanceOf(
      CreateCarControllerFactory,
    );
  });

  it('should return a CreateCarController instance', () => {
    const createCarController = CreateCarControllerFactory.create();

    expect(createCarController).toBeInstanceOf(CreateCarController);
  });
});
