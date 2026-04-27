import { IsOptional, IsString } from 'class-validator';

export class PolyurethaneLiningDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;
}