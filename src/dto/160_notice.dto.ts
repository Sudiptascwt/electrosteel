import { IsString, IsOptional, IsInt } from 'class-validator';

export class Notices160Dto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;

  @IsInt()
  pdf_id: number;
}
