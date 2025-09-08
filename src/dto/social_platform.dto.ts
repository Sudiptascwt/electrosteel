import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class SocialPlatformDto {
  @IsString()
  @IsOptional()
  instagram: string;

  @IsString()
  @IsOptional()
  linkedin: string;

  @IsOptional()
  @IsString()
  twitter?: string; 

  @IsOptional()
  @IsString()
  youtube?: string;

  @IsOptional()
  @IsString()
  facebook?: string;
}
