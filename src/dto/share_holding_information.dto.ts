import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt } from 'class-validator';

export class ShareHoldingInformationDto {
  @IsOptional()
  @IsString()
  start_date: string; 

  @IsOptional()
  @IsString()
  end_date: string; 

  @IsOptional()
  @IsString()
  title: string; 

  @IsOptional()
  @IsString()
  pdf: string; 

  @IsOptional()
  @IsInt()
  pdf_id: number;
}
