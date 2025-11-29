import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AboutService } from './vision.service';
import { VisionDto } from '../../../dto/vision.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VisionPrinciplesDto } from '../../../dto/vision_principles.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about')
export class AboutController {
    constructor(private readonly AboutService: AboutService) {}

    // Create Vision
    @Post('vision')
    async create(@Body() createDto: VisionDto) {
        if(createDto.heading==null){
            throw new BadRequestException('Heading is required');
        }
        return this.AboutService.create(createDto);
    }

    // Get all About
    @Get('vision')
    async findAll() {
        return this.AboutService.findAll();
    }

    //////////// vision principles//////////////////
    // Create Vision principles
    @Post('vision/principles')
    async createPrinciples(@Body() createDto: VisionPrinciplesDto) {
        if(createDto.heading==null){
            throw new BadRequestException('Heading is required');
        }
        return this.AboutService.createPrinciples(createDto);
    }

    // Get all Vision principles
    @Get('vision/principles/all')
    async findAllcreatePrinciples() {
        return this.AboutService.findAllPrinciples();
    }

    // Get Vision principles by ID
    @Get('vision/principles/:id')
    async findcreatePrinciplesById(@Param('id', ParseIntPipe) id: number) {
        return this.AboutService.findPrinciplesById(id);
    }

    // Update Vision principles
    @Put('vision/principles/:id')
    async updatecreatePrinciples(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: VisionPrinciplesDto
    ) {
        return this.AboutService.updatePrinciples(id, updateDto);
    }

    // Delete Vision principles
    @Delete('vision/principles/:id')
    async deletecreatePrinciples(@Param('id', ParseIntPipe) id: number) {
        return this.AboutService.deletePrinciples(id);
    }
}
