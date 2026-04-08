import { IsOptional, IsString, MaxLength } from 'class-validator';

export class mini_statsDto {
  @IsOptional()
  @IsString()
  cardImage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  cardImageAlt?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  statsCount?: string;
}