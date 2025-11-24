import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt } from 'class-validator';

export class NcltFinalOrderDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'pdf is required' })
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