import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class InnerBannerDto {
  @IsString()
  @IsNotEmpty()
  banner_title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  banner_image?: string;

  @IsString()
  @IsOptional()
  banner_sub_title?: string;

  @IsString()
  @IsOptional()
  banner_sub_image?: string;

  @IsString()
  @IsOptional()
  banner_video?: string;

  @IsString()
  @IsOptional()
  video_title?: string;

  @IsString()
  @IsOptional()
  video_description?: string;

  @IsString()
  @IsOptional()
  sliding_title?: string;

  @IsString()
  @IsOptional()
  sliding_image?: string;

  @IsString()
  @IsOptional()
  sliding_description?: string;

  @IsString()
  @IsOptional()
  sliding_address?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  url2?: string;

  @IsString()
  @IsOptional()
  alt_tag?: string;

  @IsInt()
  @IsOptional()
  status?: number;
}
