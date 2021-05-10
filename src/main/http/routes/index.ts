import { Router } from 'express';
import { carsRouter } from './carsRouter';
import { parkingLotsRouter } from './parkingLotsRouter';

const router = Router();

router.use('/parking-lots', parkingLotsRouter);
router.use('/cars', carsRouter);

export { router };
