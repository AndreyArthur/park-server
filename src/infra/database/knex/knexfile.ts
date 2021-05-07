import path from 'path';

export default {
  client: 'pg',
  connection: {
    user: 'postgres',
    password: 'docker',
    host: 'localhost',
    port: 5432,
    database: process.env.NODE_ENV === 'test' ? 'test_park' : 'park',
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
};
