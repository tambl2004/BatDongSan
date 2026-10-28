import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const uploadPropertyImages = (req: Request, _res: Response, next: NextFunction) => {
  // Middleware sẵn sàng xử lý file upload với multer hoặc cloudinary
  req.fileValidationSuccess = true;
  next();
};
