import { IsString, IsOptional, IsNotEmpty, IsNumber, IsInt, IsEnum } from 'class-validator';

export class AdvertisementDto {
  @IsOptional()
  @IsString()
  title?: string; 

  @IsOptional()
  @IsString()
  sub_title?: string; 

  @IsOptional()
  @IsString()
  box_data?: string; 

  @IsOptional()
  @IsString()
  image_title?: string; 

  @IsOptional()
  @IsString()
  image1?: string; 

  @IsOptional()
  @IsString()
  image2?: string; 

  @IsOptional()
  @IsString()
  image3?: string; 
}
