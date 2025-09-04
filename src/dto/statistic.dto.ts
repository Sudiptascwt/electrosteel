import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class StatisticDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  number_video?: string;

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
  @IsString()
  overview_title?: string;

  @IsOptional()
  @IsString()
  overview_sub_title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1], { message: 'Status must be either 0 or 1' })
  status?: number;
}
