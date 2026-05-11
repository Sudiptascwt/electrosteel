import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { DuctileIronPipesService } from './ductile_iron_pipes.service';

@Controller('ductile-iron-pipes')
export class DuctileIronPipesController {
    constructor(private readonly service: DuctileIronPipesService) {}

    @Post(':sectionType/create-or-update')
    async createOrUpdate(
        @Param('sectionType') sectionType: string,
        @Body() data: any
    ) {
        const validSections = ['overview', 'product-details', 'application', 'jointing-systems', 'protection-internal', 'protection-external'];
        
        if (!validSections.includes(sectionType)) {
            throw new BadRequestException(`Invalid section type: ${sectionType}`);
        }
        
        return this.service.createOrUpdate(sectionType, data);
    }

    // Get Data - All Sections
    @Get(':sectionType')
    async getData(
        @Param('sectionType') sectionType: string,
        @Query('id') id?: string
    ) {
        const validSections = ['overview', 'product-details', 'application', 'jointing-systems', 'protection-internal', 'protection-external'];
        
        if (!validSections.includes(sectionType)) {
            throw new BadRequestException(`Invalid section type: ${sectionType}`);
        }
        
        const numericId = id ? parseInt(id, 10) : undefined;
        return this.service.getData(sectionType, numericId);
    }
}