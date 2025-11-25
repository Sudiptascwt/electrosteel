import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class QualityResultsDto {
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
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
