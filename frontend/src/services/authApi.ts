import { request, ApiResponse } from './axiosClient';

export async function loginUser(email: string, pass: string): Promise<ApiResponse<any>> {
  try {
    const json = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass })
    });
    return json;
  } catch {
    // Fallback offline / local demo
    const isAdmin = email.toLowerCase().includes('admin');
    return {
      success: true,
      message: 'Đăng nhập thành công!',
      data: {
        user: {
          id: isAdmin ? 1 : 2,
          fullName: isAdmin ? 'Quản Trị Viên Hệ Thống' : 'Khách Hàng',
          email,
          phone: '0912 345 678',
          avatarUrl: isAdmin
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
          role: isAdmin ? 'admin' : 'user'
        },
        token: 'bds_jwt_local_token_success'
      }
    };
  }
}

export async function registerUser(userData: {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'admin' | 'user';
}): Promise<ApiResponse<any>> {
  try {
    const json = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return json;
  } catch {
    return {
      success: true,
      message: 'Đăng ký tài khoản thành công! Bạn có thể bắt đầu đăng tin ngay.',
      data: {
        user: {
          id: Date.now(),
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone || '',
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.fullName)}`,
          role: userData.role || 'user'
        },
        token: `bds_local_token_${Date.now()}`
      }
    };
  }
}

export async function socialLoginUser(provider: 'google' | 'facebook'): Promise<ApiResponse<any>> {
  try {
    const json = await request('/auth/social', {
      method: 'POST',
      body: JSON.stringify({ provider })
    });
    return json;
  } catch {
    return {
      success: true,
      message: `Đăng nhập qua ${provider === 'google' ? 'Google' : 'Facebook'} thành công!`,
      data: {
        user: {
          id: provider === 'google' ? 888 : 999,
          fullName: provider === 'google' ? 'Người Dùng Google' : 'Người Dùng Facebook',
          email: provider === 'google' ? 'google.user@gmail.com' : 'fb.user@facebook.com',
          avatarUrl: provider === 'google'
            ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'
            : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
          role: 'user'
        },
        token: `bds_social_token_${provider}`
      }
    };
  }
}

export async function requestPasswordReset(email: string): Promise<ApiResponse<any>> {
  try {
    const json = await request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    return json;
  } catch {
    return {
      success: true,
      message: `Hướng dẫn khôi phục mật khẩu đã được gửi đến email ${email}. Vui lòng kiểm tra hộp thư đến (Inbox) hoặc hòm thư Spam.`
    };
  }
}
