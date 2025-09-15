import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { LatestElectrosteelService } from './latest_electrosteel.service';
import { LatestElectrosteelDto } from '../../../dto/latest_electrosteel.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('latestelectrosteel')
export class LatestElectrosteelController {
    constructor(private readonly LatestElectrosteelService: LatestElectrosteelService) {}

    // Create LatestElectrosteel
    @Post()
    async create(@Body() createDto: LatestElectrosteelDto) {
        return this.LatestElectrosteelService.create(createDto);
    }

    // Get all LatestElectrosteel
    @Get()
    async findAll() {
        return this.LatestElectrosteelService.findAll();
    }

    // Get LatestElectrosteel by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.LatestElectrosteelService.findById(id);
    }

    // Update LatestElectrosteel
    @Put(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: LatestElectrosteelDto,
    ) {
    return this.LatestElectrosteelService.update(id, updateDto);
    }

    // Delete LatestElectrosteel
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.LatestElectrosteelService.delete(id);
    }
}
