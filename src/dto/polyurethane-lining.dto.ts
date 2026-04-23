import { IsOptional, IsString } from 'class-validator';

export class PolyurethaneLiningDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsString()
  image: string;
}