import { v4 } from 'uuid';

export class IdGenerator {
  public static uuid(): string {
    return v4();
  }
}
