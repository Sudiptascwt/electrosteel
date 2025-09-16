// api-key.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log("process.env.API_KEY",process.env.API_KEY);
    
    if (!process.env.API_KEY) {
      throw new UnauthorizedException('API Key not configured on server');
    }
    const apiKey = request.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API Key');
    }
    return true;
  }
}