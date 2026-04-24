import { IsString, IsOptional, IsBoolean, IsUrl, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LegendEclVideoDto {
  @ApiProperty({ required: false, description: 'ID for update, omit for create' })
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;

  @ApiProperty()
  @ApiProperty()
  @IsOptional()
  @IsString()
  video_link: string;
}