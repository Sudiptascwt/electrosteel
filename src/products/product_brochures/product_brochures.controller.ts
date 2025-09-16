import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProductBrochuresService } from './product_brochures.service';
import { ProductBrochuresDto } from '../../dto/product_brochures.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('product-brochures')
export class ProductBrochuresController {
    constructor(private readonly officeDetailsService: ProductBrochuresService) {}

    // Create office details
    @Post()
    async create(@Body() createDto: ProductBrochuresDto) {
        return this.officeDetailsService.create(createDto);
    }

    // Get all office details
    @Get()
    async findAll() {
        return this.officeDetailsService.findAll();
    }

    // Get office details by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.officeDetailsService.findById(id);
    }

    // Update office details
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: ProductBrochuresDto
    ) {
        return this.officeDetailsService.update(id, updateDto);
    }

    // Delete office details
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.officeDetailsService.delete(id);
    }
}
