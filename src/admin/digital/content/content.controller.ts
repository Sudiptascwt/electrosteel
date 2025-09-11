import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto } from '../../../dto/content.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('digital/content')
export class ContentController {
    constructor(private readonly ContentService: ContentService) {}

    // Create committee type
    @Post()
    async create(@Body() createDto: ContentDto) {
        return this.ContentService.create(createDto);
    }

    // Get all committee type
    @Get()
    async findAll() {
        return this.ContentService.findAll();
    }

    // Get committee type by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.ContentService.findById(id);
    }

    // Update committee type
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: ContentDto
    ) {
        return this.ContentService.update(id, updateDto);
    }

    // Delete committee type
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.ContentService.delete(id);
    }
}
