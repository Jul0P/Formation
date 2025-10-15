import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

export function getConnection() {
  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  return client;
}
