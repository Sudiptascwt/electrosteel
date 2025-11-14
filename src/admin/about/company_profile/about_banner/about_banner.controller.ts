import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AboutBannerService } from './about_banner.service';
import { AboutBannerDto } from '../../../../dto/company_profile_banner.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../role/roles.guard';
import { Roles } from '../../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about')
export class AboutBannerController {
    constructor(private readonly AboutBannerervice: AboutBannerService) {}

    // Create committee type
    @Post('banner')
    async create(@Body() createDto: AboutBannerDto) {
        return this.AboutBannerervice.create(createDto);
    }

    // Get all committee type
    @Get('banner')
    async findAll() {
        return this.AboutBannerervice.findAll();
    }

    // Get committee type by ID
    @Get('banner/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.AboutBannerervice.findById(id);
    }

    // Update committee type
    @Put('banner/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: AboutBannerDto
    ) {
        return this.AboutBannerervice.update(id, updateDto);
    }

    // Delete committee type
    @Delete('banner/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.AboutBannerervice.delete(id);
    }
}
