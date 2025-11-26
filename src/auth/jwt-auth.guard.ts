// src/auth/jwt-auth.guard.ts
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    console.log('JWT error info:', info);
    console.log('JWT error err:', err);
    if (info instanceof TokenExpiredError || info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Token has expired');
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
