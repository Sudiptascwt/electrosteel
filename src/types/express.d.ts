import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number; // match your ActivityLog.userId type
      [key: string]: any;
    };
    ip?: string;
  }
}
