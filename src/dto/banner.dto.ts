import { IsOptional, IsString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
export class BannerDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  banner_file?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
