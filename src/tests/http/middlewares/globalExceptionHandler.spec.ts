import request from 'supertest';

import { InvalidParamError } from '@/application/exceptions';
import { app } from '@/main/http/setup';
import { globalExceptionHandlerMiddleware } from '@/main/http/middlewares';

describe('globalExceptionHandler Middleware', () => {
  it('should respond with 400 status', async () => {
    app.get('/test_global_exception_handler_400', () => {
      throw new InvalidParamError('param');
    });
    app.use(globalExceptionHandlerMiddleware);

    const { status } = await request(app)
      .get('/test_global_exception_handler_400');

    expect(status).toBe(400);
  });

  it('should respond with 500 status', async () => {
    app.get('/test_global_exception_handler_500', () => {
      throw new Error('message');
    });
    app.use(globalExceptionHandlerMiddleware);

    const { status } = await request(app)
      .get('/test_global_exception_handler_500');

    expect(status).toBe(500);
  });
});
