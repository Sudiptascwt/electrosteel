import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export class GlobalPresenceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  style?: string;

  @IsOptional()
  @IsString()
  country_title?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
}
