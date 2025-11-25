import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt } from 'class-validator';

export class AppointmentletterDto {
  @IsInt()
  srikalahasthi_pipe_id: number;

  @IsOptional()
  @IsString()
  page_name: string;

  @IsOptional()
  @IsString()
  page_subname: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
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






