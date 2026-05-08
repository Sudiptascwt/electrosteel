import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
export class DuctileIronFittingProductDetailsStandardDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  standard_name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}

export class DuctileIronFittingProductDetailsDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  image_url: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingProductDetailsStandardDto)
  standards: DuctileIronFittingProductDetailsStandardDto[];
}