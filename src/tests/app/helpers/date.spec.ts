import { utc } from '@/infra/helpers/date';

describe('date Helper', () => {
  it('should return a utc date', () => {
    const now = new Date();

    const utcDate = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds(),
    );

    expect(utc().getTime()).toBeLessThanOrEqual(utcDate.getTime() + 100);
    expect(utc().getTime()).toBeGreaterThanOrEqual(utcDate.getTime() - 100);
  });
});
