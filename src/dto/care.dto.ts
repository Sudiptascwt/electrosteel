import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CareDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  alise?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  video_image?: string;

  @IsString()
  @IsOptional()
  icon_image?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  plan_type?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
