import { IsString, IsOptional, IsInt } from 'class-validator';

export class ElectroSteelSliderDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsString()
  subtitle1: string;

  @IsString()
  subtitle2: string;

  @IsInt()
  image_id: number
}
