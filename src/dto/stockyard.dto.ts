import { IsString, IsOptional, IsIBAN, IsInt } from 'class-validator';

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
}
