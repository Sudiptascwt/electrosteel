import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt } from 'class-validator';

export class BannerDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty({ message: 'Banner title is required' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  banner_sub_title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  banner_media?: string;

  @IsInt()
  banner_media_id?: number;

  @IsOptional()
  @IsString()
  media_type?: string;

  @IsOptional()
  status?: number;
}
