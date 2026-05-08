import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
export class DuctileIronFittingJointingSystemDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  icon_url: string;

  @IsString()
  link_url: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}