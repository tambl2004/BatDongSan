import { User, UserRole } from '../types/user';

export interface UserSchema extends User {
  passwordHash?: string;
  isActive: boolean;
  savedPropertyIds?: string[];
}

// In-Memory Repository Model có khả năng mở rộng sang Mongoose Schema / Prisma Model
export const UserModel = {
  tableName: 'users',
  primaryKey: 'id',
  fields: ['id', 'fullName', 'email', 'phone', 'role', 'avatarUrl', 'isActive', 'createdAt']
};
