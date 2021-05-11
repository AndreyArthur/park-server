import { ParkingLot } from '@/core/entities';
import { CreateSession, CreateSessionCredentials } from '@/core/useCases';
import {
  Controller, HttpRequest, HttpResponse,
} from '@/presentation/protocols';

export class CreateSessionController implements Controller {
  private createSession: CreateSession;

  constructor(createSession: CreateSession) {
    this.createSession = createSession;
  }

  public async handle(
    httpRequest: HttpRequest<CreateSessionCredentials>,
  ): Promise<HttpResponse<{
      token: string, parkingLot: Omit<ParkingLot, 'password'>
    }>> {
    const { body } = httpRequest;

    const {
      token,
      parkingLot: { password: _password, ...parkingLot },
    } = await this.createSession.execute({
      name: body.name,
      password: body.password,
    });

    return {
      status: 200,
      body: {
        token,
        parkingLot,
      },
    };
  }
}
