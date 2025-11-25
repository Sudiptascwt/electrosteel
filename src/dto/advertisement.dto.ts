import { IsString, IsOptional, IsNotEmpty, IsNumber, IsInt, IsEnum } from 'class-validator';

export class AdvertisementDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Page ID is required' })
  page_id: number;

  @IsOptional()
  @IsString()
  title1?: string; 

  @IsOptional()
  @IsString()
  title2?: string; 

  @IsOptional()
  @IsString()
  sub_title1?: string; 

  @IsOptional()
  @IsString()
  sub_title2?: string; 

  @IsOptional()
  @IsString()
  features?: string; 

  @IsOptional()
  @IsString()
  image1?: string; 

  @IsOptional()
  @IsString()
  image2?: string; 

  @IsOptional()
  @IsString()
  image3?: string; 

  @IsOptional()
  @IsInt()
  image1_id?: number;

  @IsOptional()
  @IsInt()
  image2_id?: number;

  @IsOptional()
  @IsInt()
  image3_id?: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
}
