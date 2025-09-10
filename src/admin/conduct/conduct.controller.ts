import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ConductService } from './conduct.service';
import { ConductDto } from '../../dto/conduct.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('conduct')
export class ConductController {
    constructor(private readonly ConductService: ConductService) {}

    // Create Conduct
    @Post()
    async create(@Body() createDto: ConductDto) {
        if(createDto.title==null){
            throw new BadRequestException('Title is required');
        }
        return this.ConductService.create(createDto);
    }

    // Get all Conduct
    @Get()
    async findAll() {
        return this.ConductService.findAll();
    }

    // Get Conduct by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.ConductService.findById(id);
    }

    // Update Conduct
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: ConductDto
    ) {
        return this.ConductService.update(id, updateDto);
    }

    // Delete Conduct
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.ConductService.delete(id);
    }
}
