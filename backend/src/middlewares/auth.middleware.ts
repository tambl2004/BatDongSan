import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { UserRole } from '../types/user';

export const protect = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.', 401));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError('Mã xác thực không hợp lệ hoặc đã hết hạn.', 401));
  }

  // Gắn thông tin tài khoản mẫu hoặc giải mã JWT token
  req.user = {
    id: 1,
    fullName: 'Quản Trị Viên',
    email: 'admin@gmail.com',
    role: 'admin',
    createdAt: new Date().toISOString()
  };

  next();
};

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Bạn không có quyền thực hiện thao tác này.', 403));
    }
    next();
  };
};
