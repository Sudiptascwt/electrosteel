import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from '../../../dto/event.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('digital/event')
export class EventController {
    constructor(private readonly Eventervice: EventService) {}

    // Create committee type
    @Post()
    async create(@Body() createDto: EventDto) { 
        return this.Eventervice.create(createDto);
    }

    // Get all committee type
    @Get()
    async findAll() {
        return this.Eventervice.findAll();
    }

    // Get committee type by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.Eventervice.findById(id);
    }

    // Update committee type
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: EventDto
    ) {
        return this.Eventervice.update(id, updateDto);
    }

    // Delete committee type
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.Eventervice.delete(id);
    }
}
