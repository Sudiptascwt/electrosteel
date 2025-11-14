import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt } from 'class-validator';

export class BelowBannerDto {
  @IsString()
  title?: string;

  @IsString()
  description: string;

  @IsString()
  video: string;
}
