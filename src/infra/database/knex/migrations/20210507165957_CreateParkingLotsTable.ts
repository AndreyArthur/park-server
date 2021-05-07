import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE parking_lots (
      id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
      name VARCHAR(32) NOT NULL,
      password VARCHAR(60) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE parking_lots;

    DROP EXTENSION IF EXISTS "uuid_ossp";
  `);
}
