import { IsString, IsOptional, IsInt, IsNumber, IsIn } from 'class-validator';

export class NewsPaperPublicationDto {
  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsString()
  title: string;

  @IsString()
  pdf: string;

  @IsOptional()
  @IsInt()
  pdf_id: number;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
