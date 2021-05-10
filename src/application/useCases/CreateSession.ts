import {
  CreateSession,
  CreateSessionCredentials,
  CreateSessionReturnType,
} from '@/core/useCases';
import { Encrypter, Token } from '@/application/adapters';
import { CreateSessionRepository } from '@/application/repositories';
import { AuthenticationError } from '@/application/exceptions';
import { CreateSessionValidator } from '../validators';

export class CreateSessionUseCase implements CreateSession {
  private createSessionRepository: CreateSessionRepository;

  constructor(createSessionRepository: CreateSessionRepository) {
    this.createSessionRepository = createSessionRepository;
  }

  public async execute(
    { name, password }: CreateSessionCredentials,
  ): Promise<CreateSessionReturnType> {
    CreateSessionValidator.validate({ name, password });

    const parkingLot = await this.createSessionRepository.findByName(name);

    if (!parkingLot) {
      throw new AuthenticationError('invalid name/password combination');
    }

    const passwordMatched = await Encrypter.compare(
      password, parkingLot.password,
    );

    if (!passwordMatched) {
      throw new AuthenticationError('invalid name/password combination');
    }

    return {
      token: Token.sign({ parkingLotId: parkingLot.id }),
      parkingLot,
    };
  }
}
