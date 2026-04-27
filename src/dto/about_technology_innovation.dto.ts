import { IsString, IsOptional } from 'class-validator';

export class about_technology_innovationDto {
  @IsOptional()
  @IsString()
  title?: string; 

  @IsOptional()
  @IsString()
  description?: string; 

  @IsOptional()
  @IsString()
  video?: string; 

  @IsOptional()
  @IsString()
  buttonLink?: string; 
}
