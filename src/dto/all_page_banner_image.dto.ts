import { IsEnum, IsOptional, IsString } from 'class-validator';

export class AllBannerDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
