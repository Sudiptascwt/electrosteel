import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { pipes_sectionService } from './pipes_section.service';
import { pipes_sectionDto } from '../../dto/pipes_section.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('pipes_section')
export class pipes_sectionController {
    constructor(private readonly pipes_sectionService: pipes_sectionService) {}

    // Create pipes_section
    @Post()
    async create(@Body() createDto: pipes_sectionDto) {
        if(createDto.title==null){
            throw new BadRequestException('Title is required');
        }
        return this.pipes_sectionService.create(createDto);
    }

    // Get all pipes_section
    @Get()
    async findAll() {
        return this.pipes_sectionService.findAll();
    }

    // Get pipes_section by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.pipes_sectionService.findById(id);
    }

    // Update pipes_section
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: pipes_sectionDto
    ) {
        return this.pipes_sectionService.update(id, updateDto);
    }

    // Delete pipes_section
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.pipes_sectionService.delete(id);
    }
}
