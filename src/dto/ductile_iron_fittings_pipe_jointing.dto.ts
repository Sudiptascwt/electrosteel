import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
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

  @IsString()
  @IsOptional()
  pdf?: string;

  @ValidateNested({ each: true })
  @Type(() => PipesJointingDetailsDto)
  @IsOptional()
  details?: PipesJointingDetailsDto[];
}
