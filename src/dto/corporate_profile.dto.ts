import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class  CorporateProfileDto {
  @IsOptional()
  @IsString()
  page_meta_key: string;

  @IsOptional()
  @IsString()
  page_meta_value: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
