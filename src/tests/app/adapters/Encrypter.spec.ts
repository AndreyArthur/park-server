import { Encrypter } from '@/infra/adapters';
import { randomString } from '@/tests/helpers/generators';

describe('Encrypter Adapter', () => {
  // To avoid jest coverage bugs with static methods
  it('should create an instance of Encrypter', () => {
    const encrypter = new Encrypter();

    expect(encrypter).toBeInstanceOf(Encrypter);
  });

  it('should hash text successfully', async () => {
    const textToBeHashed = randomString(8);
    const hash = await Encrypter.encrypt(textToBeHashed);

    expect(hash.length).toBe(60);
    expect(hash !== textToBeHashed).toBe(true);
  });

  it('should compare a hash correctly', async () => {
    const textToBeHashed = randomString(8);

    const hashToBeCompared = await Encrypter.encrypt(textToBeHashed);

    const secondHash = await Encrypter.encrypt(randomString(8));

    expect(await Encrypter.compare(textToBeHashed, hashToBeCompared))
      .toBe(true);
    expect(await Encrypter.compare(textToBeHashed, secondHash)).toBe(false);
  });
});
