import { Router } from 'express';
import { parkingLotsRouter } from './parkingLotsRouter';

const router = Router();

router.use('/parking-lots', parkingLotsRouter);

export { router };
