import { IsString, IsOptional, IsInt, IsNumber, IsIn } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
