import { Express, json } from 'express';
import { contentTypeMiddleware } from '../middlewares/contentType';
import { corsMiddleware } from '../middlewares/cors';

export function middlewares(app: Express): void {
  app.use(json());
  app.use(corsMiddleware);
  app.use(contentTypeMiddleware);
}
