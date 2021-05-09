import bcrypt from 'bcryptjs';

export class Encrypter {
  public static async encrypt(text: string): Promise<string> {
    const hash = await bcrypt.hash(text, 10);

    return hash;
  }

  public static async compare(text: string, hash: string): Promise<boolean> {
    const matched = await bcrypt.compare(text, hash);

    return matched;
  }
}
