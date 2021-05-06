import { CreateParkingLotController } from '@/presentation/controllers';
import { CreateParkingLotControllerFactory } from '@/presentation/factories';

describe('CreateParkingLotController Factory', () => {
  // To avoid jest coverage bugs with static methods
  it('should create a instance of CreateParkingLotControllerFactory', () => {
    const createParkingLotControllerF = new CreateParkingLotControllerFactory();

    expect(createParkingLotControllerF).toBeInstanceOf(
      CreateParkingLotControllerFactory,
    );
  });

  it('should return a CreateParkingLotController instance', () => {
    const createParkingLotController = CreateParkingLotControllerFactory
      .create();

    expect(createParkingLotController)
      .toBeInstanceOf(CreateParkingLotController);
  });
});
