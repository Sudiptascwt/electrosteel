import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AboutService } from './vision.service';
import { VisionDto } from '../../../dto/vision.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about/vision')
export class AboutController {
    constructor(private readonly AboutService: AboutService) {}

    // Create Vision
    @Post()
    async create(@Body() createDto: VisionDto) {
        if(createDto.heading==null){
            throw new BadRequestException('Heading is required');
        }
        return this.AboutService.create(createDto);
    }

    // Get all About
    @Get()
    async findAll() {
        return this.AboutService.findAll();
    }

    // Get About by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.AboutService.findById(id);
    }

    // Update About
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: VisionDto
    ) {
        return this.AboutService.update(id, updateDto);
    }

    // Delete About
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.AboutService.delete(id);
    }
}
