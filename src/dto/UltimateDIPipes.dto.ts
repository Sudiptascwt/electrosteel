import { IsString, IsOptional, IsInt, IsNumber, IsIn } from 'class-validator';

export class UltimateDIPipesDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

}
