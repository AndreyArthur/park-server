import express from 'express';
import 'express-async-errors';

import { router } from '@/main/http/routes';
import { middlewares } from '@/main/http/setup/middlewares';
import { globalExceptionHandlerMiddleware } from '@/main/http/middlewares';

const app = express();

middlewares(app);
app.use(router);
app.use(globalExceptionHandlerMiddleware);

export { app };
