import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { FittingsExternalsService } from './fittings_external_pipes.service';
import { FittingsExternalPipesDto } from 'src/dto/fittings_external.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../role/roles.guard';
import { Roles } from '../../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('product/ductile-iron-fittings/external-pipes')
export class FittingsExternalsController {
    constructor(private readonly externalpipeDetailsService: FittingsExternalsService) {}

    // Create ductile iron fittings external pipe
    @Post()
    async create(@Body() createDto: FittingsExternalPipesDto) {
        return this.externalpipeDetailsService.create(createDto);
    }

    // Get all ductile iron fittings external pipes
    @Get()
    async findAll() {
        return this.externalpipeDetailsService.findAll();
    }

    // Get ductile iron fittings external pipe details by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.externalpipeDetailsService.findById(id);
    }

    // Update ductile iron fittings external pipe details
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: FittingsExternalPipesDto
    ) {
        return this.externalpipeDetailsService.update(id, updateDto);
    }

    // Delete ductile iron fittings external pipe
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.externalpipeDetailsService.delete(id);
    }
}
