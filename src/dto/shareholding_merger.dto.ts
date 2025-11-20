import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';

export class ShareholderMergerDto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;

  @IsInt()
  pdf_id: number;
}
