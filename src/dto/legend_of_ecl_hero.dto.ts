import { IsString, IsOptional, IsBoolean, IsUrl, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LegendHeroSectionDto {
  @ApiProperty({ required: false, description: 'ID for update, omit for create' })
  @IsInt()
  @Min(1)
  id?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  banner: string;
}