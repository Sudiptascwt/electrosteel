import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
export class DuctileIronFittingOverviewDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  image_url: string;
}