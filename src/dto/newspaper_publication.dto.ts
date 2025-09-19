import { IsString, IsOptional } from 'class-validator';

export class NewsPaperPublicationDto {
  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsString()
  title: string;

  @IsString()
  pdf: string;
}
