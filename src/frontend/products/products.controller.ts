import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { frontendProductService } from './products.service';

@Controller('frontend/products')
export class frontendProductController {
  constructor(private readonly service: frontendProductService) {}

@Get(':sectionType')
async getData(
  @Param('sectionType') sectionType: string,
  @Query('id') id?: string,
) {
  const validSections = [
    'overview',
    'productDetails',
    'application',
    'jointingSystems',
    'protectionInternal',
    'protectionExternal',
    'ductile_iron_pipes',
  ];

  if (!validSections.includes(sectionType)) {
    throw new BadRequestException(`Invalid section type: ${sectionType}`);
  }

  const numericId = id ? parseInt(id, 10) : undefined;

  if (sectionType === 'ductile_iron_pipes') {
    return this.service.getData('all', numericId);
  }

  return this.service.getData(sectionType, numericId);
}
}