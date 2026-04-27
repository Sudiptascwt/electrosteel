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

  // @IsEnum([0, 1])
  // @IsOptional()
  // status?: 0 | 1;
}
