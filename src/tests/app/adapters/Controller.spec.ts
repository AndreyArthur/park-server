import { ControllerAdapter } from '@/main/http/adapters';
import { CreateParkingLotControllerFactory } from '@/presentation/factories';

describe('Controller Adapter', () => {
  // to avoid jest coverade bugs with static methods
  it('should create a instance of ControllerAdapter', () => {
    const controllerAdapter = new ControllerAdapter();

    expect(controllerAdapter).toBeInstanceOf(ControllerAdapter);
  });

  it('should return a function', () => {
    const func = ControllerAdapter.create(
      CreateParkingLotControllerFactory.create(),
    );

    expect(typeof func).toBe('function');
  });
});
