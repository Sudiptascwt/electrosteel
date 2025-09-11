import { IsString, IsOptional } from 'class-validator';

export class EventDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  image: string;

  @IsString()
  url: string;
}
