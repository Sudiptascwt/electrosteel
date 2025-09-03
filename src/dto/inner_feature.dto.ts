import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class InnerFeatureDto {
  @IsInt()
  page_id: number;

  @IsString()
  feature_title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsString()
  banner_sub_title?: string;

  @IsOptional()
  @IsInt()
  status?: number;
}
