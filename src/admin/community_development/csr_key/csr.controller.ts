import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CsrKeyService } from './csr.service';
import { CsrKeyDto } from '../../../dto/csr_key.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CsrOverviewDto } from 'src/dto/csr_overview.dto';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller()
export class CsrKeyController {
    constructor(private readonly CsrKeyService: CsrKeyService) {}

    // Create CsrKey details
    @Post('csr-key')
    async create(@Body() createDto: CsrKeyDto) {
        return this.CsrKeyService.create(createDto);
    }

    // Get all CsrKey details
    @Get('csr-key')
    async findAll() {
        return this.CsrKeyService.findAll();
    }

    // Get CsrKey details by ID
    @Get('csr-key/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.CsrKeyService.findById(id);
    }

    // Update CsrKey details
    @Put('csr-key/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: CsrKeyDto
    ) {
        return this.CsrKeyService.update(id, updateDto);
    }

    // Delete CsrKey details
    @Delete('csr-key/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.CsrKeyService.delete(id);
    }
    ////////////csr overview//////////
        // Create CsrKey details
    @Post('csr-overview')
    async createCsrOverview(@Body() createDto: CsrOverviewDto) {
        return this.CsrKeyService.createCsrOverview(createDto);
    }

    // Get all CsrKey details
    @Get('csr-overview')
    async findAllCsrOverviews() {
        return this.CsrKeyService.findAllCsrOverviews();
    }

    // Get CsrKey details by ID
    @Get('csr-overview/:id')
    async findCsrOverviewById(@Param('id', ParseIntPipe) id: number) {
        return this.CsrKeyService.findCsrOverviewById(id);
    }

    // Update CsrKey details
    @Put('csr-overview/:id')
    async updateCsrOverview(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: CsrOverviewDto
    ) {
        return this.CsrKeyService.updateCsrOverview(id, updateDto);
    }

    // Delete CsrKey details
    @Delete('csr-overview/:id')
    async deleteCsrOverview(@Param('id', ParseIntPipe) id: number) {
        return this.CsrKeyService.deleteCsrOverview(id);
    }
}
