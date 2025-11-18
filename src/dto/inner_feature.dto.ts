import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

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

}
