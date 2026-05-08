import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
export class DuctileIronFittingApplicationItemDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  item_text: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}

export class DuctileIronFittingApplicationColumnDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  column_index: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingApplicationItemDto)
  items: DuctileIronFittingApplicationItemDto[];

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}

export class DuctileIronFittingApplicationDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingApplicationColumnDto)
  columns: DuctileIronFittingApplicationColumnDto[];
}