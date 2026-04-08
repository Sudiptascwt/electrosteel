// create-overview-section.dto.ts
import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OverviewSectionDto {
  @ApiPropertyOptional({ description: 'Section title', example: 'Our Mission' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Section subtitle', example: 'Driving Innovation' })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiPropertyOptional({ description: 'Section description', example: 'We are committed to...' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  url?: string;
}