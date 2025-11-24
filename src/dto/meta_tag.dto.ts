import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber, IsIn } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}

