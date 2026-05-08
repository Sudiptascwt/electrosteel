import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
export class DuctileIronFittingProtectionExternalModalDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  description1?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}

export class DuctileIronFittingProtectionExternalItemDto {
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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingProtectionExternalModalDto)
  modal?: DuctileIronFittingProtectionExternalModalDto[];

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}

export class DuctileIronFittingProtectionExternalDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingProtectionExternalItemDto)
  items: DuctileIronFittingProtectionExternalItemDto[];
}