import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

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
  image_id: number;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
