// src/modules/legend-ecl-cards/dto/create-card.dto.ts
import { IsString, IsOptional, IsNumber, IsBoolean, IsUrl, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LegendEclCardDto {
  @ApiProperty({ required: false, description: 'ID for update, omit for create' })
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;
  
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsString()
  link: string;
}