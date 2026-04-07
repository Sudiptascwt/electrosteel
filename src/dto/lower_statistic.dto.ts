import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt } from 'class-validator';

export class LowerStatisticDto {
  @IsOptional()
  @IsString()
  pipes_title?: string;

  @IsOptional()
  @IsString()
  pipes_number?: string;

  @IsOptional()
  @IsString()
  overview_image?: string;

  @IsOptional()
  @IsInt()
  overview_image_id?: number;

  @IsOptional()
  @IsString()
  overview_title?: string;

  @IsOptional()
  @IsString()
  overview_sub_title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
