import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
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

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;

  @ValidateNested({ each: true })
  @Type(() => PipesJointingDetailsDto)
  @IsOptional()
  details?: PipesJointingDetailsDto[];
}
