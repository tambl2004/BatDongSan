import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { env } from '../config/environment';

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode || (err.status && typeof err.status === 'number' ? err.status : 500);
  const message = err.message || 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.';

  if (env.NODE_ENV === 'development') {
    console.error(`[Error Handler] ${statusCode} - ${message}`);
    if (err.stack) console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    status: err.status || 'error',
    message,
    ...(env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
}

export const errorHandler = errorMiddleware;
