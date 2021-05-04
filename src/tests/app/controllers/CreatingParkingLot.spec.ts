import { CreateParkingLotController } from '@/presentation/controllers';
import { randomString } from '@/tests/helpers/generators';

describe('CreateParkingLot Controller', () => {
  it('should return status 201 and a ParkingLot in body', async () => {
    const sut = new CreateParkingLotController();

    const httpResponse = await sut.handle({
      body: {
        name: randomString(10),
        password: randomString(8),
      },
    });

    expect(httpResponse.status).toBe(201);
    expect((httpResponse.body as any).password).toBe(undefined);
    expect(httpResponse.body.id).toHaveLength(36);
    expect(httpResponse.body.name).toHaveLength(10);
    expect(typeof httpResponse.body.createdAt).toBe('object');
    expect(typeof httpResponse.body.updatedAt).toBe('object');
  });
});
