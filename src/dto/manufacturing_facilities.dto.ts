import { IsString, IsOptional, IsNotEmpty, IsNumber, IsInt, IsEnum } from 'class-validator';

export class ManufacturingFacilitiesDto {
  @IsOptional()
  @IsString()
  title?: string; 

  @IsOptional()
  @IsString()
  features?: string; 

  @IsOptional()
  @IsString()
  phone?: string; 

  @IsOptional()
  @IsString()
  description?: string; 

  @IsOptional()
  @IsString()
  address?: string; 
}
