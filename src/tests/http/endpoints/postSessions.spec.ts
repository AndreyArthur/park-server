import request from 'supertest';

import { app } from '@/main/http/setup';
import { randomString } from '@/tests/helpers/generators';
import { Database } from '@/infra/database';

describe('/sessions POST', () => {
  beforeAll(async () => {
    await Database.migrate();

    await Database.query('DELETE FROM parking_lots');
  });
  afterEach(async () => {
    await Database.query('DELETE FROM parking_lots');
  });
  afterAll(() => Database.close());

  it('should create a sessions with status 201', async () => {
    const parkingLotPassword = randomString(8);
    const { body: { name } } = await request(app).post('/parking-lots').send({
      name: randomString(10),
      password: parkingLotPassword,
    });
    const { body, status } = await request(app).post('/sessions').send({
      name,
      password: parkingLotPassword,
    });

    expect(status).toBe(200);
    expect(body.token.split('.')).toHaveLength(3);
    expect((body.parkingLot as any).password).toBe(undefined);
    expect(body.parkingLot.id).toHaveLength(36);
    expect(body.parkingLot.name).toHaveLength(10);
    expect(typeof new Date(body.parkingLot.createdAt)).toBe('object');
    expect(typeof new Date(body.parkingLot.updatedAt)).toBe('object');
  });

  it('should return 400 status on validation errors', async () => {
    const { body, status } = await request(app).post('/sessions').send({
      password: randomString(10),
    });

    expect(body.status).toBe('Bad Request');
    expect(status).toBe(400);
  });

  it('should return 401 status if ParkingLot does not exist', async () => {
    const { status, body } = await request(app).post('/sessions').send({
      name: randomString(10),
      password: randomString(8),
    });

    expect(status).toBe(401);
    expect(body.status).toBe('Unauthorized');
  });

  it('should return 401 status if ParkingLot password is wrong', async () => {
    const parkingLotName = randomString(10);

    await request(app).post('/parking-lots').send({
      name: parkingLotName,
      password: randomString(8),
    });

    const { status, body } = await request(app).post('/sessions').send({
      name: parkingLotName,
      password: randomString(8),
    });

    expect(status).toBe(401);
    expect(body.status).toBe('Unauthorized');
  });
});
