import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt } from 'class-validator';

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
  
}
