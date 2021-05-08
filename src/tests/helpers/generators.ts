import crypto from 'crypto';

export function randomString(length: number): string {
  return crypto.randomBytes(length).toString('hex').slice(length);
}

export function randomCarPlate(): string {
  const alphabet = [
    'A', 'B', 'C',
    'D', 'E', 'F',
    'G', 'H', 'I',
    'J', 'K', 'L',
    'M', 'N', 'O',
    'P', 'Q', 'R',
    'S', 'T', 'U',
    'V', 'W', 'X',
    'Y', 'Z',
  ];
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return `${
    alphabet[randomNumber(0, alphabet.length)]
  }${
    alphabet[randomNumber(0, alphabet.length)]
  }${
    alphabet[randomNumber(0, alphabet.length)]
  }${
    digits[randomNumber(0, digits.length)]
  }${
    alphabet[randomNumber(0, alphabet.length)]
  }${
    digits[randomNumber(0, digits.length)]
  }${
    digits[randomNumber(0, digits.length)]
  }`;
}
