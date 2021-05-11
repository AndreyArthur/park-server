import { CreateSessionController } from '@/presentation/controllers';
import { CreateSessionControllerFactory } from '@/presentation/factories';

describe('CreateSessionController Factory', () => {
  it('should create an instance of CreateSessionControllerFactory', () => {
    const createSessionControllerFactory = new CreateSessionControllerFactory();

    expect(createSessionControllerFactory).toBeInstanceOf(
      CreateSessionControllerFactory,
    );
  });

  it('should return a CreateSessionController instance', () => {
    const createSessionController = CreateSessionControllerFactory.create();

    expect(createSessionController).toBeInstanceOf(
      CreateSessionController,
    );
  });
});
