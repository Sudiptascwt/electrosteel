import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { CorporateProfileService } from './corporate_profile.service';
import { CreateLifeElectrosteelContentDto } from 'src/dto/life_electrosteel_content.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CorporateProfileDto } from 'src/dto/corporate_profile.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about/corporate-profile')
export class CorporateProfileController {
    constructor(private readonly CorporateProfileService: CorporateProfileService) {}

    // Create CorporateProfile
    @Post()
    async create(@Body() createDto: CorporateProfileDto) {
        return this.CorporateProfileService.create(createDto);
    }

    // Get all CorporateProfile
    @Get()
    async findAll() {
        return this.CorporateProfileService.findAll();
    }

    // Get CorporateProfile by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.CorporateProfileService.findById(id);
    }

    // Update CorporateProfile
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: CorporateProfileDto
    ) {
        return this.CorporateProfileService.update(id, updateDto);
    }

    // Delete CorporateProfile
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.CorporateProfileService.delete(id);
    }
}
