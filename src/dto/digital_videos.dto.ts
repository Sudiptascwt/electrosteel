import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

export class DigitalVideosDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsInt()
  image_id: number;

  @IsString()
  video_url: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
