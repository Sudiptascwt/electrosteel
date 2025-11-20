import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VotingResultsDto {
  @IsNotEmpty()
  @IsString()
  start_date: string;

  @IsNotEmpty()
  @IsString()
  end_date: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  pdf: string;

  @IsOptional()
  @IsInt()
  pdf_id: number;
}
