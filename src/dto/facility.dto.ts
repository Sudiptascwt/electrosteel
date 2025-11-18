import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber, IsNotEmpty, IsInt } from 'class-validator';

export class FacilityDto {
  @ApiPropertyOptional({
    description: 'Title of the Facility',
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Description of the Facility',
    required: true,
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Image of the Facility'
  })
  @IsString()
  @IsOptional()
  image?: string;

  @IsInt()
  @IsOptional()
  image_id?: number;

  @ApiPropertyOptional({
    description: 'Primary contact number'
  })
  @IsString()
  @IsOptional()
  div_id: string;

  @ApiPropertyOptional({
    description: 'Creation timestamp',
    example: '2025-09-09T10:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiPropertyOptional({
    description: 'Last modification timestamp',
    example: '2025-09-09T12:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  modifiedAt?: Date;
}
