import { Controller } from '@/presentation/protocols';
import { Request, Response } from 'express';

export class ControllerAdapter {
  public static create(
    controller: Controller,
  ): (req: Request, res: Response) => Promise<Response> {
    return async (req: Request, res: Response): Promise<Response> => {
      const httpResponse = await controller.handle({ body: req.body });

      return res.status(httpResponse.status).send(httpResponse.body);
    };
  }
}
