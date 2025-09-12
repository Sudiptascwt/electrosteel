import { IsString, IsOptional } from 'class-validator';

export class StockYardDto {

  @IsString()
  banner_image: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
