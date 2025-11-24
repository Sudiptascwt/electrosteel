import { IsInt, IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';

export class InvestorRelationDto {
  @IsString()
  heading: number;

  @IsString()
  email: string;

  @IsString()
  alt_email: string;

  @IsString()
  address: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
}
