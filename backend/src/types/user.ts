export type UserRole = 'admin' | 'user';

export type UserStatus = 'active' | 'inactive' | 'banned';

export interface User {
  id: number | string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  status?: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
  message: string;
}
