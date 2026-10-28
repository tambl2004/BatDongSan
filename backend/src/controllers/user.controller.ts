import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user || {
    id: 1,
    fullName: 'Quản Trị Viên',
    email: 'admin@gmail.com',
    role: 'admin',
    createdAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    data: { user }
  });
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { fullName, phone, avatarUrl } = req.body;

  if (!fullName) {
    throw new AppError('Họ và tên không được để trống', 400);
  }

  res.status(200).json({
    success: true,
    message: 'Cập nhật thông tin tài khoản thành công',
    data: {
      user: {
        id: req.user?.id || 1,
        fullName,
        email: req.user?.email || 'user@example.com',
        phone: phone || '',
        avatarUrl: avatarUrl || '',
        role: req.user?.role || 'user'
      }
    }
  });
});

export const getFavorites = catchAsync(async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      favorites: ['bds-001', 'bds-002']
    }
  });
});
