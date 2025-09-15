import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../admin/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}
  

  @Post('2fa/enable')
  @UseGuards(JwtAuthGuard) // user must be logged in
  async enable2FA(@Req() req) {
    const userId = req.user.id;
    const data = await this.authService.generate2FASecret(userId);
    return {
      status: true,
      message: 'Scan this QR code in Google Authenticator',
      data
    };
  }

  @Post('2fa/verify-setup')
  @UseGuards(JwtAuthGuard)
  async verify2FASetup(@Req() req, @Body() body: { totp: string }) {
    const userId = req.user.id;
    const { totp } = body;

    const result = await this.authService.verify2FA(userId, totp);

    // Mark 2FA as fully enabled
    await this.usersService.update(userId, { isTwoFAEnabled: true });

    return {
      status: true,
      message: '2FA setup verified successfully',
      data: result
    };
  }


  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto.email, loginDto.password, loginDto.totp);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: result,
    };
  }
}
