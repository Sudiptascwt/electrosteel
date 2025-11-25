import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt, IsIn } from 'class-validator';

export class SrikalahasthiNoticesDto {
  @IsNumber()
  @IsNotEmpty()
  srikalahasthi_pipe_id: number;

  @IsString()
  @IsNotEmpty()
  page_name: string;

  @IsString()
  @IsNotEmpty()
  page_subname: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  pdf?: string;

  @IsInt()
  @IsOptional()
  pdf_id?: number;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
