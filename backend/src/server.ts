import { createApp } from './app';
import { env } from './config/environment';
import { connectDB } from './config/db';

const app = createApp();
const PORT = env.PORT;

async function bootstrap() {
  // Kết nối cơ sở dữ liệu — nếu thất bại, connectDB() sẽ gọi process.exit(1)
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Bất Động Sản Backend API Server (${env.NODE_ENV})`);
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🏠 Properties: http://localhost:${PORT}/api/properties`);
    console.log(`===============================================`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Cổng ${PORT} đang bận. Trong Docker, hãy đảm bảo không có process nào khác chiếm cổng này.`);
    } else {
      console.error('❌ Lỗi khởi động máy chủ:', err);
    }
    process.exit(1);
  });
}

bootstrap();
