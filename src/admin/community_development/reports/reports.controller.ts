import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ReportService } from './reports.service';
import { ReportDto } from '../../../dto/reports.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CsrReportContentDto } from 'src/dto/report_content.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller()
export class ReportController {
    constructor(private readonly ReportService: ReportService) {}

    // Create Report
    @Post('report')
    async create(@Body() createDto: ReportDto) {
        if(createDto.title==null){
            throw new BadRequestException('Title is required');
        }
        return this.ReportService.create(createDto);
    }

    // Get all Report
    @Get('report')
    async findAll() {
        return this.ReportService.findAll();
    }

    // Get Report by ID
    @Get('report/:id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.ReportService.findById(id);
    }

    // Update Report
    @Put('report/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: ReportDto
    ) {
        return this.ReportService.update(id, updateDto);
    }

    // Delete Report
    @Delete('report/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.ReportService.delete(id);
    }
    ////////report content//////////
    @Post('report/content')
    async createReportContent(@Body() createDto: CsrReportContentDto) {
        return this.ReportService.createReportContent(createDto);
    }

    // Get all Report
    @Get('report/content/all')
    async findAllReportContents() {
        return this.ReportService.findAllReportContents();
    }

    // Get Report by ID
    @Get('report/content/:id')
    async findReportContentById(@Param('id', ParseIntPipe) id: number) {
        return this.ReportService.findReportContentById(id);
    }

    // Update Report
    @Put('report/content/:id')
    async updateReportContent(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: CsrReportContentDto
    ) {
        return this.ReportService.updateReportContent(id, updateDto);
    }

    // Delete Report
    @Delete('report/content/:id')
    async deleteReportContent(@Param('id', ParseIntPipe) id: number) {
        return this.ReportService.deleteReportContent(id);
    }
}
