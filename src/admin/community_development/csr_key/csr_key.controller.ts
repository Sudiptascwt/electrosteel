import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CsrKeyService } from './csr_key.service';
import { CsrKeyDto } from '../../../dto/csr_key.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('csr-key')
export class CsrKeyController {
    constructor(private readonly CsrKeyService: CsrKeyService) {}

    // Create CsrKey details
    @Post()
    async create(@Body() createDto: CsrKeyDto) {
        return this.CsrKeyService.create(createDto);
    }

    // Get all CsrKey details
    @Get()
    async findAll() {
        return this.CsrKeyService.findAll();
    }

    // Get CsrKey details by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.CsrKeyService.findById(id);
    }

    // Update CsrKey details
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: CsrKeyDto
    ) {
        return this.CsrKeyService.update(id, updateDto);
    }

    // Delete CsrKey details
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.CsrKeyService.delete(id);
    }
}
