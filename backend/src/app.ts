import express, { Application } from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { env } from './config/environment';

export function createApp(): Application {
  const app = express();

  // CORS: production chỉ cho phép origin cụ thể, dev cho phép tất cả
  const allowedOrigins = env.NODE_ENV === 'production'
    ? env.CLIENT_URL.split(',').map(o => o.trim())
    : '*';

  app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: env.NODE_ENV === 'production'
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logger
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // API Routes
  app.use('/api', apiRoutes);

  // Fallback 404
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      status: 'fail',
      message: 'Đường dẫn API không tồn tại'
    });
  });

  // Global Error Handler
  app.use(errorMiddleware);

  return app;
}
