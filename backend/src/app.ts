import express, { Application } from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

export function createApp(): Application {
  const app = express();

  // Middleware CORS & Body Parser
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
