import { IsString, IsOptional, IsNotEmpty, IsNumber, IsInt, IsEnum } from 'class-validator';

export class AboutMainDto {
  @IsOptional()
  @IsString()
  title?: string; 

  @IsOptional()
  @IsString()
  image?: string; 
}
