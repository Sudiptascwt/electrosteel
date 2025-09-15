import { IsString, IsOptional } from 'class-validator';

export class NewsLetterDto {
  @IsString()
  banner_image: string;

  @IsString()
  year: string;

  @IsString()
  month: string;

  @IsString()
  image: string;

  @IsString()
  pdf: string;
}
