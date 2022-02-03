import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_TEST_USER,
  POSTGRES_PASSWORD,
} = process.env;
const POSTGRES_DATA_BASE = ENV == 'test' ? POSTGRES_DB_TEST : POSTGRES_DB;
const POSTGRES_DATA_BASE_USER =
  ENV == 'test' ? POSTGRES_TEST_USER : POSTGRES_USER;

export const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DATA_BASE,
  user: POSTGRES_DATA_BASE_USER,
  password: POSTGRES_PASSWORD,
});
