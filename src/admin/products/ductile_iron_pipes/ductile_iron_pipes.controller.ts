// controllers/section.controller.ts
import { Controller, Get, Post, Body, Param, Query, BadRequestException, HttpStatus } from '@nestjs/common';
import { SectionService } from './ductile_iron_pipes.service';
import { SectionDto } from '../../../dto/section.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('ductile_iron_pipes')
export class SectionController {
    constructor(private readonly sectionService: SectionService) {}

    @Post(':sectionType/create-or-update')
    async createOrUpdate(
        @Param('sectionType') sectionType: string,
        @Body() data: SectionDto
    ) {
        try {
            const validSections = ['overview', 'product-details', 'application', 'jointing-systems', 'protection-internal', 'protection-external'];
            
            if (!validSections.includes(sectionType)) {
                throw new BadRequestException(`Invalid section type: ${sectionType}`);
            }
            
            return await this.sectionService.createOrUpdate(sectionType, data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':sectionType')
    async getData(
        @Param('sectionType') sectionType: string,
        @Query('id') id?: string
    ) {
        try {
            const validSections = ['overview', 'product-details', 'application', 'jointing-systems', 'protection-internal', 'protection-external'];
            
            if (!validSections.includes(sectionType)) {
                throw new BadRequestException(`Invalid section type: ${sectionType}`);
            }
            
            const numericId = id ? parseInt(id, 10) : undefined;
            return await this.sectionService.getData(sectionType, numericId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}