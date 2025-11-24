import { IsString, IsOptional, IsNotEmpty, IsNumber, IsInt, IsEnum } from 'class-validator';

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

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
}
