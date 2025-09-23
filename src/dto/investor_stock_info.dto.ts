import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class InvestorStockInfoDto {
  @IsString()
  address: string;

  @IsString()
  stock_code: string;
}
