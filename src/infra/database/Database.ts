import { db } from '@/infra/database/knex';

export class Database {
  public static async query<T = any>(sql: string, params?: any[]): Promise<T> {
    const queryResult = (await db.raw(sql, params as any)).rows;

    return queryResult;
  }

  public static close(): void {
    db.destroy();
  }

  public static async migrate(): Promise<void> {
    await db.migrate.latest();
  }
}
