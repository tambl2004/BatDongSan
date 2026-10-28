import { User } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      fileValidationSuccess?: boolean;
    }
  }
}

export {};
