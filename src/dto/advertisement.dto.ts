import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt } from 'class-validator';

export class AdvertisementDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Page ID is required' })
  page_id: number;

  @IsOptional()
  @IsString()
  image?: string; 

  @IsOptional()
  @IsInt()
  image_id?: number;
}
