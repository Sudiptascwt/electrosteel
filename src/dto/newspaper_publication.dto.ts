import { IsString, IsOptional, IsInt } from 'class-validator';

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
}
