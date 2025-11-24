import { IsInt, IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';

export class InvestorDocumentsDto {
  @IsString()
  title: number;

  @IsString()
  pdf: string;

  @IsOptional()
  @IsInt()
  pdf_id: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
}
