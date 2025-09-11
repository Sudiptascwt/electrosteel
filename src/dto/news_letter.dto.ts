import { IsString, IsOptional } from 'class-validator';

export class NewsLetterDto {
  @IsString()
  year: string;

  @IsString()
  month: string;

  @IsString()
  image: string;

  @IsString()
  pdf: string;
}
