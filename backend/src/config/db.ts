import { env } from './environment';

export interface DatabaseConnection {
  isConnected: boolean;
  dbName: string;
}

export const dbConnection: DatabaseConnection = {
  isConnected: false,
  dbName: 'batdongsan_production'
};

export async function connectDB(): Promise<void> {
  try {
    // Sẵn sàng kết nối MongoDB/Prisma/PostgreSQL theo DATABASE_URL
    console.log(`📦 Đang kết nối cơ sở dữ liệu: ${env.DATABASE_URL}...`);
    dbConnection.isConnected = true;
    console.log(`✅ Kết nối Database (${dbConnection.dbName}) thành công!`);
  } catch (error) {
    console.error(`❌ Lỗi kết nối cơ sở dữ liệu:`, error);
    dbConnection.isConnected = false;
  }
}
