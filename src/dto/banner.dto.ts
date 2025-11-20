import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
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
}
