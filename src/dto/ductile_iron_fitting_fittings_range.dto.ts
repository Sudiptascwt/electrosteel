import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class DuctileIronFittingFittingsRangeItemDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  item_name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}

export class DuctileIronFittingFittingsRangeDto {
  @IsString()
  title: string;

  @IsUrl()
  image_url: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingFittingsRangeItemDto)
  items: DuctileIronFittingFittingsRangeItemDto[];
}