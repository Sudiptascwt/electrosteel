import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PipesJointingDetailsDto } from './pipes_jointing_details.dto'

export class PipesJointingDto {
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

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;

  @ValidateNested({ each: true })
  @Type(() => PipesJointingDetailsDto)
  @IsOptional()
  details?: PipesJointingDetailsDto[];
}
