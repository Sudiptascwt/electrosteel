import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AllCertificatesDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon_image?: string;

  @IsOptional()
  @IsString()
  video_image?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid URL format' })
  link?: string;

  @IsOptional()
  @IsString()
  certificate_body?: string;

  @IsOptional()
  @IsString()
  certificate?: string;

  @IsOptional()
  @IsString()
  pdf?: string;

  @IsOptional()
  @IsString()
  pdf2?: string;

  @IsOptional()
  @IsString()
  standrad?: string;

  @IsOptional()
  @IsString()
  ranges?: string;

  @IsOptional()
  @IsString()
  scope?: string;

  @IsOptional()
  @IsNumber()
  status?: 0 | 1;

  @IsOptional()
  @IsEnum(['system', 'product', 'bodies'], {
    message: 'Type must be either system, product, or bodies',
  })
  type?: 'system' | 'product' | 'bodies';
}

