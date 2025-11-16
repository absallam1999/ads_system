import mysql from 'mysql2/promise';
import { Pool } from 'mysql2/promise';

let pool: Pool;

export const initDb = () => {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'ads_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

export const getDb = () => {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  return pool;
};
