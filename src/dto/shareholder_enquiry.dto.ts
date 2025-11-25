import { IsString, IsOptional, IsEnum, IsNumber, IsIn } from 'class-validator';

export class ShareholderEnquiryDto {
  @IsString()
  name: string;

  @IsString()
  folio: string;

  @IsString()
  email: string;

  @IsString()
  mobile: string;

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

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
