import { IsString, IsOptional, IsEnum } from 'class-validator';

export class BusinessEnquiryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  company_name: string;

  @IsString()
  email_id: string;

  @IsString()
  phone_number: string;

  @IsString()
  address: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  query: string;
}
