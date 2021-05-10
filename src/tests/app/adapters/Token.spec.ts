import { Token } from '@/application/adapters';
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
});
