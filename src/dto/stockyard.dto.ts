import { IsString, IsOptional, IsIBAN, IsInt, IsNumber, IsIn } from 'class-validator';

export class StockYardDto {

  @IsString()
  banner_image: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsInt()
  image_id?:number

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
