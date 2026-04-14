import { IsString, IsOptional, IsNotEmpty, IsNumber, IsInt, IsEnum } from 'class-validator';

export class AboutPeopleDataDto {
  @IsOptional()
  @IsString()
  title?: string; 

  @IsOptional()
  @IsString()
  description?: string; 

  @IsOptional()
  @IsString()
  video?: string; 
}
