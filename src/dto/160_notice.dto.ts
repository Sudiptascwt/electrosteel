import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export class Notices160Dto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;

  @IsInt()
  pdf_id: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;  
}
