import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AuthenticationError } from '../exceptions';

export class Token {
  public static sign(content: Record<string, unknown>): string {
    return jwt.sign({}, process.env.TOKEN_SECRET as string, {
      expiresIn: '1d',
      subject: JSON.stringify(content),
    });
  }

  public static decode<T = Record<string, unknown>>(token: string): T {
    let subject: string;

    try {
      subject = (jwt.verify(
        token, process.env.TOKEN_SECRET as string,
      ) as any).sub;
    } catch {
      throw new AuthenticationError('invalid token');
    }

    let tokenContent: Record<string, unknown>;

    try {
      tokenContent = JSON.parse(subject);
    } catch {
      throw new AuthenticationError('token is not parsable');
    }

    return tokenContent as T;
  }
}
