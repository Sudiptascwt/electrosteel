import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { InternalPipesService } from './internal_pipes.service';
import { InternalPipesDto } from 'src/dto/pipes_internal.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../role/roles.guard';
import { Roles } from '../../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('product/ductile-iron-pipes/internal-pipes')
export class InternalPipesController {
    constructor(private readonly internalpipeDetailsService: InternalPipesService) {}

    // Create internalpipe details
    @Post()
    async create(@Body() createDto: InternalPipesDto) {
        return this.internalpipeDetailsService.create(createDto);
    }

    // Get all internalpipe details
    @Get()
    async findAll() {
        return this.internalpipeDetailsService.findAll();
    }

    // Get internalpipe details by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.internalpipeDetailsService.findById(id);
    }

    // Update internalpipe details
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: InternalPipesDto
    ) {
        return this.internalpipeDetailsService.update(id, updateDto);
    }

    // Delete internalpipe details
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.internalpipeDetailsService.delete(id);
    }
}
