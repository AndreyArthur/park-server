import { Express, json } from 'express';
import {
  contentTypeMiddleware,
  corsMiddleware,
} from '@/main/http/middlewares';

export function middlewares(app: Express): void {
  app.use(json());
  app.use(corsMiddleware);
  app.use(contentTypeMiddleware);
}
