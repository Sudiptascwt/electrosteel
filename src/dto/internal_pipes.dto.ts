import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class InternalPipesDto {
  @IsString()
  title: number;

  @IsString()
  description: string;

  @IsString()
  guiding_stadards: string;

  @IsString()
  url: string;

  @IsString()
  pdf: string;
}
