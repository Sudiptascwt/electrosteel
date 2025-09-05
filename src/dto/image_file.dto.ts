import { IsOptional, IsString, IsEnum, IsDate, IsInt, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class ImageDto {
  @IsOptional()
  @IsString()
  filename?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  mimetype?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
}
