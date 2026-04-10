import { IsNotEmpty, IsOptional, IsString, IsEnum, IsUrl, MaxLength } from 'class-validator';

export class headingsDto {

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  sub_title?: string;  

  @IsOptional()
  @IsString()
  description?: string;    

  @IsOptional()
  @IsString()
  section_type?: string; 
}