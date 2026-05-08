import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
export class DuctileIronFittingProtectionInternalModalDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  description1?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description2?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}

export class DuctileIronFittingProtectionInternalItemDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  guiding_standards?: string;

  @IsOptional()
  @IsString()
  download_url?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingProtectionInternalModalDto)
  modal?: DuctileIronFittingProtectionInternalModalDto[];

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}

export class DuctileIronFittingProtectionInternalDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingProtectionInternalItemDto)
  items: DuctileIronFittingProtectionInternalItemDto[];
}