import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { Token } from '@/application/adapters';
import { AuthenticationError } from '@/application/exceptions';
import { randomString } from '@/tests/helpers/generators';

describe('Token Adapter', () => {
  it('should create an instance of Token', () => {
    const token = new Token();

    expect(token).toBeInstanceOf(Token);
  });

  it('should sign a token', () => {
    const token = Token.sign({ content: randomString(8) });

    expect(token.split('.')).toHaveLength(3);
  });

  it('should decode a signed token', () => {
    const tokenContent = randomString(8);
    const token = Token.sign({ content: tokenContent });
    const decoded = Token.decode(token);

    expect(decoded.content).toBe(tokenContent);
  });

  it('should throw an error because token is invalid', () => {
    const token = Token.sign({ content: randomString(8) });

    try {
      Token.decode(`${randomString(4)}${token}${randomString(4)}`);
    } catch (err) {
      expect(err).toEqual(new AuthenticationError('invalid token'));
    }
  });

  it('should throw an error because token is not a valid object', () => {
    const token = jwt.sign({}, process.env.TOKEN_SECRET as string, {
      expiresIn: 60,
      subject: randomString(8),
    });

    try {
      Token.decode(token);
    } catch (err) {
      expect(err).toEqual(new AuthenticationError('token is not parsable'));
    }
  });
});
