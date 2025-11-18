import { IsString, IsOptional, IsInt } from 'class-validator';

export class NewsLetterDto {
  @IsString()
  banner_image: string;

  @IsInt()
  banner_image_id: number;

  @IsString()
  year: string;

  @IsString()
  month: string;

  @IsString()
  image: string;

  @IsInt()
  image_id: number;

  @IsString()
  pdf: string;
}
