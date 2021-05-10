import request from 'supertest';

import { Database } from '@/infra/database';
import { app } from '@/main/http/setup';
import { randomCarPlate } from '@/tests/helpers/generators';

describe('/cars POST', () => {
  beforeAll(async () => {
    await Database.migrate();

    await Database.query('DELETE FROM cars');
  });
  afterEach(async () => {
    await Database.query('DELETE FROM cars');
  });
  afterAll(() => Database.close());

  it('should return 201 status and a Car in body', async () => {
    const { status, body } = await request(app).post('/cars')
      .send({ plate: randomCarPlate() });

    expect(status).toBe(201);
    expect(body.id).toHaveLength(36);
    expect(body.plate.match(/[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}/)).toBeTruthy();
    expect(typeof new Date(body.createdAt)).toBe('object');
    expect(typeof new Date(body.updatedAt)).toBe('object');
  });

  it('should return 401 status because car is already registered', async () => {
    const carPlate = randomCarPlate();

    await request(app).post('/cars').send({ plate: carPlate });

    const { status } = await request(app).post('/cars')
      .send({ plate: carPlate });

    expect(status).toBe(401);
  });

  it(
    'should return 400 status because Car plate has an incorrect syntax',
    async () => {
      const { status } = await request(app).post('/cars')
        .send({ plate: `0${randomCarPlate()}A` });

      expect(status).toBe(400);
    },
  );
});
