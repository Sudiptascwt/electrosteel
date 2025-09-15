// auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

   @IsNotEmpty()
  totp?: string;
}
