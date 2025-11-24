import { IsInt, IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';

export class InvestorStockInfoDto {
  @IsString()
  address: string;

  @IsString()
  stock_code: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
