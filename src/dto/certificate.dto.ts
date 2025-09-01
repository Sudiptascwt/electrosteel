import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export enum CertificateStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export class CertificateDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'ISO Number is required' })
  @IsString()
  iso_number: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  image_alt_tag?: string;

  @IsOptional()
  @IsEnum(CertificateStatus, { message: 'Status must be ACTIVE(1) or INACTIVE(0)' })
  status?: CertificateStatus;
}
