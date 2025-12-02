import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AboutFacilityService } from './manufacturing_facility.service';
import { AboutFacilityDto } from '../../../../dto/company_profile_facility.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../role/roles.guard';
import { Roles } from '../../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about')
export class AboutFacilityController {
    constructor(private readonly AboutFacilityervice: AboutFacilityService) {}

    // Create committee type
    @Post('facility')
    async create(@Body() body: any) {
        return this.AboutFacilityervice.create(body);
    }
    

    // Get all committee type
    @Get('facility')
    async findAll() {
        return this.AboutFacilityervice.findAll();
    }

    // Get committee type by ID
    @Get('facility/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.AboutFacilityervice.findById(id);
    }

    // Update committee type
    @Put('facility/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: AboutFacilityDto
    ) {
        return this.AboutFacilityervice.update(id, updateDto);
    }

    // Delete committee type
    @Delete('facility/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.AboutFacilityervice.delete(id);
    }
}
