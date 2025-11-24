import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt, IsEnum } from 'class-validator';

export class IepfSuspenseDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'PDF is required' })
  pdf: string;

  @IsInt()
  @IsOptional()
  pdf_id: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
  
}
