import {
  CreateSession,
  CreateSessionCredentials,
  CreateSessionReturnType,
} from '@/core/useCases/CreateSession';
import { Encrypter } from '../adapters';

export class CreateSessionUseCase implements CreateSession {
  public async execute(
    { name, password }: CreateSessionCredentials,
  ): Promise<CreateSessionReturnType> {
    return {
      // eslint-disable-next-line
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      parkingLot: {
        id: 'f158c5dc-9f75-4b94-9d17-0c6d0da54b09',
        name,
        password: await Encrypter.encrypt(password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }
}
