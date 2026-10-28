import { createApp } from './app';
import { env } from './config/environment';
import { connectDB } from './config/db';

const app = createApp();
const INITIAL_PORT = env.PORT;

async function bootstrap() {
  // Kết nối cơ sở dữ liệu
  await connectDB();

  function startServer(port: number, maxRetries = 10): void {
    const server = app.listen(port, () => {
      console.log(`===============================================`);
      console.log(`🚀 Bất Động Sản Backend API Server (${env.NODE_ENV})`);
      console.log(`🌐 Server running at: http://localhost:${port}`);
      console.log(`🩺 Health check: http://localhost:${port}/api/health`);
      console.log(`🏠 Properties: http://localhost:${port}/api/properties`);
      console.log(`===============================================`);
    });

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        if (maxRetries > 0) {
          console.warn(`⚠️ Cổng ${port} đang bận (EADDRINUSE/TIME_WAIT). Tự động chuyển sang cổng ${port + 1}...`);
          startServer(port + 1, maxRetries - 1);
        } else {
          console.error(`❌ Không tìm được cổng khả dụng sau nhiều lần thử.`);
        }
      } else {
        console.error('Lỗi khởi động máy chủ:', err);
      }
    });
  }

  startServer(INITIAL_PORT);
}

bootstrap();
