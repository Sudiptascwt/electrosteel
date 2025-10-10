import { IsOptional, IsString } from 'class-validator';

export class DuctileIronFittingsDetailsDto {
  @IsString()
  main_title: string;

  @IsOptional()
  @IsString()
  sub_title: string;

  @IsOptional()
  @IsString()
  properties: string;

  @IsOptional()
  @IsString()
  images: string;

  @IsOptional()
  @IsString()
  below_images: string;
}
