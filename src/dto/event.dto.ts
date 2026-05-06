// src/dto/event.dto.ts
import { IsString, IsOptional, IsBoolean, IsInt, IsDateString, Min } from 'class-validator';

export class EventDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  files?: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsString()
  bannerTitle?: string;

  @IsOptional()
  @IsString()
  bannerImage?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isLatest?: boolean;  // For latest events

  @IsOptional()
  @IsBoolean()
  isUpcoming?: boolean;  // For upcoming events

  @IsOptional()
  @IsBoolean()
  isHandpicked?: boolean;  // For handpicked videos

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}