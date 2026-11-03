import dotenv from 'dotenv';
dotenv.config();

export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  CLIENT_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  DATABASE_URL?: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

// Production: bắt buộc JWT_SECRET từ env, không dùng default
const nodeEnv = (process.env.NODE_ENV as EnvironmentConfig['NODE_ENV']) || 'development';

if (nodeEnv === 'production' && !process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET phải được cấu hình qua biến môi trường khi chạy production!');
  process.exit(1);
}

export const env: EnvironmentConfig = {
  NODE_ENV: nodeEnv,
  PORT: Number(process.env.PORT) || 5001,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET || 'bds_dev_secret_not_for_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  DATABASE_URL: process.env.DATABASE_URL || 'memory://batdongsan_db',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_NAME: process.env.DB_NAME || 'batdongsan'
};
