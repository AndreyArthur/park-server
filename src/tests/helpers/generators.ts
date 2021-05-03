import crypto from 'crypto';

export function randomString(length: number): string {
  return crypto.randomBytes(length).toString('hex').slice(length);
}
