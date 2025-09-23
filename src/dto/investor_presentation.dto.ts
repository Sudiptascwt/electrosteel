import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class InvestorPresentationDto {
  @IsString()
  title: number;

  @IsString()
  pdf: string;
}
