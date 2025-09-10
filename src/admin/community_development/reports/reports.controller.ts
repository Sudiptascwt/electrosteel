import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ReportService } from './reports.service';
import { ReportDto } from '../../../dto/reports.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('report')
export class ReportController {
    constructor(private readonly ReportService: ReportService) {}

    // Create Report
    @Post()
    async create(@Body() createDto: ReportDto) {
        if(createDto.title==null){
            throw new BadRequestException('Title is required');
        }
        return this.ReportService.create(createDto);
    }

    // Get all Report
    @Get()
    async findAll() {
        return this.ReportService.findAll();
    }

    // Get Report by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.ReportService.findById(id);
    }

    // Update Report
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: ReportDto
    ) {
        return this.ReportService.update(id, updateDto);
    }

    // Delete Report
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.ReportService.delete(id);
    }
}
