import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt, IsEnum } from 'class-validator';

export class BlogsDto {
  @IsOptional()
  @IsInt()
  id: number;
  
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  images?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  banner_title?: string;

  @IsOptional()
  @IsString()
  banner_image?: string;
  
  @IsOptional()
  @IsString()
  editor_description?: string;

  @IsOptional()
  @IsString()
  slider_contet?: string;

  @IsOptional()
  @IsString()
  slider_image?: string;

  @IsOptional()
  @IsString()
  badge?: string;

  @IsOptional()
  @IsString()
  add_to_home?: string;
}
