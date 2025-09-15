import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { DigitalVideosService } from './videos.service';
import { DigitalVideosDto } from '../../../dto/digital_videos.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('digital/videos')
export class DigitalVideosController {
    constructor(private readonly DigitalVideosService: DigitalVideosService) {}

    // Create DigitalVideos
    @Post()
    async create(@Body() createDto: DigitalVideosDto) {
        if(createDto.title==null){
            throw new BadRequestException('Title is required');
        }
        return this.DigitalVideosService.create(createDto);
    }

    // Get all DigitalVideos
    @Get()
    async findAll() {
        return this.DigitalVideosService.findAll();
    }

    // Get DigitalVideos by ID
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.DigitalVideosService.findById(id);
    }

    // Update DigitalVideos
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: DigitalVideosDto
    ) {
        return this.DigitalVideosService.update(id, updateDto);
    }

    // Delete DigitalVideos
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.DigitalVideosService.delete(id);
    }
}
