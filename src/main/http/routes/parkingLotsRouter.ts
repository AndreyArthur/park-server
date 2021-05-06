import {
  CreateParkingLotControllerFactory,
} from '@/presentation/factories';
import { Router } from 'express';
import { ControllerAdapter } from '@/main/http/adapters';

const parkingLotsRouter = Router();

parkingLotsRouter.post('/', ControllerAdapter.create(
  CreateParkingLotControllerFactory.create(),
));

export { parkingLotsRouter };
