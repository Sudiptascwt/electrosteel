import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreditRatingsDto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;

  @IsOptional()
  @IsInt()
  pdf_id: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
