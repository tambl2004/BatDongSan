import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { loginUser, registerUser, socialLoginUser } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    role?: 'admin' | 'user';
  }) => Promise<{ success: boolean; message: string }>;
  socialLogin: (provider: 'google' | 'facebook') => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('bds_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('bds_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bds_auth_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const res = await loginUser(email, password);
    if (res.success && res.data?.user) {
      setUser(res.data.user);
      return { success: true, message: res.message || 'Đăng nhập thành công' };
    }
    return { success: false, message: res.message || 'Email hoặc mật khẩu không chính xác' };
  };

  const register = async (userData: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    role?: 'admin' | 'user';
  }) => {
    const res = await registerUser(userData);
    if (res.success && res.data?.user) {
      setUser(res.data.user);
      return { success: true, message: res.message || 'Đăng ký thành công' };
    }
    return { success: false, message: res.message || 'Đăng ký không thành công' };
  };

  const socialLogin = async (provider: 'google' | 'facebook') => {
    const res = await socialLoginUser(provider);
    if (res.success && res.data?.user) {
      setUser(res.data.user);
      return { success: true, message: res.message || 'Đăng nhập mạng xã hội thành công' };
    }
    return { success: false, message: res.message || 'Lỗi đăng nhập mạng xã hội' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bds_auth_user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        socialLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
