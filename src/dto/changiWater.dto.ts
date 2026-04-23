import { IsString, IsOptional, IsInt, IsIn, IsBoolean, IsObject, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class changiWaterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
