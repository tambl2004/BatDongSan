import { User, AuthResponse } from '../types/user';
import { getPool } from '../config/db';

function mapDbRowToUser(row: any): User {
  return {
    id: row.id,
    fullName: row.full_name || row.fullName || '',
    email: row.email,
    password: row.password,
    phone: row.phone || '',
    avatarUrl:
      row.avatar_url ||
      row.avatarUrl ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(row.full_name || 'User')}`,
    role: row.role || 'user',
    status: row.status || 'active',
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : undefined
  };
}

export class AuthService {
  // In-memory user store matching schema.sql seed data as fallback
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
    const pool = getPool();
    let user: User | null = null;

    try {
      const [rows]: any = await pool.execute(
        'SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1',
        [normalizedEmail]
      );
      if (rows && rows.length > 0) {
        user = mapDbRowToUser(rows[0]);
      }
    } catch (dbErr) {
      console.warn('MySQL query failed in login, checking memory fallback:', dbErr);
      const memUser = this.users.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (memUser) user = memUser;
    }

    if (!user) {
      throw new Error('Email không tồn tại trong hệ thống');
    }

    if (user.password !== password) {
      throw new Error('Mật khẩu không chính xác');
    }

    if (user.status === 'banned' || user.status === 'suspended') {
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
    const pool = getPool();

    try {
      const [existing]: any = await pool.execute(
        'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
        [normalizedEmail]
      );
      if (existing && existing.length > 0) {
        throw new Error('Email này đã được đăng ký tài khoản');
      }

      const role = userData.role || 'user';
      const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.fullName)}`;
      const phone = userData.phone?.trim() || '';

      const [result]: any = await pool.execute(
        'INSERT INTO users (full_name, email, password, phone, avatar_url, role, status) VALUES (?, ?, ?, ?, ?, ?, "active")',
        [userData.fullName.trim(), normalizedEmail, userData.password, phone, avatarUrl, role]
      );

      const newId = result.insertId;
      const newUser: User = {
        id: newId,
        fullName: userData.fullName.trim(),
        email: normalizedEmail,
        phone,
        avatarUrl,
        role: role as any,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      this.users.push({ ...newUser, password: userData.password });

      const token = `bds_jwt_${newId}_${Date.now()}`;
      return {
        user: newUser,
        token,
        message: 'Đăng ký tài khoản thành công! Bạn có thể bắt đầu đăng tin ngay.'
      };
    } catch (err: any) {
      if (err.message === 'Email này đã được đăng ký tài khoản') {
        throw err;
      }
      console.warn('MySQL register failed, using in-memory fallback:', err);
      const existing = this.users.find((u) => u.email.toLowerCase() === normalizedEmail);
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
  }

  public async forgotPassword(email: string): Promise<{ message: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    const pool = getPool();
    let exists = false;

    try {
      const [rows]: any = await pool.execute(
        'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
        [normalizedEmail]
      );
      exists = rows && rows.length > 0;
    } catch {
      exists = this.users.some((u) => u.email.toLowerCase() === normalizedEmail);
    }

    if (!exists) {
      throw new Error('Email này chưa được đăng ký trong hệ thống');
    }

    return {
      message: 'Mã xác nhận và liên kết đặt lại mật khẩu đã được gửi đến email của bạn.'
    };
  }

  public async socialLogin(
    provider: 'google' | 'facebook',
    profile?: { name?: string; email?: string }
  ): Promise<AuthResponse> {
    const email = profile?.email || (provider === 'google' ? 'google.user@gmail.com' : 'fb.user@facebook.com');
    const normalizedEmail = email.toLowerCase().trim();
    const pool = getPool();
    let user: User | null = null;

    try {
      const [rows]: any = await pool.execute(
        'SELECT * FROM users WHERE LOWER(email) = ? LIMIT 1',
        [normalizedEmail]
      );
      if (rows && rows.length > 0) {
        user = mapDbRowToUser(rows[0]);
      } else {
        const fullName = profile?.name || (provider === 'google' ? 'Người dùng Google' : 'Người dùng Facebook');
        const avatarUrl =
          provider === 'google'
            ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'
            : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80';
        const [result]: any = await pool.execute(
          'INSERT INTO users (full_name, email, password, phone, avatar_url, role, status) VALUES (?, ?, ?, ?, ?, ?, "active")',
          [fullName, normalizedEmail, `social_${provider}_${Date.now()}`, '', avatarUrl, 'user']
        );
        user = {
          id: result.insertId,
          fullName,
          email: normalizedEmail,
          phone: '',
          avatarUrl,
          role: 'user',
          status: 'active'
        };
      }
    } catch {
      let memUser = this.users.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (!memUser) {
        memUser = {
          id: this.users.length + 1,
          fullName: profile?.name || (provider === 'google' ? 'Người dùng Google' : 'Người dùng Facebook'),
          email: normalizedEmail,
          phone: '',
          avatarUrl:
            provider === 'google'
              ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'
              : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
          role: 'user',
          status: 'active',
          createdAt: new Date().toISOString()
        };
        this.users.push(memUser);
      }
      user = memUser;
    }

    const { password: _, ...userWithoutPassword } = user!;
    const token = `bds_social_${provider}_${user!.id}_${Date.now()}`;

    return {
      user: userWithoutPassword,
      token,
      message: `Đăng nhập qua ${provider === 'google' ? 'Google' : 'Facebook'} thành công!`
    };
  }

  public async getUserById(id: number | string): Promise<Omit<User, 'password'> | null> {
    const pool = getPool();
    try {
      const [rows]: any = await pool.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
      if (rows && rows.length > 0) {
        const { password: _, ...userWithoutPassword } = mapDbRowToUser(rows[0]);
        return userWithoutPassword;
      }
    } catch {
      const memUser = this.users.find((u) => String(u.id) === String(id));
      if (!memUser) return null;
      const { password: _, ...userWithoutPassword } = memUser;
      return userWithoutPassword;
    }
    return null;
  }

  public async getAllUsers(filters?: {
    search?: string;
    role?: string;
    status?: string;
  }): Promise<Omit<User, 'password'>[]> {
    const pool = getPool();
    try {
      let query = 'SELECT * FROM users WHERE 1=1';
      const params: any[] = [];

      if (filters?.role && filters.role !== 'all') {
        query += ' AND role = ?';
        params.push(filters.role);
      }
      if (filters?.status && filters.status !== 'all') {
        query += ' AND status = ?';
        params.push(filters.status);
      }
      if (filters?.search) {
        query += ' AND (LOWER(full_name) LIKE ? OR LOWER(email) LIKE ? OR phone LIKE ?)';
        const q = `%${filters.search.toLowerCase().trim()}%`;
        params.push(q, q, q);
      }

      query += ' ORDER BY id DESC';

      const [rows]: any = await pool.execute(query, params);
      return rows.map((r: any) => {
        const { password: _, ...userWithoutPassword } = mapDbRowToUser(r);
        return userWithoutPassword;
      });
    } catch {
      let result = [...this.users];
      if (filters?.role && filters.role !== 'all') {
        result = result.filter((u) => u.role === filters.role);
      }
      if (filters?.status && filters.status !== 'all') {
        result = result.filter((u) => u.status === filters.status);
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase().trim();
        result = result.filter(
          (u) =>
            u.fullName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            (u.phone && u.phone.includes(q))
        );
      }
      return result.map(({ password: _, ...rest }) => rest);
    }
  }

  public async createUserByAdmin(data: {
    fullName: string;
    email: string;
    phone?: string;
    password?: string;
    role: 'admin' | 'agent' | 'user';
    status?: 'active' | 'suspended';
  }): Promise<Omit<User, 'password'>> {
    const normalizedEmail = data.email.toLowerCase().trim();
    const pool = getPool();

    try {
      const [existing]: any = await pool.execute(
        'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
        [normalizedEmail]
      );
      if (existing && existing.length > 0) {
        throw new Error('Email này đã được sử dụng');
      }

      const role = data.role || 'user';
      const status = data.status || 'active';
      const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.fullName)}`;
      const phone = data.phone || '';
      const password = data.password || '123456';

      const [result]: any = await pool.execute(
        'INSERT INTO users (full_name, email, password, phone, avatar_url, role, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [data.fullName, normalizedEmail, password, phone, avatarUrl, role, status]
      );

      const newUser: User = {
        id: result.insertId,
        fullName: data.fullName,
        email: normalizedEmail,
        phone,
        avatarUrl,
        role: role as any,
        status: status as any,
        createdAt: new Date().toISOString()
      };
      this.users.unshift({ ...newUser, password });
      return newUser;
    } catch (err: any) {
      if (err.message === 'Email này đã được sử dụng') throw err;
      const existing = this.users.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (existing) {
        throw new Error('Email này đã được sử dụng');
      }

      const newUser: User = {
        id: Date.now(),
        fullName: data.fullName,
        email: normalizedEmail,
        phone: data.phone || '',
        password: data.password || '123456',
        role: data.role as any,
        status: (data.status as any) || 'active',
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.fullName)}`,
        createdAt: new Date().toISOString()
      };

      this.users.unshift(newUser);
      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    }
  }

  public async updateUserByAdmin(
    id: number | string,
    data: Partial<User> & { password?: string }
  ): Promise<Omit<User, 'password'> | null> {
    const pool = getPool();
    try {
      const fields: string[] = [];
      const values: any[] = [];

      if (data.fullName !== undefined) {
        fields.push('full_name = ?');
        values.push(data.fullName);
      }
      if (data.email !== undefined) {
        fields.push('email = ?');
        values.push(data.email.toLowerCase().trim());
      }
      if (data.phone !== undefined) {
        fields.push('phone = ?');
        values.push(data.phone);
      }
      if (data.role !== undefined) {
        fields.push('role = ?');
        values.push(data.role);
      }
      if (data.status !== undefined) {
        fields.push('status = ?');
        values.push(data.status);
      }
      if (data.password !== undefined && data.password.trim() !== '') {
        fields.push('password = ?');
        values.push(data.password);
      }

      if (fields.length > 0) {
        values.push(id);
        await pool.execute(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
      }

      const [rows]: any = await pool.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
      if (rows && rows.length > 0) {
        const { password: _, ...userWithoutPassword } = mapDbRowToUser(rows[0]);
        return userWithoutPassword;
      }
    } catch {
      const index = this.users.findIndex((u) => String(u.id) === String(id));
      if (index === -1) return null;
      this.users[index] = { ...this.users[index], ...data };
      const { password: _, ...userWithoutPassword } = this.users[index];
      return userWithoutPassword;
    }
    return null;
  }

  public async deleteUserByAdmin(id: number | string): Promise<boolean> {
    const pool = getPool();
    try {
      const [result]: any = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch {
      const initialLength = this.users.length;
      this.users = this.users.filter((u) => String(u.id) !== String(id));
      return this.users.length < initialLength;
    }
  }
}

export const authService = new AuthService();
