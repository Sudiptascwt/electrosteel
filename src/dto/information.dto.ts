import { IsOptional, IsString, IsEnum, IsDate, IsInt, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class InformationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon_image?: string;

  @IsOptional()
  @IsString()
  video_image?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid URL format' })
  link?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
}
