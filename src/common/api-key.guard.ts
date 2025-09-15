// api-key.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API Key');
    }
    return true;
  }
}


// @UseGuards(ApiKeyGuard)
// @Get('frontend-data')
// getFrontendData() {
//   return { message: 'Only frontend with correct API key can access this' };
// }