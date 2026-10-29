import mysql, { Pool } from 'mysql2/promise';
import { env } from './environment';

export interface DatabaseConnection {
  isConnected: boolean;
  dbName: string;
}

export const dbConnection: DatabaseConnection = {
  isConnected: false,
  dbName: env.DB_NAME
};

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });
  }
  return pool;
}

export async function connectDB(): Promise<void> {
  try {
    const p = getPool();
    const conn = await p.getConnection();
    await conn.ping();
    conn.release();
    dbConnection.isConnected = true;
    console.log(`✅ Kết nối MySQL Database (${env.DB_NAME}) thành công!`);
  } catch (error) {
    console.error(`❌ Lỗi kết nối cơ sở dữ liệu MySQL (${env.DB_NAME}):`, error);
    dbConnection.isConnected = false;
  }
}
