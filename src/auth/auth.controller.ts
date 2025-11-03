import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../admin/users/users.service';
import { ChangePasswordDto } from 'src/dto/change_password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}
  

  @Post('2fa/enable')
  // @UseGuards(JwtAuthGuard) // user must be logged in
  async enable2FA(@Body() body: { userId: number }) {
    const { userId } = body;

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const data = await this.authService.generate2FASecret(userId);

    return {
      status: true,
      message: 'Scan this QR code in Google Authenticator',
      data, // { secret, qrCodeUrl }
    };
  }

  @Post('2fa/verify-setup')
  // @UseGuards(JwtAuthGuard)
  async verify2FASetup(@Body() body: { userId: number; totp: string }) {
    const { userId, totp } = body;

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const result = await this.authService.verify2FA(userId, totp);

    await this.usersService.update(userId, { isTwoFAEnabled: true });

    return {
      status: true,
      message: '2FA setup verified successfully',
      data: result,
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

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    if (changePasswordDto.new_password !== changePasswordDto.confirm_new_password) {
      throw new BadRequestException('New password and confirm password do not match');
    }

    const result = await this.authService.changePassword(changePasswordDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Password changed successfully',
      data: result,
    };
  }
}
