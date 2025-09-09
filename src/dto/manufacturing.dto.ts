
// import {
//   IsString,
//   IsOptional,
//   IsNotEmpty,
//   IsDate,
//   IsNumber,
// } from 'class-validator';

// export class ManufacturingUnitDto {
//   @IsNumber()
//   @IsOptional()
//   id?: number;

//   @IsString()
//   @IsOptional()
//   title?: string;

//   @IsString()
//   @IsOptional()
//   address?: string;

//   @IsString()
//   @IsOptional()
//   phone_number?: string;

//   @IsString()
//   @IsOptional()
//   alt_phone_number?: string;

//   @IsString()
//   @IsOptional()
//   fax_number?: string;

//   @IsString()
//   @IsOptional()
//   google_map_link?: string;

//   @IsDate()
//   @IsOptional()
//   createdAt?: Date;

//   @IsDate()
//   @IsOptional()
//   modifiedAt?: Date;
// }


import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class ManufacturingUnitDto {
  @ApiPropertyOptional({
    description: 'Unique ID of the manufacturing unit',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Title of the manufacturing unit',
    example: 'ABC Manufacturing Plant',
    required: true,
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Full address of the manufacturing unit',
    example: '123 Industrial Area, Bangalore, India',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: 'Primary contact number',
    example: '+91-9876543210',
  })
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiPropertyOptional({
    description: 'Alternative contact number',
    example: '+91-9123456789',
  })
  @IsString()
  @IsOptional()
  alt_phone_number?: string;

  @ApiPropertyOptional({
    description: 'Fax number of the unit',
    example: '+91-080-12345678',
  })
  @IsString()
  @IsOptional()
  fax_number?: string;

  @ApiPropertyOptional({
    description: 'Google Maps location link',
    example: 'https://goo.gl/maps/xyz123',
  })
  @IsString()
  @IsOptional()
  google_map_link?: string;

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
