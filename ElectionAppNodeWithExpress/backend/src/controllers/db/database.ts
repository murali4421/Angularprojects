import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'postgre',
  database: 'Medsup',
  port: 5432
});