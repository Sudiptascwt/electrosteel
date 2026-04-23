import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber, IsIn } from 'class-validator';

export class MilestoneBannerDto {
  @IsString()
  title: string;

  @IsString()
  banner: string;
}

