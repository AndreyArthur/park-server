import { Database } from '@/infra/database';

describe('Database Class', () => {
  it('should create an instance of Database', () => {
    const database = new Database();

    expect(database).toBeInstanceOf(Database);
  });

  it('should make a query to database', async () => {
    const [now] = await Database.query('SELECT now()');

    expect(typeof now).toBe('object');
  });

  it('should close Database instance', () => {
    Database.close();

    // if jest close after testing this test passed
  });
});
