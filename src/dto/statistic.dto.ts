import { IsString, IsOptional, IsNumber, IsInt, IsIn } from 'class-validator';

export class StatisticDto {
  @IsString()
  title1: string;

  @IsOptional()
  @IsString()
  number1?: string;

  @IsOptional()
  @IsString()
  number_video1?: string;

  @IsOptional()
  @IsNumber()
  number_video_id_1?: number;

  @IsString()
  title2: string;

  @IsOptional()
  @IsString()
  number2?: string;

  @IsOptional()
  @IsString()
  number_video2?: string;

  @IsOptional()
  @IsNumber()
  number_video_id_2?: number;

  @IsString()
  title3: string;

  @IsOptional()
  @IsString()
  number3?: string;

  @IsOptional()
  @IsString()
  number_video3?: string;

  @IsOptional()
  @IsNumber()
  number_video_id_3?: number;

  @IsString()
  title4: string;

  @IsOptional()
  @IsString()
  number4?: string;

  @IsOptional()
  @IsString()
  number_video4?: string;

  @IsOptional()
  @IsNumber()
  number_video_id_4?: number;

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
  @IsInt()
  overview_image_id?: number;

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
  @IsString()
  overview_video?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
