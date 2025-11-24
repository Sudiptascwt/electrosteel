import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber, IsEnum } from 'class-validator';

export class CareerEnquiryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  dob?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  post_applied_for: string;

  @IsNumber()
  @IsNotEmpty()
  years_exp: number;

  @IsString()
  @IsNotEmpty()
  education_qualification: string;

  @IsString()
  @IsOptional()
  pdf?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
