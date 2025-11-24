import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt, IsEnum } from 'class-validator';

export class AnnualReturnDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'pdf is required' })
  @IsString()
  pdf: string;

  @IsInt()
  @IsOptional()
  pdf_id: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}