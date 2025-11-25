import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CsrReportContentDto {
  @IsNotEmpty()
  @IsString()
  page_meta_key: string;

  @IsOptional()
  @IsString()
  page_meta_value: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
