import { IsEnum, IsOptional, IsString } from 'class-validator';

export class AboutBannerDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  image_id: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
