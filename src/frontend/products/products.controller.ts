// controllers/section.controller.ts
import { Controller, Get, BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { frontendProductService } from './products.service';

@Controller('frontend/products')
export class frontendProductController {
    constructor(private readonly sectionService: frontendProductService) {}

    @Get('ductile_iron_pipes')
    async getAllSections() {
        try {
            return await this.sectionService.getAllSections();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}