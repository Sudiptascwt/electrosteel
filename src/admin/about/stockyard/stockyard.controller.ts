import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { StockYardService } from './StockYard.service';
import { StockYardDto } from '../../../dto/StockYard.dto';
import { BoardCommitteDetailsDto } from 'src/dto/board_committe_details.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about/stockyard')
export class StockYardController {
    constructor(private readonly StockYardervice: StockYardService) {}

    // Create committee type
    @Post()
    async create(@Body() createDto: StockYardDto) {
        return this.StockYardervice.create(createDto);
    }

    // Get all committee type
    @Get()
    async findAll() {
        return this.StockYardervice.findAll();
    }

    // Get committee type by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.StockYardervice.findById(id);
    }

    // Update committee type
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: StockYardDto
    ) {
        return this.StockYardervice.update(id, updateDto);
    }

    // Delete committee type
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.StockYardervice.delete(id);
    }
}
