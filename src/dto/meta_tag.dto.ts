import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class MetaTagDto {
  @IsString()
  meta_title: string;

  @IsString()
  meta_keyword: string;

  @IsString()
  meta_description: string;

  @IsOptional()
  @IsString()
  page_name?: string;
}

