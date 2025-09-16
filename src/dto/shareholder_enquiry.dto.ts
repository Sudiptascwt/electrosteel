import { IsString, IsOptional, IsEnum } from 'class-validator';

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
}
