import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PipesJointingDetailsDto } from './pipes_jointing_details.dto'

export class FittingsPipesJointingDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsInt()
  image_id?: number;

  @IsString()
  @IsOptional()
  pdf?: string;

  @IsOptional()
  @IsInt()
  pdf_id?: number;

  @ValidateNested({ each: true })
  @Type(() => PipesJointingDetailsDto)
  @IsOptional()
  details?: PipesJointingDetailsDto[];
}
