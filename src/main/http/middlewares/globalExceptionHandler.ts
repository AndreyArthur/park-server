import {
  InvalidParamError,
  MissingParamError,
  NameInUseError,
} from '@/application/exceptions';
import { NextFunction, Request, Response } from 'express';

export function globalExceptionHandlerMiddleware(
  err: Error, req: Request, res: Response, _next: NextFunction,
): Response {
  if (err instanceof MissingParamError || err instanceof InvalidParamError) {
    return res.status(400).send({
      status: 'Bad Request',
      message: err.message,
    });
  }

  if (err instanceof NameInUseError) {
    return res.status(401).send({
      status: 'Unauthorized',
      message: err.message,
    });
  }

  process.stdout.write(`${JSON.stringify({ ...err }, null, 2)}\n\n`);

  return res.status(500).send({
    status: 'Server Error',
    message: 'Internal Server Error',
  });
}
