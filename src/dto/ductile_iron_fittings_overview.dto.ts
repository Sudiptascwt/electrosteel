import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class DuctileIronFittingsOverviewDto {
  @IsString()
  main_title: string;

  @IsOptional()
  @IsString()
  sub_title?: string;

  @IsOptional()
  @IsString()
  properties?: string;

  @IsOptional()
  @IsString()
  images?: string;

  @IsOptional()
  @IsString()
  below_images?: string;

  @IsOptional()
  @IsInt()
  images_id?: number;

  @IsOptional()
  @IsInt()
  below_images_id?: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
