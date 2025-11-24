import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt, IsEnum } from 'class-validator';

export class AnnualReportsDto {
  @IsString()
  @IsNotEmpty({ message: 'Start date is required' })
  start_date: string;

  @IsString()
  @IsNotEmpty({ message: 'End date is required' })
  end_date: string;

  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'pdf is required' })
  @IsString()
  pdf: string;

  @IsOptional()
  @IsInt()
  pdf_id: number

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
