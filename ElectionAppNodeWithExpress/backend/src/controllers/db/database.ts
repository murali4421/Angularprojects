import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'postgre',
  database: 'EC_DB',
  port: 5432
});