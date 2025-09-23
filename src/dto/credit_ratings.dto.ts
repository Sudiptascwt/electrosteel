import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreditRatingsDto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;
}
