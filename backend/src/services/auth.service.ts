import { User, AuthResponse } from '../types/user';

export class AuthService {
  // In-memory user store matching schema.sql seed data
  private users: User[] = [
    {
      id: 1,
      fullName: 'Quản Trị Viên Hệ Thống',
      email: 'admin@gmail.com',
      password: '123456',
      phone: '0908 123 456',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      role: 'admin',
      status: 'active',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 2,
      fullName: 'Nguyễn Văn Tâm',
      email: 'tam@gmail.com',
      password: '123456',
      phone: '0912 345 678',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      role: 'user',
      status: 'active',
      createdAt: '2026-02-15T00:00:00Z'
    }
  ];

  public async login(email: string, password: string): Promise<AuthResponse> {
    const normalizedEmail = email.toLowerCase().trim();
    const user = this.users.find(u => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      throw new Error('Email không tồn tại trong hệ thống');
    }

    if (user.password !== password) {
      throw new Error('Mật khẩu không chính xác');
    }

    if (user.status === 'banned') {
      throw new Error('Tài khoản đã bị tạm khóa');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = `bds_jwt_${user.id}_${Date.now()}`;

    return {
      user: userWithoutPassword,
      token,
      message: `Đăng nhập thành công với vai trò ${user.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}`
    };
  }

  public async register(userData: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    role?: 'admin' | 'user';
  }): Promise<AuthResponse> {
    const normalizedEmail = userData.email.toLowerCase().trim();
    const existing = this.users.find(u => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      throw new Error('Email này đã được đăng ký tài khoản');
    }

    const newUser: User = {
      id: this.users.length + 1,
      fullName: userData.fullName.trim(),
      email: normalizedEmail,
      password: userData.password,
      phone: userData.phone?.trim() || '',
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.fullName)}`,
      role: userData.role || 'user',
      status: 'active',
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    const token = `bds_jwt_${newUser.id}_${Date.now()}`;

    return {
      user: userWithoutPassword,
      token,
      message: 'Đăng ký tài khoản thành công! Bạn có thể bắt đầu đăng tin ngay.'
    };
  }

  public async socialLogin(provider: 'google' | 'facebook', profile?: { name?: string; email?: string }): Promise<AuthResponse> {
    const email = profile?.email || (provider === 'google' ? 'google.user@gmail.com' : 'fb.user@facebook.com');
    let user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      user = {
        id: this.users.length + 1,
        fullName: profile?.name || (provider === 'google' ? 'Người dùng Google' : 'Người dùng Facebook'),
        email,
        phone: '',
        avatarUrl: provider === 'google'
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'
          : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      this.users.push(user);
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = `bds_social_${provider}_${user.id}_${Date.now()}`;

    return {
      user: userWithoutPassword,
      token,
      message: `Đăng nhập qua ${provider === 'google' ? 'Google' : 'Facebook'} thành công!`
    };
  }

  public getUserById(id: number | string): Omit<User, 'password'> | null {
    const user = this.users.find(u => String(u.id) === String(id));
    if (!user) return null;
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const authService = new AuthService();
