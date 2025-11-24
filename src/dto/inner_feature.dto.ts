import { IsInt, IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';

export class InnerFeatureDto {
  @IsString()
  feature_title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsInt()
  video_id?: number

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 

}
