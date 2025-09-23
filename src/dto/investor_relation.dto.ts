import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class InvestorRelationDto {
  @IsString()
  heading: number;

  @IsString()
  email: string;

  @IsString()
  alt_email: string;

  @IsString()
  address: string;
}
