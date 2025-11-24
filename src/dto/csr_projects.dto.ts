import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CsrProjectsDto {
  @IsString()
  @IsNotEmpty()
  start_date: string;

  @IsString()
  @IsNotEmpty()
  end_date: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  pdf: string;

  @IsInt()
  @IsOptional()
  pdf_id?: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
