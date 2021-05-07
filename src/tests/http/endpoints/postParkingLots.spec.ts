import request from 'supertest';

import { app } from '@/main/http/setup';
import { randomString } from '@/tests/helpers/generators';
import { Database } from '@/infra/database';

describe('/parking-lots POST', () => {
  beforeAll(async () => {
    await Database.migrate();

    await Database.query('DELETE FROM parking_lots');
  });
  afterEach(async () => {
    await Database.query('DELETE FROM parking_lots');
  });
  afterAll(() => Database.close());

  it('should create a parking lot with status 201', async () => {
    const { body, status } = await request(app).post('/parking-lots').send({
      name: randomString(10),
      password: randomString(8),
    });

    expect(status).toBe(201);
    expect(body.password).toBe(undefined);
    expect(body.id).toHaveLength(36);
    expect(body.name).toHaveLength(10);
    expect(typeof new Date(body.createdAt)).toBe('object');
    expect(typeof new Date(body.updatedAt)).toBe('object');
  });

  it('should return 400 status on validation errors', async () => {
    const { body, status } = await request(app).post('/parking-lots').send({
      password: randomString(10),
    });

    expect(body.status).toBe('Bad Request');
    expect(status).toBe(400);
  });

  it('should return 401 status if given name is already in use', async () => {
    const parkingLotName = randomString(10);

    await request(app).post('/parking-lots').send({
      name: parkingLotName,
      password: randomString(8),
    });

    const { status, body } = await request(app).post('/parking-lots').send({
      name: parkingLotName,
      password: randomString(8),
    });

    expect(status).toBe(401);
    expect(body.status).toBe('Unauthorized');
  });
});
