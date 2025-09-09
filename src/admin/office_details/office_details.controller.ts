import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { OfficeDetailsService } from './office_details.service';
import { OfficeDetailsDto } from '../../dto/office_section.dto';

@Controller('office-details')
export class OfficeDetailsController {
    constructor(private readonly officeDetailsService: OfficeDetailsService) {}

    // Create office details
    @Post()
    async create(@Body() createDto: OfficeDetailsDto) {
        return this.officeDetailsService.create(createDto);
    }

    // Get all office details
    @Get()
    async findAll() {
        return this.officeDetailsService.findAll();
    }

    // Get office details by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.officeDetailsService.findById(id);
    }

    // Update office details
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: OfficeDetailsDto
    ) {
        return this.officeDetailsService.update(id, updateDto);
    }

    // Delete office details
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.officeDetailsService.delete(id);
    }
}
