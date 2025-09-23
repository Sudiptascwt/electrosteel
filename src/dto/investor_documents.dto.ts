import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class InvestorDocumentsDto {
  @IsString()
  title: number;

  @IsString()
  pdf: string;
}
