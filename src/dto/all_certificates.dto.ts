import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
  IsUrl,
  IsInt,
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
  @IsInt()
  icon_image_id?: number

  @IsOptional()
  @IsString()
  video_image?: string;

  @IsOptional()
  @IsInt()
  video_image_id?: number;

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
  @IsInt()
  pdf_id: number;

  @IsOptional()
  @IsString()
  pdf2?: string;

  @IsOptional()
  @IsInt()
  pdf2_id: number;

  @IsOptional()
  @IsString()
  standrad?: string;

  @IsOptional()
  @IsString()
  ranges?: string;

  @IsOptional()
  @IsString()
  scope?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 

  @IsOptional()
  @IsEnum(['system', 'product', 'bodies'], {
    message: 'Type must be either system, product, or bodies',
  })
  type?: 'system' | 'product' | 'bodies';
}

