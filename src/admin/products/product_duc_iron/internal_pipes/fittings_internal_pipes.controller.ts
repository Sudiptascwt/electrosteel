import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { FittingsInternalService } from './fittings_internal_pipes.service';
import { FittingsInternalPipesDto } from 'src/dto/fittings_internal.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../role/roles.guard';
import { Roles } from '../../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('product/ductile-iron-fittings/internal-pipes')
export class FittingsInternalController {
    constructor(private readonly internalpipeDetailsService: FittingsInternalService) {}

    // Create ductile iron fittings internal pipe
    @Post()
    async create(@Body() createDto: FittingsInternalPipesDto) {
        return this.internalpipeDetailsService.create(createDto);
    }

    // Get all ductile iron fittings internal pipes
    @Get()
    async findAll() {
        return this.internalpipeDetailsService.findAll();
    }

    // Get ductile iron fittings internal pipe details by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.internalpipeDetailsService.findById(id);
    }

    // Update ductile iron fittings internal pipe details
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: FittingsInternalPipesDto
    ) {
        return this.internalpipeDetailsService.update(id, updateDto);
    }

    // Delete ductile iron fittings internal pipe
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.internalpipeDetailsService.delete(id);
    }
}
