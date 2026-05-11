import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
// Remove this DTO if it exists
// export class DuctileIronFittingWhyChooseListItemDto {
//   list_item: string;
//   sort_order?: number;
// }

// Update WhyChoose DTO
export class DuctileIronFittingWhyChooseDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  lists: string[];  // Array of strings
}