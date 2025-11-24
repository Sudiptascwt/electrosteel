import { IsOptional, IsString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
export class BannerDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  banner_video?: string;

  @IsOptional()
  @IsString()
  banner_images: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
