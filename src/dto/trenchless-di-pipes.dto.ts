import { IsOptional, IsString } from 'class-validator';

export class TrenchlessDIPipesDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;
}