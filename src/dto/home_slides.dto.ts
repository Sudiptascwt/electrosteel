import { IsNotEmpty, IsOptional, IsString, IsEnum, IsUrl, MaxLength } from 'class-validator';

export class home_slidesDto {

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(225)
  type?: string;  

  @IsOptional()
  @IsString()
  src?: string;    

  @IsOptional()
  @IsString()
  highlight?: string; 

  @IsOptional()
  @IsUrl()
  url?: string;  
}