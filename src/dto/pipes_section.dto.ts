import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, IsDate, IsNumber, IsIn } from 'class-validator';

export class ProductBrochuresDto {
  @ApiProperty({
    description: 'Unique ID of the brochure',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Title of the product brochure',
    example: 'Premium Product Catalog',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Sub-title of the product brochure',
    example: '2025 Edition - New Arrivals',
    required: false,
  })
  @IsString()
  @IsOptional()
  sub_title?: string;

  @ApiProperty({
    description: 'Image URL of the product brochure',
    example: 'https://example.com/uploads/brochures/catalog-image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'PDF file URL of the brochure',
    example: 'https://example.com/uploads/brochures/catalog.pdf',
    required: false,
  })
  @IsString()
  @IsOptional()
  pdf?: string;

  @ApiProperty({
    description: 'Brochure creation date',
    example: '2025-09-09T10:00:00.000Z',
    required: false,
  })
  
  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    description: 'Brochure modification date',
    example: '2025-09-09T12:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  modifiedAt?: Date;
}
