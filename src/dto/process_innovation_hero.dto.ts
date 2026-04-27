import { IsString, IsOptional, IsInt, IsNumber, IsIn } from 'class-validator';

export class ProcessInnovationHeroDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image?: string;
}
