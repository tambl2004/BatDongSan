import { request, ApiResponse } from './axiosClient';

export async function loginUser(email: string, pass: string): Promise<ApiResponse<any>> {
  try {
    const json = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass })
    });
    return json;
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Email hoặc mật khẩu không chính xác'
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
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Đăng ký không thành công'
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
  } catch (err: any) {
    return {
      success: false,
      message: err.message || `Lỗi đăng nhập ${provider}`
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
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Không thể gửi yêu cầu đặt lại mật khẩu'
    };
  }
}
