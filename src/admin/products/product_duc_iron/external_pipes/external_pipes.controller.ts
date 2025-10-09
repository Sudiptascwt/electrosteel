import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ExternalPipesService } from './External_pipes.service';
import { ExternalPipesDto } from 'src/dto/pipes_external.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../role/roles.guard';
import { Roles } from '../../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('product/ductile-iron-pipes/external-pipes')
export class ExternalPipesController {
    constructor(private readonly externalpipeDetailsService: ExternalPipesService) {}

    // Create external pipe
    @Post()
    async create(@Body() createDto: ExternalPipesDto) {
        return this.externalpipeDetailsService.create(createDto);
    }

    // Get all external pipes
    @Get()
    async findAll() {
        return this.externalpipeDetailsService.findAll();
    }

    // Get external pipe details by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.externalpipeDetailsService.findById(id);
    }

    // Update external pipe details
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: ExternalPipesDto
    ) {
        return this.externalpipeDetailsService.update(id, updateDto);
    }

    // Delete external pipe details
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.externalpipeDetailsService.delete(id);
    }
}
