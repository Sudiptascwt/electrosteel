import { IsString, IsOptional, IsNotEmpty, IsNumber, IsInt, IsEnum } from 'class-validator';

export class AboutDuctileIronDto {
  @IsOptional()
  @IsString()
  title?: string; 

  @IsOptional()
  @IsString()
  image?: string; 

  @IsOptional()
  @IsString()
  description?: string; 

  @IsOptional()
  @IsString()
  video?: string; 

  @IsOptional()
  @IsString()
  technology_title_1?: string; 

  @IsOptional()
  @IsString()
  technology_title_2?: string; 
}
