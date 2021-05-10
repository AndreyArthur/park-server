import { Router } from 'express';
import { CreateCarControllerFactory } from '@/presentation/factories';
import { ControllerAdapter } from '@/main/http/adapters';

const carsRouter = Router();

carsRouter.post('/', ControllerAdapter.create(
  CreateCarControllerFactory.create(),
));

export { carsRouter };
