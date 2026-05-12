import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { DuctileIronFittingService } from './ductile_iron_fitting.service';

@Controller('products/admin')
export class DuctileIronFittingController {
    constructor(private readonly service: DuctileIronFittingService) {}

    @Post(':sectionType/create-or-update/:category')
    async createOrUpdate(
    @Param('sectionType') sectionType: string,
    @Param('category') category: string,
    @Body() data: any,
    ) {
    const validSections = [
        'overview',
        'product-details',
        'application',
        'jointing-systems',
        'protection-internal',
        'protection-external',
    ];

    if (!validSections.includes(sectionType)) {
        throw new BadRequestException(`Invalid section type: ${sectionType}`);
    }

    return this.service.createOrUpdate(sectionType, category, data);
    }

    // Get Data - All Sections
    @Get(':sectionType/:category')
    async getData(
    @Param('sectionType') sectionType: string,
    @Param('category') category: string,
    @Query('id') id?: string,
    ) {
    const validSections = [
        'overview',
        'product-details',
        'application',
        'jointing-systems',
        'protection-internal',
        'protection-external',
    ];

    if (!validSections.includes(sectionType)) {
        throw new BadRequestException(
        `Invalid section type: ${sectionType}`,
        );
    }

    const numericId = id ? parseInt(id, 10) : undefined;

    return this.service.getData(
        sectionType,
        category,
        numericId,
    );
    }
    
}