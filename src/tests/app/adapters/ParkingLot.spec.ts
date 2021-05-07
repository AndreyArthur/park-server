import {
  IdGenerator,
  ParkingLotAdapter,
} from '@/infra/adapters';
import { utc } from '@/infra/helpers/date';
import { randomString } from '@/tests/helpers/generators';

describe('ParkingLot Adapter', () => {
  it('should create an instance of ParkingLotAdapter', () => {
    const parkingLotAdapter = new ParkingLotAdapter();

    expect(parkingLotAdapter).toBeInstanceOf(ParkingLotAdapter);
  });

  it('should adapt ParkingLotData to ParkingLot', () => {
    const parkingLotData = {
      id: IdGenerator.uuid(),
      name: randomString(12),
      password: randomString(8),
      created_at: utc(),
      updated_at: utc(),
    };

    const parkingLot = ParkingLotAdapter.create(parkingLotData);

    expect(parkingLot.id).toHaveLength(36);
    expect(parkingLot.name).toHaveLength(12);
    expect(parkingLot.password).toHaveLength(8);
    expect(typeof parkingLot.createdAt).toBe('object');
    expect(typeof parkingLot.updatedAt).toBe('object');
  });
});
