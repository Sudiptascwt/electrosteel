import { IsString, IsOptional, IsInt, IsNumber, IsIn } from 'class-validator';

export class PoliciesDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  pdf?: string;

  @IsOptional()
  @IsInt()
  pdf_id?: number;

  // @IsOptional()
  // @IsNumber()
  // @IsIn([0, 1]) // Only allow 0 or 1
  // status?: number;
}
