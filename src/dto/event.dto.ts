import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

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

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
