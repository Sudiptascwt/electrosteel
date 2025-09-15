import { IsString, IsOptional } from 'class-validator';

export class DigitalVideosDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  video_url: string;
}
