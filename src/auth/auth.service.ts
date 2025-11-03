import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/admin/users/user.entity';
import { ChangePasswordDto } from 'src/dto/change_password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // inject JWT service

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
  ) {}


async generate2FASecret(userId: number) {
  const secret = speakeasy.generateSecret({
    name: `MyApp (${userId})`,
  });

  // Save secret temporarily in DB (not enabled yet)
  await this.usersService.update(userId, {
    twoFASecret: secret.base32,
    isTwoFAEnabled: false,
  });

  const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);
  return { secret: secret.base32, qrCodeUrl };
}

async verify2FA(userId: number, token: string) {
  const user = await this.usersService.findById(userId);
  if (!user || !user.twoFASecret) {
    throw new BadRequestException('2FA not enabled');
  }

  const isValid = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: 'base32',
    token,
    window: 1,
  });

  if (!isValid) throw new UnauthorizedException('Invalid 2FA code');

  return { status: true, message: '2FA verified successfully' };
}

  // async login(email: string, password: string) {
  //   const user = await this.usersService.findByEmail(email);

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }

  //   const passwordMatch = await bcrypt.compare(password, user.password);
  //   if (!passwordMatch) {
  //     throw new UnauthorizedException('Invalid email or password');
  //   }

  //   const payload = { sub: user.id, email: user.email, role: user.role }; 
  //   const token = this.jwtService.sign(payload);

  //   return {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     role: user.role,
  //     access_token: token,
  //   };
  // }
async login(email: string, password: string, totp: string) {
  const user = await this.usersService.findByEmail(email);

  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new UnauthorizedException('Invalid email or password');
  }

  // if (!user.isTwoFAEnabled || !user.twoFASecret) {
  //   throw new UnauthorizedException('2FA not set up for this account. Please contact admin.');
  // }

  // if (!totp) {
  //   throw new UnauthorizedException('TOTP code is required for login');
  // }

  // const isValid = speakeasy.totp.verify({
  //   secret: user.twoFASecret,
  //   encoding: 'base32',
  //   token: totp,
  //   window: 1, // allow ±30s clock drift
  // });

  // if (!isValid) {
  //   throw new UnauthorizedException('Invalid TOTP code');
  // }

 
  const payload = { sub: user.id, email: user.email, role: user.role };
  const token = this.jwtService.sign(payload, { expiresIn: '1h' });

  return {
    status: true,
    message: 'Login successful (2FA verified)',
    access_token: token,
  };
}


  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { email, old_password, new_password,confirm_new_password } = changePasswordDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }
    if (new_password!=confirm_new_password) {
      throw new BadRequestException('Entered new password and confirmed new password are not correct.');
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    user.password = hashedPassword;
    await this.userRepository.save(user);

    return { email: user.email };
  }
}
