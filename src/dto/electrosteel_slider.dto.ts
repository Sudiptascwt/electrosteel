import { IsString, IsOptional } from 'class-validator';

export class ElectroSteelSliderDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsString()
  subtitle1: string;

  @IsString()
  subtitle2: string;
}
