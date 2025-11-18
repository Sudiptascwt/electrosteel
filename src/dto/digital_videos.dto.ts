import { IsString, IsOptional, IsInt } from 'class-validator';

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
}
