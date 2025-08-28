import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt } from 'class-validator';

export class BannerDto {
  @IsOptional()
  @IsInt()
  banner_id?: number;

  @IsNotEmpty({ message: 'Banner title is required' })
  @IsString()
  banner_title: string;

  @IsOptional()
  @IsString()
  banner_sub_title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  alise?: string;

  @IsOptional()
  @IsString()
  banner_image?: string;

  @IsOptional()
  @IsUrl({}, { message: 'URL must be a valid link' })
  url?: string;

  @IsOptional()
  @IsUrl({}, { message: 'URL2 must be a valid link' })
  url2?: string;

  @IsOptional()
  @IsString()
  alt_tag?: string;

  @IsOptional()
  status?: number;
}
