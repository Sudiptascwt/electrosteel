import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class FittingsPipesJointingDetailsDto {
  @IsOptional()
  @IsInt()
  fittings_pipes_jointing_id?: number; // foreign key ID reference

  @IsOptional()
  @IsString()
  image1?: string;

  @IsOptional()
  @IsString()
  image2?: string;

  @IsOptional()
  @IsString()
  image3?: string;

  @IsOptional()
  @IsString()
  image4?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  table_note?: string;

  @IsOptional()
  @IsString()
  content_image?: string;

  @IsOptional()
  @IsString()
  add_title?: string;

  @IsOptional()
  @IsString()
  add_description?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
