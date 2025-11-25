import { IsString, IsOptional, IsEnum, IsInt, IsNumber, IsIn } from 'class-validator';

export class ShareholderMergerDto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;

  @IsInt()
  pdf_id: number;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
