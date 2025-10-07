import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { PoliciesDto } from '../../dto/policies.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('policies')
export class PoliciesController {
    constructor(private readonly Policieservice: PoliciesService) {}

    // Create committee type
    @Post()
    async create(@Body() createDto: PoliciesDto) {
        return this.Policieservice.create(createDto);
    }

    // Get all committee type
    @Get()
    async findAll() {
        return this.Policieservice.findAll();
    }

    // Get committee type by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.Policieservice.findById(id);
    }

    // Update committee type
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: PoliciesDto
    ) {
        return this.Policieservice.update(id, updateDto);
    }

    // Delete committee type
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.Policieservice.delete(id);
    }
}
