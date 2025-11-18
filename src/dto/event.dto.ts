import { IsString, IsOptional, IsInt } from 'class-validator';

export class EventDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  image: string;

  @IsInt()
  image_id: number;

  @IsString()
  url: string;
}
