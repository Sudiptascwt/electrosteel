import { IsOptional, IsString } from 'class-validator';

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
}
