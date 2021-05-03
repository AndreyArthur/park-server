import { IdGenerator } from '@/infra/adapters';

describe('IdGenerator Adapter', () => {
  // To avoid jest coverage bugs with static methods
  it('should create a IdGenerator instance', () => {
    const idGenerator = new IdGenerator();

    expect(idGenerator).toBeInstanceOf(IdGenerator);
  });

  it('should generate a uuidv4 successfully', () => {
    const uuid = IdGenerator.uuid();

    expect(uuid.split('-')).toHaveLength(5);
    expect(uuid.match(
      /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/,
    )).toBeTruthy();
  });
});
