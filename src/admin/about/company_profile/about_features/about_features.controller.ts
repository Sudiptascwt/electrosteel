import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AboutFeatureService } from './about_banner.service';
import { AboutFeatureDto } from '../../../../dto/company_profile_banner.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../role/roles.guard';
import { Roles } from '../../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about')
export class AboutFeatureController {
    constructor(private readonly AboutFeatureervice: AboutFeatureService) {}

    // Create committee type
    @Post('banner')
    async create(@Body() createDto: AboutFeatureDto) {
        return this.AboutFeatureervice.create(createDto);
    }

    // Get all committee type
    @Get('banner')
    async findAll() {
        return this.AboutFeatureervice.findAll();
    }

    // Get committee type by ID
    @Get('banner/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.AboutFeatureervice.findById(id);
    }

    // Update committee type
    @Put('banner/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: AboutFeatureDto
    ) {
        return this.AboutFeatureervice.update(id, updateDto);
    }

    // Delete committee type
    @Delete('banner/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.AboutFeatureervice.delete(id);
    }
}
