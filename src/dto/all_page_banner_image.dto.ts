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
  meta_key?: string;

  @IsOptional()
  @IsString()
  meta_value?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
}
