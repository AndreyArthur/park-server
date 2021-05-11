import { Router } from 'express';
import { carsRouter } from '@/main/http/routes/carsRouter';
import { parkingLotsRouter } from '@/main/http/routes/parkingLotsRouter';
import { sessionsRouter } from '@/main/http/routes/sessionsRouter';

const router = Router();

router.use('/parking-lots', parkingLotsRouter);
router.use('/cars', carsRouter);
router.use('/sessions', sessionsRouter);

export { router };
