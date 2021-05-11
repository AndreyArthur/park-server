import { Router } from 'express';
import { CreateSessionControllerFactory } from '@/presentation/factories';
import { ControllerAdapter } from '@/main/http/adapters';

const sessionsRouter = Router();

sessionsRouter.post('/', ControllerAdapter.create(
  CreateSessionControllerFactory.create(),
));

export { sessionsRouter };
