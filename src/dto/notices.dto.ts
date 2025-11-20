import { IsString, IsOptional, IsInt } from 'class-validator';

export class NoticesDto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;

  @IsOptional()
  @IsInt()
  pdf_id: number;
}
