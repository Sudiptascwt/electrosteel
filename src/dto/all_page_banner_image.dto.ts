import { IsEnum, IsOptional, IsString } from 'class-validator';

export class AllBannerDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  page_name?: string;

  @IsOptional()
  @IsString()
  page_sub_name?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
