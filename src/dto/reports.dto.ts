import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReportDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  start_date: string;

  @IsOptional()
  @IsString()
  end_date: string;

  @IsOptional()
  @IsString()
  pdf: string;
}
