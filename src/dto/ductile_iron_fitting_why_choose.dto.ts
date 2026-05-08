import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
export class DuctileIronFittingWhyChooseListItemDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  list_item: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;
}
export class DuctileIronFittingWhyChooseDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingWhyChooseListItemDto)
  lists: DuctileIronFittingWhyChooseListItemDto[];
}