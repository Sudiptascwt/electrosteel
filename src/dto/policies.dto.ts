import { IsString, IsOptional, IsInt } from 'class-validator';

export class PoliciesDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  pdf?: string;

  @IsOptional()
  @IsInt()
  pdf_id?: number;
}
