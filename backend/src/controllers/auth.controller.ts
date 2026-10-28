import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Vui lòng nhập đầy đủ email và mật khẩu'
        });
        return;
      }

      const result = await authService.login(email, password);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Đăng nhập không thành công'
      });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email, password, phone, role } = req.body;

      if (!fullName || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp họ tên, email và mật khẩu'
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          message: 'Mật khẩu phải chứa ít nhất 6 ký tự'
        });
        return;
      }

      const result = await authService.register({ fullName, email, password, phone, role });
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Đăng ký không thành công'
      });
    }
  }

  public async socialLogin(req: Request, res: Response): Promise<void> {
    try {
      const { provider, profile } = req.body;

      if (!provider || (provider !== 'google' && provider !== 'facebook')) {
        res.status(400).json({
          success: false,
          message: 'Phương thức đăng nhập mạng xã hội không hợp lệ'
        });
        return;
      }

      const result = await authService.socialLogin(provider, profile);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Lỗi đăng nhập mạng xã hội'
      });
    }
  }

  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.headers['x-user-id'] as string;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Chưa xác thực người dùng'
        });
        return;
      }

      const user = authService.getUserById(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Không tìm thấy thông tin tài khoản'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Lỗi lấy thông tin người dùng'
      });
    }
  }
}

export const authController = new AuthController();
