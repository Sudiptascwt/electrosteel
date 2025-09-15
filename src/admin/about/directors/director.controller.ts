import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorsDto } from '../../../dto/director.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about/director')
export class DirectorController {
    constructor(private readonly DirectorService: DirectorService) {}

    // Create Director
    @Post()
    async create(@Body() createDto: DirectorsDto) {
        return this.DirectorService.create(createDto);
    }

    // Get all Director
    @Get()
    async findAll() {
        return this.DirectorService.findAll();
    }

    // Get Director by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.DirectorService.findById(id);
    }

    // Update Director
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: DirectorsDto
    ) {
        return this.DirectorService.update(id, updateDto);
    }

    // Delete Director
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.DirectorService.delete(id);
    }
}
