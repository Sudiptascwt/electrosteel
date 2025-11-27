import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt, IsEnum } from 'class-validator';

export class BelowBannerDto {
  @IsString()
  name1?: string;

  @IsString()
  name2?: string;

  @IsString()
  title?: string;

  @IsString()
  description: string;

  @IsString()
  video: string;

  @IsInt()
  video_id: number

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
